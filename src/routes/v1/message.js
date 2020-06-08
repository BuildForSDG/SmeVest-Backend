import { Router } from 'express';
import { messageController } from '../../controllers';
import { authMiddleWare } from '../../middlewares';
import validators from '../../validators';

const messageRouter = new Router();

/** Route for projects  */
messageRouter.post('/send', authMiddleWare, validators.sendMessageValidator, messageController.sendMessage);
messageRouter.get('/get/:messageId', authMiddleWare, messageController.getMessage);
messageRouter.patch('/update/:messageId', authMiddleWare, validators.sendMessageValidator, messageController.updateMessage);
messageRouter.delete('/delete/:messageId', authMiddleWare, messageController.deleteMessage);
messageRouter.get('/get', authMiddleWare, messageController.getAllMessages);

export default messageRouter;
