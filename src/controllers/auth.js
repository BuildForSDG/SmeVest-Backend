import * as models from '../models';
import {
  successResponse, errorResponse, messages, status
} from '../utils';

/**
 * @method registerUser
 * @description Method for user registration
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const registerUser = async (req, res) => {
  try {
    const user = await models.UserModel.create(req.body);
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
    const user = await models.UserModel.findOne({ email });

    const response = user.toJSON();

    /** Delete user password so it does not get returned */
    delete response.password;

    if (!user) {
      return errorResponse(res, status.unauthorized, messages.signIn.invalid);
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

export default {
  registerUser,
  signInUser
};
