import { Router } from 'express';
import SubscriptionController from '../controller/subscriptionController.js';
const subscriptionRouter = Router();

subscriptionRouter.post('/add-subscription', SubscriptionController.addSubscription);

export default subscriptionRouter;
