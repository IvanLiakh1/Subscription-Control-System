import Subscription from '../models/Subscription.js';
import Service from '../models/Services.js';
class SubscriptionController {
    async addSubscription(req, res) {
        try {
            const userId = req.session.userId;
            const { title, price, billingCycle, startDate, category, notes } = req.body;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            if (!title || !price || !billingCycle || !startDate) {
                return res.status(400).json({ error: 'Заповніть обовʼязкові поля' });
            }
            const calculateNextPayment = (start, cycle) => {
                const date = new Date(start);
                switch (cycle) {
                    case 'daily':
                        date.setDate(date.getDate() + 1);
                        break;
                    case 'weekly':
                        date.setDate(date.getDate() + 7);
                        break;
                    case 'monthly':
                        date.setMonth(date.getMonth() + 1);
                        break;
                    case 'yearly':
                        date.setFullYear(date.getFullYear() + 1);
                        break;
                }
                return date;
            };

            const newSub = new Subscription({
                title,
                price,
                currency: 'UAH',
                billingCycle,
                startDate,
                nextPaymentDate: calculateNextPayment(startDate, billingCycle),
                category,
                notes,
                userId: userId,
                status: 'active',
            });

            await newSub.save();
            res.status(201).json(newSub);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера' });
        }
    }
    async getAllSubscriptions(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            const list = await Subscription.find({ userId });
            return res.status(200).json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера.' });
        }
    }
    async getServices(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            const list = await Service.find();
            return res.status(200).json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера.' });
        }
    }
}
export default new SubscriptionController();
