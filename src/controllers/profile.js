/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status, imageUpload, stringToArray
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
      if (typeof req.body.category === 'string') {
        req.body.category = stringToArray(req.body.category);
      }
      profile = await InvestorModel.create(req.body);
    }

    const response = profile.toJSON();

    return successResponse(res, status.created,
      messages.createProfile.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.createProfile.error);
  }
};

const getProfile = async (req, res) => {
  try {
    let profile;
    if (req.authUser.role === 'sme') {
      profile = await SmeModel.findOne({ userId: req.authUser._id });
    }

    if (req.authUser.role === 'investor') {
      profile = await InvestorModel.findOne({ userId: req.authUser._id });
    }
    const response = profile.toJSON();

    return successResponse(res, status.success,
      messages.getProfile.success, response);
  } catch (err) {
    return errorResponse(res, status.error, messages.getProfile.error);
  }
};

const updateProfile = async (req, res) => {
  try {
    let profile;
    if (req.authUser.role === 'sme') {
      profile = await SmeModel.findOneAndUpdate({ userId: req.authUser._id }, req.body, {
        new: true
      });
    }

    if (req.authUser.role === 'investor') {
      if (typeof req.body.category === 'string') {
        req.body.category = stringToArray(req.body.category);
      }
      profile = await InvestorModel.findOneAndUpdate({ userId: req.authUser._id }, req.body, {
        new: true
      });
    }
    const response = profile.toJSON();

    return successResponse(res, status.success,
      messages.updateProfile.success, response);
  } catch (err) {
    return errorResponse(res, status.error, messages.updateProfile.error);
  }
};

export default {
  createProfile,
  getProfile,
  updateProfile
};
