import channelRepository from "../repository/channelRepository.js";
import messageRepository from "../repository/messageRepository.js";

export const getPaginatedMessagesService = async function (messageParams, page, limit, isUser) {
   try {
        const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(messageParams.channelId);

        const workspace = channelDetails.workspaceId;

        const isMemberPartOfWorkspace = workspace.members.find(
          (member) => member.memberId.toString() === isUser
      );
      
          if (!isMemberPartOfWorkspace) {
               throw new Error('User is not the member of Workspace');
          };

        const messages = await messageRepository.getPaginatedMessages(messageParams, page, limit);
        return messages;
   } catch (error) {
        console.error("Error in message service:", error);
        throw error; // Rethrow the error for the calling function to handle
   }
};

export const createMessageService = async function (message) {
  const newMessage = await messageRepository.create(message);
  return newMessage   
};