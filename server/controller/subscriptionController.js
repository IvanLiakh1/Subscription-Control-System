import Subscription from '../models/Subscription.js';
import Service from '../models/Services.js';
import Spendings from '../models/Spendings.js';
import { calculateNextPaymentDate } from '../utils/date.js';
import mongoose from 'mongoose';
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
            const list = await Subscription.find({ userId, title });
            if (list.length > 0) {
                return res.status(400).json({ error: 'Підписка на даний сервіс вже існує' });
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
                nextPaymentDate: { $lte: todayUTC },
            });
            console.log(subscriptions);
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
                    userId: userId,
                    subscriptionId: sub._id,
                });
                console.log(
                    `Списано ${sub.price} UAH за ${sub.title}. Наступний платіж: ${nextDate.toISOString().split('T')[0]}`,
                );
            }
            res.status(200).json({
                message: 'Успішно',
                processed: subscriptions.length,
            });
        } catch (error) {
            console.error('Помилка:', error);
            res.status(500).json({ error: 'Помилка сервера' });
        }
    }
    async getSpendings(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: 'Користувач не авторизований',
                });
            }
            const { startDate, endDate, category, subscriptionId } = req.query;
            const filter = { userId };
            if (subscriptionId) {
                if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
                    return res.status(400).json({
                        success: false,
                        error: 'Невірний ID підписки',
                    });
                }
                filter.subscriptionId = new mongoose.Types.ObjectId(subscriptionId);
            }
            if (category) {
                filter.category = category;
            }
            if (startDate || endDate) {
                filter.date = {};
                if (startDate) {
                    const start = new Date(startDate);
                    if (isNaN(start.getTime())) {
                        return res.status(400).json({
                            success: false,
                            error: 'Невірний формат початкової дати',
                        });
                    }
                    start.setUTCHours(0, 0, 0, 0);
                    filter.date.$gte = start;
                }
                if (endDate) {
                    const end = new Date(endDate);
                    if (isNaN(end.getTime())) {
                        return res.status(400).json({
                            success: false,
                            error: 'Невірний формат кінцевої дати',
                        });
                    }
                    end.setUTCHours(23, 59, 59, 999);
                    filter.date.$lte = end;
                }
            }
            const spendings = await Spendings.find(filter)
                .sort({ date: -1 })
                .populate('subscriptionId', 'title category billingCycle price totalSpent')
                .lean();

            return res.status(200).json({
                success: true,
                data: spendings,
            });
        } catch (error) {
            console.error('Помилка при отриманні витрат:', error);
            return res.status(500).json({
                error: 'Помилка сервера',
            });
        }
    }
    async createSpending(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: 'Користувач не авторизований',
                });
            }
            const { date } = req.body;
            await Spendings.create({
                date: new Date(date),
                userId: userId,
                subscriptionId: '681b4cf971544093cde6a47b',
            });
            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
            });
        }
    }
    async editSubscription(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: 'Користувач не авторизований',
                });
            }
            const { price, notes, billingCycle, id } = req.body;
            console.log(price, notes, id);

            await Subscription.updateOne(
                { _id: id, userId },
                {
                    $set: {
                        price,
                        notes,
                        billingCycle,
                    },
                },
            );
            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
            });
        }
    }
    async changeStatusSubscription(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: 'Користувач не авторизований',
                });
            }
            const { id, status } = req.body;
            await Subscription.updateOne(
                { _id: id, userId },
                {
                    $set: {
                        status: status,
                    },
                },
            );
            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
            });
        }
    }
    async deleteSubscription(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: 'Користувач не авторизований',
                });
            }
            const { id } = req.body;

            await Spendings.deleteMany({ subscriptionId: id, userId });
            await Subscription.deleteOne({ _id: id, userId });
            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
            });
        }
    }
}
export default new SubscriptionController();
