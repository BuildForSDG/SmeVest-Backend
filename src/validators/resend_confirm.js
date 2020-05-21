import { ResendConfirmEmailSchema } from '../validation_schemas';

/**
 * Validates the login request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const { email } = req.body;
  try {
    await ResendConfirmEmailSchema.validate({
      email
    });

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
