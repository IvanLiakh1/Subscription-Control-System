import cron from 'node-cron';
import processSubscriptionsPayments from '../services/SubscriptionPayments.js';

cron.schedule('0 0 * * *', async () => {
    console.log('Запуск перевірки підписок');
    const result = await processSubscriptionsPayments();
    console.log('Завершено:', result);
});
