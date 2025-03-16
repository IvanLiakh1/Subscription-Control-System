import Subscription from '../models/Subscription.js';

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
}
export default new SubscriptionController();
