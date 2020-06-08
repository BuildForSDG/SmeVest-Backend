import registerValidator from './register';
import signinValidator from './signin';
import confirmEmailValidator from './confirm_email';
import resendConfirmEmailValidator from './resend_confirm';
import forgotPasswordValidator from './forgot_password';
import resetPasswordValidator from './reset_password';
import createProfileValidator from './create_profile';
import updateProfileValidator from './update_profile';
import createConnectionValidator from './create_connection';
import sendMessageValidator from './send_message';
import createProjectValidator from './create_project';
import getConnectionsValidator from './get_connections';



export default {
  registerValidator,
  signinValidator,
  confirmEmailValidator,
  resendConfirmEmailValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
  createProfileValidator,
  updateProfileValidator,
  createConnectionValidator,
  sendMessageValidator,
  createProjectValidator,
  getConnectionsValidator
};
