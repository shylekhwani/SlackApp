import channelRepository from "../repository/channelRepository.js"
import messageRepository from "../repository/messageRepository.js";

export const getChannelByIdSevice = async function (channelId, userId) {
    try {
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

        if (!channel || !channel.workspaceId) {
            throw { status: 404, message: 'Channel not found' };
        }
        
        // console.log(channel) 

        const isMemberPartOfWorkspace = channel.workspaceId.members.find(
            (member) => member.memberId._id.toString() === userId
        );

        if (!isMemberPartOfWorkspace) {
            throw new Error('User is not the member of Workspace and cannot access channel');
        };
        
        const fetchMessages = await messageRepository.getPaginatedMessages({channelId}, 1, 20);
        channel.messages = fetchMessages;

        return {
            fetchMessages,
            _id: channel._id,
            name: channel.name, 
            workspaceId: channel.workspaceId,
            createdAt: channel.createdAt,
            updatedAt: channel.updatedAt 
        };
    } catch (error) {
        console.log("error in get channel by id service", error);
        throw error
    }
};