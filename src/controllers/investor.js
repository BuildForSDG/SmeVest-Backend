/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status
} from '../utils';

const { InvestorModel } = models;

/**
 * @method getAllInvestors
 * @description Method for getting all investors details
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const getAllInvestors = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let investors;
    let count;
    if (req.authUser.role === 'sme' || req.authUser.role === 'admin') {
      investors = await InvestorModel.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      count = await InvestorModel.countDocuments();
    }

    if (!investors[0]) {
      return errorResponse(res, status.notfound, messages.getAllInvestors.notfound);
    }

    const response = {
      investors,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
    return successResponse(res, status.success,
      messages.getAllInvestors.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllInvestors.error);
  }
};

/**
 * @method viewInvestorProfile
 * @description Method for getting single investor details
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const viewInvestorProfile = async (req, res) => {
  const { investorId } = req.param;

  try {
    let profile;
    if (req.authUser.role === 'sme' || req.authUser.role === 'admin') {
      profile = await InvestorModel.findOne({ _id: investorId });
    }

    if (!profile) {
      return errorResponse(res, status.notfound, messages.viewInvestorProfile.notfound);
    }


    const response = profile.toJSON();

    return successResponse(res, status.success,
      messages.viewInvestorProfile.success, response);
  } catch (err) {
    return errorResponse(res, status.error, messages.viewInvestorProfile.error);
  }
};

/**
 * @method searchForInvestors
 * @description Method for searching smes with category or name
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const searchForInvestors = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    let investors;
    let count;

    const searchParameter = req.body.search_parameter.toLowerCase();

    if (req.authUser.role === 'sme' || req.authUser.role === 'admin') {
      investors = await InvestorModel.find({
        $or: [{ category: searchParameter },
          { name: searchParameter }]
      }).limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      count = await InvestorModel.countDocuments();
    }

    if (!investors[0]) {
      return errorResponse(res, status.notfound, messages.searchForInvestors.notfound);
    }

    const response = {
      investors,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };
    return successResponse(res, status.success,
      messages.searchForInvestors.success, response);
  } catch (err) {
    return errorResponse(res, status.error, messages.searchForInvestors.error);
  }
};

export default {
  searchForInvestors,
  viewInvestorProfile,
  getAllInvestors
};
