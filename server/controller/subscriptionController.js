import Subscription from '../models/Subscription.js';
import Service from '../models/Services.js';
class SubscriptionController {
    async addSubscription(req, res) {
        try {
            const { title, price, currency, billingCycle, nextPaymentDate, startDate, category, notes } = req.body;
            const newSub = new Subscription({
                title,
                price,
                currency,
                billingCycle,
                nextPaymentDate,
                startDate,
                category,
                notes,
                userId: req.session.userId,
            });
            await newSub.save();
            res.status(200).json({ message: 'Підписку додано' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка сервера.' });
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
