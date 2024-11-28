import express from 'express'

import { getAllProfile, signin, signup } from '../../controller/userController.js';


const userRouter = express.Router();

userRouter.get('/profile', getAllProfile);

userRouter.post('/signup', signup);

userRouter.post('/signin', signin)

export default userRouter;