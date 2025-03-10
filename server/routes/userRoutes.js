import { Router } from 'express';
import userController from '../controller/userController.js';

const userRouter = Router();

userRouter.post('/create-user', userController.create);
userRouter.post('/login-user', userController.login);
userRouter.post('/logout-user', userController.logout);
userRouter.get('/check-session', userController.checkSession);
export default userRouter;
