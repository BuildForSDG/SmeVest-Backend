import { Router } from 'express';
import { investorController } from '../../controllers';
import { authMiddleWare } from '../../middlewares';

const investorRouter = new Router();

/** Route for investor  */
investorRouter.get('/get', authMiddleWare, investorController.getAllInvestors);
investorRouter.get('/view/:investorId', authMiddleWare, investorController.viewInvestorProfile);
investorRouter.get('/search', authMiddleWare, investorController.searchForInvestors);

export default investorRouter;
