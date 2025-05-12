import { Router } from 'express';
import HistoryController from '../controller/historyController.js';
const historyRouter = Router();

historyRouter.get('/getHistory', HistoryController.getHistory);
historyRouter.delete('/clearHistory', HistoryController.clearHistory);

export default historyRouter;
