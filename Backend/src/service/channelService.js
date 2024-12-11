import channelRepository from "../repository/channelRepository.js"

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

        return channel;
    } catch (error) {
        console.log("error in get channel by id service", error);
        throw error
    }
};