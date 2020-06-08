import { SendMessageSchema } from '../validation_schemas';

/**
 * Validates the registration request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const { body } = req.body;

  try {
    await SendMessageSchema.validate({
      body
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
