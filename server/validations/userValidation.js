import { body, validationResult } from 'express-validator';

export const registrationValidation = [
    body('email').isEmail().withMessage('Некоректний формат email'),
    body('password').isLength({ min: 8 }).withMessage('Пароль повинене містити не менше 8 символів'),
    body('nickname').isLength({ min: 3 }).withMessage('Нікнейм повинен містити не менше 3 символів'),
];
export const loginValidation = [body('email').isEmail().withMessage('Некоректний формат email')];
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
