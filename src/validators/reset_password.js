import * as Yup from 'yup';
import models from '../models';
import { ResetPasswordSchema } from '../validation_schemas';

/**
 * Validates the signin request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Object}
 */
export default async (req, res, next) => {
  const { email, token, password } = req.body;

  try {
    await ResetPasswordSchema.validate({
      password,
      token,
      email
    });

    const passwordReset = await models.PasswordResetModel.findOne({ email, token });

    if (!passwordReset) {
      throw new Yup.ValidationError(
        'Invalid password reset token.',
        req.body,
        'email'
      );
    }

    const authUser = await models.UserModel.findOne({
      email
    });

    req.authUser = authUser;

    return next();
  } catch (error) {
    return res.status(422).json({
      message: 'Validation failed.',
      data: {
        errors: {
          [error.path]: error.message
        }
      }
    });
  }
};
