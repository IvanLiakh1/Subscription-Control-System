import User from '../models/User.js';
import bcrypt from 'bcrypt';
class UserController {
    async create(req, res) {
        try {
            const { nickname, email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Email і пароль є обов'язковими." });
            }
            const exist = await User.findOne({ email });
            if (exist) {
                return res.status(400).json({ error: 'Дана електронна пошта вже використовується.' });
            }
            const newUser = new User({
                nickname,
                email,
                password,
            });
            await newUser.save();
            res.status(201).json({ message: 'Нового користувача створено.' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Помилка сервера.' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Email і пароль є обов'язковими." });
            }
            const exist = await User.findOne({ email });
            if (!exist) {
                return res.status(400).json({ error: 'Не існує запису з такою електронною адресою.' });
            }
            const isMatch = await bcrypt.compare(password, exist.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Неправильний пароль.' });
            }
            req.session.userId = exist._id;
            res.status(200).json({ message: 'Авторизація успішна.' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Помилка сервера.' });
        }
    }
    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(401).json({ error: 'Помилка при виході.' });
            }
            res.status(201).json({ message: 'Вихід успішний.' });
        });
    }
    async checkSession(req, res) {
        console.log('Session data:', req.session);
        if (req.session.userId) {
            return res.json({ isAuthenticated: true, userId: req.session.userId });
        } else {
            return res.json({ isAuthenticated: false });
        }
    }
}
export default new UserController();
