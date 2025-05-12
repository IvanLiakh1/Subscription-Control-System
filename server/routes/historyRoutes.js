import { Router } from 'express';
import HistoryController from '../controller/historyController.js';
const historyRouter = Router();

historyRouter.get('/getHistory', HistoryController.getHistory);

export default historyRouter;
