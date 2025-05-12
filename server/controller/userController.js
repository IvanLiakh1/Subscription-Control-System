import User from '../models/User.js';
import bcrypt from 'bcrypt';
import axios from 'axios';
import History from '../models/History.js';
class UserController {
    async create(req, res) {
        try {
            const { nickname, email, password } = req.body;
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
        try {
            const userId = req.session.userId || (req.user && req.user._id);

            if (userId) {
                const user = await User.findById(userId).select('nickname email notification futureNotification');
                if (!user) {
                    return res.json({ isAuthenticated: false });
                }
                return res.json({
                    isAuthenticated: true,
                    user,
                    notification: user.notification,
                    futureNotification: user.futureNotification,
                });
            } else {
                return res.json({ isAuthenticated: false });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Помилка сервера.' });
        }
    }

    async checkToken(req, res) {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({ error: 'Токен відсутній' });
            }

            const response = await axios.get('https://api.monobank.ua/personal/client-info', {
                headers: {
                    'X-Token': token,
                },
            });

            return res.status(200).json({
                isValid: true,
                clientInfo: response.data,
            });
        } catch (error) {
            if (error.response) {
                return res.status(400).json({
                    isValid: false,
                    error: 'Недійсний токен',
                });
            }
            console.error('Помилка перевірки токена:', error);
            return res.status(500).json({
                error: 'Помилка сервера при перевірці токена',
            });
        }
    }
    async getClientInfo(req, res) {
        try {
            const { clientId, token } = req.body;

            if (!clientId) {
                return res.status(400).json({ error: 'Айді клієнта відсутній' });
            }

            const response = await axios.get('https://api.monobank.ua/personal/statement/', {
                headers: {
                    'X-Token': token,
                },
                params: {
                    clientId,
                },
            });

            return res.status(200).json({
                clientInfo: response.data,
            });
        } catch (error) {
            if (error.response) {
                return res.status(400).json({
                    isValid: false,
                    error: 'Недійсний токен',
                });
            }
            console.error('Помилка перевірки токена:', error);
            return res.status(500).json({
                error: 'Помилка сервера при перевірці токена',
            });
        }
    }
    async editUser(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            const { notification } = req.body;

            await User.updateOne(
                { _id: userId },
                {
                    $set: {
                        notification: notification.notification,
                        futureNotification: notification.futureNotification,
                    },
                },
            );
            return res.status(200).json({
                isSuccess: true,
                message: 'Налаштування користувача оновлено',
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Помилка при оновленні налаштувань користувача',
            });
        }
    }
    async getUser(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            const user = await User.findById(userId);
            res.status(200).json({
                user: user,
            });
        } catch (error) {
            console.error('Помилка отримання користувача:', error);
            return res.status(500).json({ error: 'Помилка сервера' });
        }
    }
    async getCurrentUser(req, res) {
        try {
            const userId = req.session.userId || (req.user && req.user._id);
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'Користувач не знайдений' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Помилка отримання користувача:', error);
            res.status(500).json({ error: 'Помилка сервера' });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            await Spendings.deleteMany({ userId });
            await Subscription.deleteMany({ userId });
            await History.deleteMany({ userId });
            res.status(200).json({ message: 'Дані користувача вилучено', deleted });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера' });
        }
    }
}
export default new UserController();
