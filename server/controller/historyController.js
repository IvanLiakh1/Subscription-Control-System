import { response } from 'express';
import History from '../models/History.js';
import mongoose from 'mongoose';

class HistoryController {
    async getHistory(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            const list = await History.find({ userId });
            res.status(200).json({ list });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера' });
        }
    }
    async clearHistory(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            const list = await History.deleteMany({ userId });
            res.status(200).json({ response: 'Успішно' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера' });
        }
    }
}
export default new HistoryController();
