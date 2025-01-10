import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repository/channelRepository.js';
import { getUserById } from '../repository/userRepository.js';
import workspaceRepository from '../repository/workspaceRepository.js';

export const createWorkspaceService = async function (workspaceData) {
    try {
        const joinCode = uuidv4().substring(0, 6).toLocaleUpperCase();

        // Step 1: Create a new workspace with joinCode
        const newWorkspace = await workspaceRepository.create({
            name: workspaceData.name,
            description: workspaceData.description,
            joinCode,
        });

        // Step 2: Add the workspace owner as an admin
        await workspaceRepository.addMemberToWorkspace(
            newWorkspace.id,
            workspaceData.owner, // owner ID
            'admin'              // role
        );

        // Step 3: Add a "general" channel to the workspace and return updated workspace
        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
            newWorkspace.id,
            'general' // default channel name
        );
        
        return updatedWorkspace;
    } catch (error) {
        console.error("Error creating workspace:", error);
        throw error; // Rethrow the error for the calling function to handle
    }
};

export const getWorkspaceUserIsPartOfService = async function (userId) { // this function fetch all Workspaces that particular user is part of.
  try {
      const member = await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
      return member;
  } catch (error) {
    console.error("Error Fetching Workspace member:", error);
    throw error; 
  }  
};

export const deleteWorkspaceService = async function (workspaceId, userId) { // we only allowed those Workspaces where User is part of it and User is Admin.
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if (!workspace) {
            throw new Error('Workspace not found');
        };

        const isMemberAllowedToDelete = workspace.members.find(
            (member) => member.memberId.toString() === userId && member.role === 'admin'
        );

        if(isMemberAllowedToDelete) {

            await channelRepository.deleteMany(workspace.channels);    
            
            const response = await workspaceRepository.delete(workspaceId);
            return response;
        } else {

            throw new Error ('user is not allowed to delete')
       };

    } catch (error) {
        console.error("Error deletion of Workspace:", error);
        throw error; 
    } 
};

export const getWorkspaceService = async function (workspaceId, userId) {
    try {
        const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);

        if (!workspace) {
            throw new Error('Workspace not found');
        };

        const isMemberPartOfWorkspace = workspace.members.find(
            (member) => {
                return member.memberId._id.toString() === userId 
            }
        );

        if (!isMemberPartOfWorkspace) {
            throw new Error('User is not the member of Workspace');
        };

        return workspace;
    } catch (error) {
        console.error("Get Workspace service error:", error);
        throw error; 
    }
};

export const getWorkspaceByJoinCodeService = async function (joinCode, userId) {
    try {
        const workspace = await workspaceRepository.getworkspaceByJoinCode(joinCode);

        if (!workspace) {
            throw new Error('Workspace not found');
        };

        const isMemberPartOfWorkspace = workspace.members.find(
            (member) => member.memberId.toString() === userId 
        );
        
        if (!isMemberPartOfWorkspace) {
            throw new Error('User is not the member of Workspace');
        };

        return workspace;
    } catch (error) {
        console.error("Get Workspace by join code service error:", error);
        throw error; 
    }
};

export const updateWorkspaceService = async function (workspaceId, workspaceData, userId) {
    try {
       const workspace = await workspaceRepository.getById(workspaceId);

        if (!workspace) {
            throw new Error('Workspace not found');
        };

        const isMemberAdmin = workspace.members.find (
            (member) => member.memberId.toString() === userId && member.role === 'admin'
        );

        if (!isMemberAdmin) {
            throw new Error('User is not the Admin of Workspace');
        };

        const updatedWorkspace = await workspaceRepository.update(workspaceId, workspaceData);

        return updatedWorkspace;

    } catch (error) {
        console.error("Update Workspace service error:", error);
        throw error; 
    }
};

export const addMemberToWorkspaceService = async function (workspaceId, memberId, role, userId) { // we only add those members who are NOT part of workspace
    try {
        const workspace = await workspaceRepository.getById(workspaceId);

        if (!workspace) {
            throw new Error('Workspace not found');
        };
       
        const isValidUser = await getUserById(memberId);
        
        if(!isValidUser){
            throw new Error('User not found');
        };

        const isMemberPartOfWorkspace = workspace.members.find(
            (member) => member.memberId.toString() === memberId 
        );
        
        if (isMemberPartOfWorkspace) {
            throw new Error('User is already member of Workspace');
        };

        const isMemberAdmin = workspace.members.find (
            (member) => member.memberId.toString() === userId && member.role === 'admin'
        );

        if (!isMemberAdmin) {
            throw new Error('User is not the Admin of Workspace');
        };

        const response = await workspaceRepository.addMemberToWorkspace(workspaceId, memberId, role);

        return response;

    } catch (error) {
        console.error("add member to workspace service error:", error);
        throw error; 
    }
};

export const addChannelToWorkspaceService = async function (workspaceId, channelName, userId) { // we only add those Channels who are NOT part of workspace
    try {
        const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);

        if (!workspace) {
            throw new Error('Workspace not found');
        };
        
        const isMemberAdmin = workspace.members.find(
            (member) => (member.memberId._id.toString() === userId || member.memberId.toString() === userId ) && member.role === 'admin'
        );

        if (!isMemberAdmin) {
            throw new Error('User is not the Admin of Workspace');
        };

        console.log("Workspace Channels:", workspace.channels);

        const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
            (channel) => channel?.name?.toLowerCase() === channelName.toLowerCase()
        );
        
        if (isChannelAlreadyPartOfWorkspace) {
            throw new Error('Channel Already part of Workspace');
        };

        const response = await workspaceRepository.addChannelToWorkspace(workspaceId, channelName);

        return response;

    } catch (error) {
        console.error("add channel to workspace service error:", error);
        throw error; 
    }
};