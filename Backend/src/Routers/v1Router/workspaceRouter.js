import express from 'express'

import { addChannelToWorkspaceController, addMemberToWorkspaceController, createWorkspaceController, deleteWorkspaceController, getWorkspaceByJoinCodeController, getWorkspaceController, getWorkspaceUserIsPartOfController, joinWorkspaceController, resetWorkspaceJoinCodeController, updateWorkspaceController } from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { validate } from '../../Validators/zodValidator.js';
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, zodworkspaceSchema } from '../../Validators/zodWorkspaceSchema.js';

const workspaceRouter = express.Router();

workspaceRouter.post('/', isAuthenticated, validate(zodworkspaceSchema), createWorkspaceController);

workspaceRouter.get('/', isAuthenticated, getWorkspaceUserIsPartOfController);

workspaceRouter.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

workspaceRouter.get('/:workspaceId', isAuthenticated, getWorkspaceController);

workspaceRouter.get('/join/:joincode', isAuthenticated, getWorkspaceByJoinCodeController);

workspaceRouter.put('/:workspaceId', isAuthenticated, updateWorkspaceController);

workspaceRouter.put('/:workspaceId/members', isAuthenticated, validate(addMemberToWorkspaceSchema), addMemberToWorkspaceController);

workspaceRouter.put('/:workspaceId/channels', isAuthenticated, validate(addChannelToWorkspaceSchema), addChannelToWorkspaceController);

workspaceRouter.put('/:workspaceId/joinCode/reset', isAuthenticated, resetWorkspaceJoinCodeController);

workspaceRouter.put('/:workspaceId/join', isAuthenticated, joinWorkspaceController);

export default workspaceRouter;