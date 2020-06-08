/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status, imageUpload, stringToArray
} from '../utils';

const { SmeModel, InvestorModel } = models;

/**
 * @method createProfile
 * @description Method for profile creation
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const createProfile = async (req, res) => {
  try {
    let profile;
    req.body.user = req.authUser._id;

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

/**
 * @method getProfile
 * @description Method for getting profile details
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getProfile = async (req, res) => {
  try {
    let profile;

    if (req.authUser.role === 'sme') {
      profile = await SmeModel.findOne({ user: req.authUser._id }).populate('user');
    }

    if (req.authUser.role === 'investor') {
      profile = await InvestorModel.findOne({ user: req.authUser._id }).populate('user');
    }

    if (!profile) {
      return errorResponse(res, status.notfound, messages.getProfile.notfound);
    }

    const response = profile.toJSON();
    delete response.user.password;

    return successResponse(res, status.success,
      messages.getProfile.success, response);
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.error, messages.getProfile.error);
  }
};

/**
 * @method updateProfile
 * @description Method for updating profile
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const updateProfile = async (req, res) => {
  try {
    let profile;
    console.log(req.file)
    if (req.file) {
      req.body.profilePic = await imageUpload(req);
    }
    if (req.authUser.role === 'sme') {
      profile = await SmeModel.findOneAndUpdate({ user: req.authUser._id }, req.body, {
        new: true
      }).populate('user');
    }

    if (req.authUser.role === 'investor') {
      if (typeof req.body.category === 'string') {
        req.body.category = stringToArray(req.body.category);
      }
      profile = await InvestorModel.findOneAndUpdate({ user: req.authUser._id }, req.body, {
        new: true
      }).populate('user');
    }
    const response = profile.toJSON();
    delete response.user.password;

    return successResponse(res, status.success,
      messages.updateProfile.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.updateProfile.error);
  }
};

export default {
  createProfile,
  getProfile,
  updateProfile
};
