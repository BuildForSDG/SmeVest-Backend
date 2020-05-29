import registerValidator from './register';
import signinValidator from './signin';
import confirmEmailValidator from './confirm_email';
import resendConfirmEmailValidator from './resend_confirm';
import forgotPasswordValidator from './forgot_password';
import resetPasswordValidator from './reset_password';
import createProfileValidator from './create_profile';



export default {
  registerValidator,
  signinValidator,
  confirmEmailValidator,
  resendConfirmEmailValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
  createProfileValidator
};
