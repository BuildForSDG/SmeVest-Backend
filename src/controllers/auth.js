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
    const token = user.generateToken();
    return successResponse(res, status.created,
      messages.signUp.success, user, token);
  } catch (error) {
    return errorResponse(res, status.error, messages.signUp.error);
  }
};

export default registerUser;
