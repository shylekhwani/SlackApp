import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repository/channelRepository.js';
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