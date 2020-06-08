/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import models from '../models';
import { CreateConnectionSchema } from '../validation_schemas';

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
    const validateSchema = await CreateConnectionSchema(req.authUser.role);
    await validateSchema.validate({
      connectionInvestor,
      connectionSme

    });


    let existingConnection;
    if (req.authUser.role === 'sme') {
      existingConnection = await models.ConnectionModel.findOne({
        $and: [
          {
            $and: [{ connectionInvestor: req.body.connectionInvestor },
              { userConnecting: req.authUser._id }]
          },
          { $or: [{ status: 'active' }, { status: 'pending' }] }
        ]
      });
    }

    if (req.authUser.role === 'investor') {
      existingConnection = await models.ConnectionModel.findOne({
        $and: [
          {
            $and: [{ connectionSme: req.body.connectionSme },
              { userConnecting: req.authUser._id }]
          },
          { $or: [{ status: 'active' }, { status: 'pending' }] }
        ]
      });
    }

    if (existingConnection && req.authUser.role === 'sme') {
      throw new Yup.ValidationError(
        'This connection request already sent to investor.',
        req.body,
        'connectionInvestor'
      );
    }

    if (existingConnection && req.authUser.role === 'investor') {
      throw new Yup.ValidationError(
        'This connection request already sent to sme.',
        req.body,
        'connectionSme'
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
