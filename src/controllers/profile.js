/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status, imageUpload
} from '../utils';

const { SmeModel, InvestorModel } = models;

/**
 * @method registerUser
 * @description Method for user registration
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const createProfile = async (req, res) => {
  try {
    let profile;
    req.body.userId = req.authUser._id;

    if (req.file) {
      req.body.profilePic = await imageUpload(req);
    }
    if (req.authUser.role === 'sme') {
      profile = await SmeModel.create(req.body);
    }

    if (req.authUser.role === 'investor') {
      profile = await InvestorModel.create(req.body);
    }

    const response = profile.toJSON();

    return successResponse(res, status.created,
      messages.createProfile.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.createProfile.error);
  }
};

export default {
  createProfile
};
