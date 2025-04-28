import { Router } from 'express';
import userController from '../controller/userController.js';
import { loginValidation, registrationValidation, validate } from '../validations/userValidation.js';

const userRouter = Router();

userRouter.post('/create-user', ...registrationValidation, validate, userController.create);
userRouter.post('/login-user', ...loginValidation, validate, userController.login);
userRouter.post('/logout-user', userController.logout);
userRouter.get('/check-session', userController.checkSession);
userRouter.post('/check-token', userController.checkToken);
export default userRouter;
