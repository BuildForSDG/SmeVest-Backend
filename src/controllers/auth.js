import models from '../models';
import {
  successResponse, errorResponse, messages, status
} from '../utils';

const { UserModel } = models;
/**
 * @method registerUser
 * @description Method for user registration
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const registerUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    const token = await user.generateToken();

    const response = user.toJSON();

    /** Delete user password so it does not get returned */
    delete response.password;

    return successResponse(res, status.created,
      messages.signUp.success, response, token);
  } catch (error) {
    return errorResponse(res, status.error, messages.signUp.error);
  }
};

/**
   * @method signInUser
   * @description Method for user sign in
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return errorResponse(res, status.notfound, messages.signIn.notfound);
    }

    const response = user.toJSON();

    /** Delete user password so it does not get returned */
    delete response.password;

    if (user && !user.isVerified) {
      return errorResponse(res, status.forbidden, messages.signIn.unverified);
    }

    const isPasswordValid = await user.comparePasswords(password);

    if (!isPasswordValid) {
      return errorResponse(res, status.unauthorized, messages.signIn.invalid);
    }

    const token = await user.generateToken();


    return successResponse(res, status.success, messages.signIn.success, response, token);
  } catch (error) {
    return errorResponse(res, status.error, messages.signIn.error);
  }
};

/**
   * @method confirmEmail
   * @description Method for user email confirmation
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */

const confirmEmail = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: req.authUser.email },
      {
        isVerified: true,
        emailConfirmCode: null,
        emailConfirmedAt: new Date()
      },
      { new: true }
    );

    const response = user.toJSON();

    /** Delete user password so it does not get returned */
    delete response.password;

    const token = user.generateToken();

    return successResponse(res, status.success, messages.emailConfirm.success, response, token);
  } catch (error) {
    return errorResponse(res, status.error, messages.emailConfirm.error);
  }
};

/**
   * @method resendConfirmEmail
   * @description Method for user to resend email confirmation
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
const resendConfirmEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return errorResponse(res, status.notfound, messages.resendEmailConfirm.notfound);
    }

    if (user && user.emailConfirmedAt) {
      return errorResponse(res, status.conflict, messages.resendEmailConfirm.conflict);
    }

    await user.sendEmailConfirmationEmail();

    return successResponse(res, status.success, messages.resendEmailConfirm.success);
  } catch (error) {
    return errorResponse(res, status.error, messages.resendEmailConfirm.error);
  }
};

export default {
  registerUser,
  signInUser,
  confirmEmail,
  resendConfirmEmail
};
