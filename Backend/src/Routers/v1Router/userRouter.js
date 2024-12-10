import express from 'express'

import { deleteUser, getAllProfile, signin, signup } from '../../controller/userController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { zodSigninSchema } from '../../Validators/zodSigninSchema.js';
import { zodSignupSchema } from '../../Validators/zodSignupSchema.js';
import { validate } from '../../Validators/zodValidator.js';


const userRouter = express.Router();

userRouter.get('/profile', getAllProfile);

userRouter.post('/signup',  validate(zodSignupSchema), signup);

userRouter.post('/signin',  validate(zodSigninSchema), signin);

userRouter.delete('/:id', isAuthenticated, deleteUser);

export default userRouter;