import * as Yup from 'yup';
import * as models from '../models';
import { RegisterSchema } from '../validation_schemas';

/**
 * Validates the registration request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    await RegisterSchema.validate({
      email,
      password,
      role
    });

    const existingUser = await models.UserModel.findOne({ email });

    if (existingUser) {
      throw new Yup.ValidationError(
        'This email has already been taken.',
        req.body,
        'email'
      );
    }
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
