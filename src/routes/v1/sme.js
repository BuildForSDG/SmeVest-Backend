import { Router } from 'express';
import { smeController } from '../../controllers';
import { authMiddleWare } from '../../middlewares';

const smeRouter = new Router();

/** Route for creating a sme  */
smeRouter.get('/get', authMiddleWare, smeController.getAllSmes);
smeRouter.get('/view/:smeId', authMiddleWare, smeController.viewSmeProfile);
smeRouter.get('/search', authMiddleWare, smeController.searchForSmes);

export default smeRouter;
