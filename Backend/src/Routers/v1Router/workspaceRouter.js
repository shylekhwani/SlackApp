import express from 'express'

import { addChannelToWorkspaceController, addMemberToWorkspaceController, createWorkspaceController, deleteWorkspaceController, getWorkspaceByJoinCodeController, getWorkspaceController, getWorkspaceUserIsPartOfController, updateWorkspaceController } from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { validate } from '../../Validators/zodValidator.js';
import { zodworkspaceSchema } from '../../Validators/zodWorkspaceSchema.js';

const workspaceRouter = express.Router();

workspaceRouter.post('/', isAuthenticated, validate(zodworkspaceSchema), createWorkspaceController);

workspaceRouter.get('/', isAuthenticated, getWorkspaceUserIsPartOfController);

workspaceRouter.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

workspaceRouter.get('/:workspaceId', isAuthenticated, getWorkspaceController);

workspaceRouter.get('/join/:joincode', isAuthenticated, getWorkspaceByJoinCodeController);

workspaceRouter.put('/:workspaceId', isAuthenticated, updateWorkspaceController);

workspaceRouter.put('/:workspaceId/members', isAuthenticated, addMemberToWorkspaceController);

workspaceRouter.put('/:workspaceId/channels', isAuthenticated, addChannelToWorkspaceController);

export default workspaceRouter;