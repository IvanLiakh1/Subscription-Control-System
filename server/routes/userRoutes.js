import { Router } from 'express';
import userController from '../controller/userController.js';
import { loginValidation, registrationValidation, validate } from '../validations/userValidation.js';
import passport from 'passport';
const userRouter = Router();

userRouter.post('/create-user', ...registrationValidation, validate, userController.create);
userRouter.post('/login-user', ...loginValidation, validate, userController.login);
userRouter.post('/logout-user', userController.logout);
userRouter.get('/check-session', userController.checkSession);
userRouter.post('/check-token', userController.checkToken);
userRouter.post('/getClientInfo', userController.getClientInfo);
userRouter.patch('/editUser', userController.editUser);
userRouter.get('/getUser', userController.getUser);
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.delete('/clearUser', userController.deleteUser);

userRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: true,
    }),
    (req, res) => {
        req.session.userId = req.user._id;
        res.redirect('http://localhost:8080');
    },
);

userRouter.get('/auth/google/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Успішний вхід',
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Не вдалося увійти',
        });
    }
});
export default userRouter;
