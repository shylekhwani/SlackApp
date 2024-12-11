import express from 'express';

import channelRouter from './channelRouter.js';
import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRouter.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

v1Router.use('/workspaces', workspaceRouter);

v1Router.use('/channels', channelRouter);

export default v1Router;