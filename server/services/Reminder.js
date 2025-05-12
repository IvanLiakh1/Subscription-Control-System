import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import { sendReminderEmail } from '../services/MailService.js';
const checkAndSendReminders = async () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const subscriptions = await Subscription.find({
        nextPaymentDate: {
            $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
            $lte: new Date(tomorrow.setHours(23, 59, 59, 999)),
        },
    });
    for (const sub of subscriptions) {
        const user = await User.findById(sub.userId);
        const formattedDate = new Date(sub.nextPaymentDate).toLocaleDateString('uk-UA');
        if (user?.email) {
            await sendReminderEmail({
                to: user.email,
                serviceName: sub.title,
                price: sub.price,
                nextPaymentDate: formattedDate,
            });
        }
    }
};
export default checkAndSendReminders;
