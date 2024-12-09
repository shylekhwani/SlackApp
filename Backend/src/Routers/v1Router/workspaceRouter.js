import express from 'express'

import { createWorkspaceController, deleteWorkspaceController, getWorkspaceUserIsPartOfController } from '../../controller/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { validate } from '../../Validators/zodValidator.js';
import { zodworkspaceSchema } from '../../Validators/zodWorkspaceSchema.js';

const workspaceRouter = express.Router();

workspaceRouter.post('/', isAuthenticated, validate(zodworkspaceSchema), createWorkspaceController);

workspaceRouter.get('/', isAuthenticated, getWorkspaceUserIsPartOfController);

workspaceRouter.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default workspaceRouter;