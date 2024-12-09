import express from 'express';

import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRouter.js';

const v1Router = express.Router();

v1Router.use('/user', userRouter);

v1Router.use('/workspaces', workspaceRouter)

export default v1Router;