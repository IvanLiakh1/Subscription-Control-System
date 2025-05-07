import Subscription from '../models/Subscription.js';
import Service from '../models/Services.js';
import {calculateNextPaymentDate} from '../utils/date.js';
class SubscriptionController {
    async addSubscription(req, res) {
        try {
            const userId = req.session.userId;
            const { title, logo, price, billingCycle, startDate, category, notes } = req.body;
            if (!userId) {
                return res.status(401).json({ error: 'Користувач не авторизований' });
            }
            if (!title || !price || !billingCycle || !startDate) {
                return res.status(400).json({ error: 'Заповніть обовʼязкові поля' });
            }
            const nextPaymentDate = calculateNextPaymentDate(startDate, billingCycle, new Date());
            

            const newSub = new Subscription({
                title,
                logo,
                price,
                currency: 'UAH',
                billingCycle,
                startDate,
                nextPaymentDate,
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
    async processSubscriptionsPayments(req, res) {
        try {
          const userId = req.session.userId;
          if (!userId) return res.status(401).json({ error: 'Не авторизовано' });
          const now = new Date();
const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
const tomorrowUTC = new Date(todayUTC);
tomorrowUTC.setUTCDate(todayUTC.getUTCDate() + 1);
const subscriptions = await Subscription.find({
  userId,
  status: 'active',
  nextPaymentDate: {
    $gte: todayUTC,
    $lt: tomorrowUTC
  }
});
          console.log(subscriptions);
          
      
          for (const sub of subscriptions) {
            const nextDate = calculateNextPaymentDate(sub.startDate, sub.billingCycle, now);
            
            await Subscription.updateOne(
              { _id: sub._id },
              { 
                $set: {
                  nextPaymentDate: nextDate,
                  totalSpent: (sub.totalSpent || 0) + sub.price
                }
              }
            );
            
            console.log(`Списано ${sub.price} UAH за ${sub.title}. Наступний платіж: ${nextDate.toISOString().split('T')[0]}`);
          }
      
          res.status(200).json({
            message: 'Успішно',
            processed: subscriptions.length
          });
        } catch (error) {
          console.error('Помилка:', error);
          res.status(500).json({ error: 'Помилка сервера' });
        }
      }}
export default new SubscriptionController();
