import { getPaginatedMessagesService } from "../service/messageService.js";

export const getMessagesController = async function (req,res) {
  try {
       const messageParams = {
        channelId: req.params.channelId,
       };

       const page = req.query.page || 1;
       const limit = req.query.limit || 10;
       const isUser = req.user;

    const messages = await getPaginatedMessagesService(messageParams, page, limit, isUser);
    return res.status(201).json({
        success: true,
        message:'Messages fetched successfully',
        data: messages
    });
  } catch (error) {
    console.log('Error in get message controller ', error); // Debug log

    return res.status(500).json({
        success: false,
        message: 'error on fetching messages',
    });
  }  
};