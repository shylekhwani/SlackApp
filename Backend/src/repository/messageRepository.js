import Message from "../schema/messageSchema.js";
import crudRepository from "./crudRepository.js";

const messageRepository = {
    ...crudRepository(Message),

    /**
     * Retrieves messages with pagination and filtering.
     * @param {Object} messageParams - Query parameters to filter messages (e.g., { channelId, workspaceId }).
     * @param {Number} page - The current page number (1-based).
     * @param {Number} limit - The number of messages to fetch per page.
     * @returns {Array} - List of paginated messages.
     */
    
    getPaginatedMessages: async function (messageParams, page, limit) {
        const messages = await Message.find(messageParams) // Filter messages based on query parameters
            .sort({ createdAt: -1 }) // Sort messages by most recent first
            .skip((page - 1) * limit) // Skip messages from earlier pages
            .limit(limit) // Limit the number of messages fetched
            .populate("userId", "username email avatar"); // Populate 'userId' with user details

        return messages;
    }
};

export default messageRepository;