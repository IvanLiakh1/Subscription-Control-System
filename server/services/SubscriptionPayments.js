import Spendings from '../models/Spendings.js';
import Subscription from '../models/Subscription.js';
import { calculateNextPaymentDate } from '../utils/date.js';
const processSubscriptionsPayments = async () => {
    try {
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

        const subscriptions = await Subscription.find({
            status: 'active',
            nextPaymentDate: { $lte: today },
        });

        for (const sub of subscriptions) {
            const nextDate = calculateNextPaymentDate(sub.startDate, sub.billingCycle, now);
            await Subscription.updateOne(
                { _id: sub._id },
                {
                    $set: {
                        nextPaymentDate: nextDate,
                        totalSpent: (sub.totalSpent || 0) + sub.price,
                    },
                },
            );

            await Spendings.create({
                date: now,
                userId: sub.userId,
                subscriptionId: sub._id,
            });

            console.log(
                `[${new Date().toISOString()}] Списано ${sub.price} UAH за ${sub.title}. Наступна дата: ${nextDate.toISOString().split('T')[0]}`,
            );
        }

        return { message: 'Успішно', processed: subscriptions.length };
    } catch (error) {
        console.error('Cron помилка:', error);
        return { error: 'Помилка сервера' };
    }
};
export default processSubscriptionsPayments;
