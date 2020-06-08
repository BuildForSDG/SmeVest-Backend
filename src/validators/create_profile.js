/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import models from '../models';
import { CreateProfileSchema } from '../validation_schemas';

/**
 * Validates the profile creation request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export default async (req, res, next) => {
  const {
    name, about, category, city, address, teamSize, type
  } = req.body;
  try {
    const validateSchema = await CreateProfileSchema(req.authUser.role);
    await validateSchema.validate({
      name,
      about,
      category,
      city,
      address,
      teamSize,
      type
    });

    let existingProfile;
    if (req.authUser.role === 'sme') {
      existingProfile = await models.SmeModel.findOne({ userId: req.authUser._id });
    }

    if (req.authUser.role === 'investor') {
      existingProfile = await models.InvestorModel.findOne({ userId: req.authUser._id });
    }

    if (existingProfile) {
      throw new Yup.ValidationError(
        'This user has already created profile.',
        req.body,
        'userId'
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
