/* eslint-disable no-underscore-dangle */
import { GetConnectionsSchema } from '../validation_schemas';

/**
 * Validates the profile creation request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const {
    connectionInvestor, connectionSme
  } = req.body;
  try {
    const validateSchema = await GetConnectionsSchema(req.authUser.role);
    await validateSchema.validate({
      connectionInvestor,
      connectionSme

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
