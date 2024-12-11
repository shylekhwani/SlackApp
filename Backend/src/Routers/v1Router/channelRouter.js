import express from 'express'

import { getChannelByIdController } from '../../controller/channelController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const channelRouter = express.Router();

channelRouter.get('/:channelId', isAuthenticated, getChannelByIdController);

export default channelRouter;