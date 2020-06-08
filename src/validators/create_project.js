import { CreateProjectSchema } from '../validation_schemas';

/**
 * Validates the project creation request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const { title, about, offerRate } = req.body;

  try {
    await CreateProjectSchema.validate({
      title,
      about,
      offerRate
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
