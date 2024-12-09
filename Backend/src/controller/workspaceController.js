import { createWorkspaceService, deleteWorkspaceService, getWorkspaceUserIsPartOfService } from "../service/workspaceService.js";

export const createWorkspaceController = async function (req,res) {
  try {

    const response = await createWorkspaceService({
        ...req.body,
        owner: req.user
    });

    return res.status(201).json({
        success: true,
        message:'Workspace created successfully',
        data: response
    });

  } catch (error) {
    console.log('Error in creating Workspace', error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'A workspace with same details already exist',
    });
  }  
};

export const getWorkspaceUserIsPartOfController = async function (req,res) {
  try {
        
    const response = await getWorkspaceUserIsPartOfService(req.user); // req.user => some ID eg: 67499aa448b9f40d1bed1c84

    return res.status(201).json({
      success: true,
      message:'Workspace user is Part of Fetched successfully',
      data: response
  });

  } catch (error) {
    console.log('Error in Fetching Workspace', error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Failed to fetch Workspace User is Part of',
    });
  }
};

export const deleteWorkspaceController = async function (req , res) {
  try {

    const workspaceId = req.params.workspaceId;
    const userId = req.user;

    const response = await deleteWorkspaceService(workspaceId, userId);

    return res.status(201).json({
      success: true,
      message:'Workspace Deleted successfully',
      data: response
   });

  } catch (error) {

    console.log("Error in deleting Workspace", error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Failed to delete Workspace',
    });

  }
};