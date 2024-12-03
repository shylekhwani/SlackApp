import Workspace from "../schema/workSpaceSchema.js";
import crudRepository from '../repository/crudRepository.js';
import User from "../schema/userSchema.js";
import channelRepository from "./channelRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),

    getworkspaceByName: async function (name) {
        const workspace = await Workspace.findOne({name}).select('-password');

        if (!workspace) {
            throw new Error('Workspace not found');
        }

        return workspace;
    },

    getworkspaceByJoinCode: async function (joinCode) {
        const workspace = await Workspace.findOne({joinCode});

        if (!workspace) {
            throw new Error('Workspace not found');
        }

        return workspace;
    },

    addMemberToWorkspace: async function (workspaceId, memberId, role) {

        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            throw new Error('Workspace not found');
        }
        
        const isMemberValid = User.findById(memberId);

        if (!isMemberValid) {
            throw new Error('Member not found');
        }
        
        const isMemberAlreadyPartOfWorkspace = workspace.members.find(
            (member) => member.memberId === memberId
        );
        
        if(isMemberAlreadyPartOfWorkspace){
            throw new Error('Member already part of workspace');
        };

        workspace.members.push({
            memberId,
            role
        })

        await workspace.save();// this will update our workspace

        return workspace;
    },

    addChannelToWorkspace: async function (workspaceId, channelName) {

        const workspace = await Workspace.findById(workspaceId).populate('channels');

        if (!workspace) {
            throw new Error('Workspace not found');
        }
        
        const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
            (channel) => channel.name === channelName
        );

        if(isChannelAlreadyPartOfWorkspace){
            throw new Error('Channel already part of workspace');
        };
        
        const channel = await channelRepository.create({name: channelName});

        workspace.channels.push(channel);

        await workspace.save();

        return workspace;

    },

    fetchAllWorkspaceByMemberId: async function (memberId) {

        const workspace = await Workspace.find({
            'members.memberId': memberId
        }).populate('members.memberId', 'username email avatar');

        return workspace;
    }

};

export default workspaceRepository;