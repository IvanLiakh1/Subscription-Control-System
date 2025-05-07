import { Router } from 'express';
import SubscriptionController from '../controller/subscriptionController.js';
const subscriptionRouter = Router();

subscriptionRouter.post('/add-subscription', SubscriptionController.addSubscription);
subscriptionRouter.get('/getAllSubscriptions', SubscriptionController.getAllSubscriptions);
subscriptionRouter.get('/getService', SubscriptionController.getServices);
subscriptionRouter.post('/processPayments', SubscriptionController.processSubscriptionsPayments);

export default subscriptionRouter;
