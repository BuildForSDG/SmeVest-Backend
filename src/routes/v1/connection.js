import { Router } from 'express';
import { connectionController } from '../../controllers';
import { authMiddleWare } from '../../middlewares';
import validators from '../../validators';

const connectionRouter = new Router();

/** Route for connection  */
connectionRouter.get('/active', authMiddleWare, validators.getConnectionsValidator, connectionController.getAllActiveConnections);
connectionRouter.get('/pending', authMiddleWare, validators.getConnectionsValidator, connectionController.getAllPendingConnections);
connectionRouter.post('/create', authMiddleWare, validators.createConnectionValidator, connectionController.createConnection);
connectionRouter.patch('/accept/:connectionId', authMiddleWare, validators.getConnectionsValidator, connectionController.acceptConnection);
connectionRouter.patch('/decline/:connectionId', authMiddleWare, validators.getConnectionsValidator, connectionController.declineConnection);


export default connectionRouter;
