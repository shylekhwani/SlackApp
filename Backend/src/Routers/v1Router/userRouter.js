import express from 'express'

import { getProfile, signin, signup } from '../../controller/userController.js';


const userRouter = express.Router();

userRouter.get('/profile', getProfile);

userRouter.post('/signup', signup);

userRouter.post('/signin', signin)

export default userRouter;