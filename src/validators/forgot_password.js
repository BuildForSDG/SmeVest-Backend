import * as Yup from 'yup';
import models from '../models';
import { ForgotPasswordSchema } from '../validation_schemas';

/**
 * Validates the forgot password request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
export default async (req, res, next) => {
  const { email } = req.body;

  try {
    await ForgotPasswordSchema.validate({
      email
    });

    const existingUser = await models.UserModel.findOne({ email });

    if (!existingUser) {
      throw new Yup.ValidationError(
        'No account was found with this email.',
        req.body,
        'email'
      );
    }

    const existingPasswordReset = await models.PasswordResetModel.findOne({ email });

    if (existingPasswordReset) {
      throw new Yup.ValidationError(
        'Password reset link already sent.',
        req.body,
        'email'
      );
    }

    req.authUser = existingUser;

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
