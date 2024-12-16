import express from 'express';

import { getMessagesController } from '../../controller/messageController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const messageRouter = express.Router();

messageRouter.get('/:channelId', isAuthenticated, getMessagesController)

export default messageRouter;