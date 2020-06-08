/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status
} from '../utils';

const { SmeModel } = models;

/**
 * @method getAllSme
 * @description Method for getting all sme details
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const getAllSmes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let smes;
    let count;
    if (req.authUser.role === 'investor' || req.authUser.role === 'admin') {
      smes = await SmeModel.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      count = await SmeModel.countDocuments();
    }

    if (!smes[0]) {
      return errorResponse(res, status.notfound, messages.getAllSmes.notfound);
    }

    const response = {
      smes,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
    return successResponse(res, status.success,
      messages.getAllSmes.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllSmes.error);
  }
};

/**
 * @method viewSmeProfile
 * @description Method for getting single sme details
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const viewSmeProfile = async (req, res) => {
  const { smeId } = req.param;

  try {
    let profile;

    if (req.authUser.role === 'investor' || req.authUser.role === 'admin') {
      profile = await SmeModel.findOne({ _id: smeId });
    }
    if (!profile) {
      return errorResponse(res, status.notfound, messages.viewSmeProfile.notfound);
    }
    const response = profile.toJSON();

    return successResponse(res, status.success,
      messages.viewSmeProfile.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.viewSmeProfile.error);
  }
};

/**
 * @method searchForSmes
 * @description Method for searching smes with category or name
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const searchForSmes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let smes;
    let count;

    const searchParameter = req.body.search_parameter.toLowerCase();
    if (req.authUser.role === 'investor' || req.authUser.role === 'admin') {
      smes = await SmeModel.find({
        $or: [{ category: searchParameter },
          { name: searchParameter }]
      }).limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    if (!smes[0]) {
      return errorResponse(res, status.notfound, messages.searchForSmes.notfound);
    }

    const response = {
      smes,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

    return successResponse(res, status.success,
      messages.searchForSmes.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.searchForSmes.error);
  }
};

export default {
  getAllSmes,
  viewSmeProfile,
  searchForSmes
};
