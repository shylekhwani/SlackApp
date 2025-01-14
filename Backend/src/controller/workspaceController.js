import { addChannelToWorkspaceService, addMemberToWorkspaceService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByJoinCodeService, getWorkspaceService, getWorkspaceUserIsPartOfService, joinWorkspaceService, resetWorkspaceJoinCodeService, updateWorkspaceService } from "../service/workspaceService.js";

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

export const getWorkspaceController = async function (req, res) {
  try {
    const workspaceId = req.params.workspaceId;
    const userId = req.user;

    const response = await getWorkspaceService(workspaceId, userId);

    return res.status(201).json({
      success: true,
      message:'Workspace Fetched successfully',
      data: response
   });
  } catch (error) {
    console.log("Get Workspace Controller Error", error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Failed to get Workspace',
    });

  }
};

export const getWorkspaceByJoinCodeController = async function (req, res) {
  try {
        const joinCode = req.params.joincode;
        const userId = req.user;

        const response = await getWorkspaceByJoinCodeService(joinCode, userId);

        return res.status(201).json({
          success: true,
          message:'Workspace Fetched successfully',
          data: response
      });
  } catch (error) {
    console.log("Get Workspace by joinCode Controller Error", error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Failed to get Workspace by joinCode',
    });
  }
};

export const updateWorkspaceController = async function (req,res) {
  try {
      const workspaceId = req.params.workspaceId;
      const workspaceData = req.body;
      const userId = req.user;

     const response = await updateWorkspaceService(workspaceId, workspaceData, userId);

     return res.status(201).json({
      success: true,
      message:'Workspace Updated successfully',
      data: response
     });
  
  } catch (error) {
    console.log("Error in update workspace controller", error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Error in updating workspace',
    });
  }
};

export const addMemberToWorkspaceController = async function (req, res) {
  try {
    const workspaceId = req.params.workspaceId;
    const memberId = req.body.memberId;
    const role = req.body.role || 'member';
    const userId = req.user;
    
    const response = await addMemberToWorkspaceService(workspaceId, memberId, role, userId);

    return res.status(201).json({
      success: true,
      message:'Member added successfully into workspace',
      data: response
     });

  } catch (error) {
    console.log("Error in add member to workspace controller", error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Error in adding member to workspace',
    });
  }
};

export const addChannelToWorkspaceController = async function (req, res) {
  try {
    const workspaceId = req.params.workspaceId;
    const channelName = req.body.channelName;
    const userId = req.user;

    const response = await addChannelToWorkspaceService(workspaceId, channelName, userId);

    return res.status(201).json({
      success: true,
      message:'Channel added successfully into workspace',
      data: response
     });

  } catch (error) {
    console.log("Error in add channel to workspace controller", error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'Error in adding channel to workspace',
    });
  }
};

export const resetWorkspaceJoinCodeController = async function (req, res) {
   try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user;

        const response = await resetWorkspaceJoinCodeService(workspaceId, userId);
        return res.status(201).json({
          success: true,
          message:'Join code Reset Successfully',
          data: response
         });
         
   } catch (error) {
      console.log("Error in reset workspace joinCode controller", error); // Debug log

      return res.status(500).json({
          success: false,
          message: 'Error in reseting joinCode controller',
      });
   }
};

export const joinWorkspaceController = async function(req, res) {
    try {

      const workspaceId = req.params.workspaceId;
      const joinCode = req.body.joinCode;
      const userId = req.user;

      const response = await joinWorkspaceService(workspaceId, joinCode, userId);

        return res.status(201).json({
          success: true,
          message:'Joined Workspace Successfully',
          data: response
        });

    } catch (error) {
      console.log("Error in Join workspace controller", error); // Debug log

      return res.status(500).json({
          success: false,
          message: 'Error in Join Workspace controller',
      });
    }
};