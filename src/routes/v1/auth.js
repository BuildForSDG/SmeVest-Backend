import { Router } from 'express';
import { authController } from '../../controllers';
import validators from '../../validators';

const authRouter = new Router();

/** Route for registering a new user  */
authRouter.post('/signup', validators.registerValidator, authController.registerUser);

/** Route for generating jsonwebtoken and signing in an already existing user */
authRouter.post('/signin', validators.signinValidator, authController.signInUser);

/** Route for confirming email of an already existing user */
authRouter.post('/emails/confirm', validators.confirmEmailValidator, authController.confirmEmail);

/** Route for resending confirmation email  */
authRouter.post('/emails/confirm/resend', validators.resendConfirmEmailValidator, authController.resendConfirmEmail);

/** Route for requesting a forgot password email  */
authRouter.post('/passwords/forgot', validators.forgotPasswordValidator, authController.forgotPassword);

/** Route for resetting user password  */
authRouter.post('/passwords/reset', validators.resetPasswordValidator, authController.resetPassword);

export default authRouter;
