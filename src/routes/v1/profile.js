import { Router } from 'express';
import { profileController } from '../../controllers';
import validators from '../../validators';
import { multerUploads, authMiddleWare } from '../../middlewares';

const profileRouter = new Router();

/** Route for creating a user profile  */
profileRouter.post('/create', authMiddleWare, multerUploads, validators.createProfileValidator, profileController.createProfile);
profileRouter.get('/get', authMiddleWare, profileController.getProfile);
profileRouter.patch('/update', authMiddleWare, multerUploads, validators.updateProfileValidator, profileController.updateProfile);

export default profileRouter;
