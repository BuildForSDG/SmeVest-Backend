import { Router } from 'express';
import { profileController } from '../../controllers';
import validators from '../../validators';
import { multerUploads, authMiddleWare } from '../../middlewares';

const profileRouter = new Router();

/** Route for creating a user profile  */
profileRouter.post('/create', authMiddleWare, multerUploads, validators.createProfileValidator, profileController.createProfile);

export default profileRouter;
