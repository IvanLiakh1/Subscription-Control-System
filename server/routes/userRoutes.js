import { Router } from 'express';
import userController from '../Controller/userController.js';

const userRouter = Router();

userRouter.post('/create-user', userController.create);
userRouter.post('/login-user', userController.login);
export default userRouter;
