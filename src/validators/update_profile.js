/* eslint-disable no-underscore-dangle */
import { UpdateProfileSchema } from '../validation_schemas';

/**
 * Validates the profile creation request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const {
    name, about, category, city, address, teamSize
  } = req.body;
  try {
    await UpdateProfileSchema.validate({
      name,
      about,
      category,
      city,
      address,
      teamSize
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
