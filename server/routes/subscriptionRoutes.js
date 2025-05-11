import { Router } from 'express';
import SubscriptionController from '../controller/subscriptionController.js';
const subscriptionRouter = Router();

subscriptionRouter.post('/add-subscription', SubscriptionController.addSubscription);
subscriptionRouter.get('/getAllSubscriptions', SubscriptionController.getAllSubscriptions);
subscriptionRouter.get('/getAllSpendings', SubscriptionController.getSpendings);
subscriptionRouter.get('/getService', SubscriptionController.getServices);
subscriptionRouter.post('/processPayments', SubscriptionController.processSubscriptionsPayments);
subscriptionRouter.post('/addSpending', SubscriptionController.createSpending);
subscriptionRouter.patch('/edit-subscription', SubscriptionController.editSubscription);

export default subscriptionRouter;
