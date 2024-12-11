import { getChannelByIdSevice } from "../service/channelService.js";

export const getChannelByIdController = async function (req,res) {
  try {
       const channelId = req.params.channelId;
       const userId = req.user;

       const response = await getChannelByIdSevice(channelId, userId);
       return res.status(201).json({
        success: true,
        message:'Channel Fethched successfully',
        data: response
    });

  } catch (error) {
    console.log('Error in Getting Channel by id:', error); // Debug log

    if (error.status) {
        return res.status(error.status).json({
            success: false,
            message: error.message,
        });
    };

    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
  }  
};