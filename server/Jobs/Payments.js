import cron from 'node-cron';
import processSubscriptionsPayments from '../services/SubscriptionPayments.js';
import checkAndSendReminders from '../services/Reminder.js';
cron.schedule('0 0 * * *', async () => {
    console.log('Запуск перевірки підписок');
    const result = await processSubscriptionsPayments();
    await checkAndSendReminders();
    console.log('Перевірка підписок завершена', result);
});
