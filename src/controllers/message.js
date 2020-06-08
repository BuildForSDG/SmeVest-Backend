/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status
} from '../utils';

const { MessageModel } = models;

/**
 * @method sendMessage
 * @description Method for sending message between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const sendMessage = async (req, res) => {
  try {
    let message;
    if (req.authUser.role === 'sme') {
      req.body.sme = req.body.smeId;
      message = await MessageModel.create(req.body);
    }

    if (req.authUser.role === 'investor') {
      req.body.investor = req.body.investorId;
      message = await MessageModel.create(req.body);
    }

    const response = message.toJSON();

    return successResponse(res, status.created,
      messages.sendMessage.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.sendMessage.error);
  }
};

/**
 * @method getAllMessages
 * @description Method for getting all messages between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getAllMessages = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    let message;
    let count;

    if (req.authUser.role === 'sme') {
      message = await MessageModel.find({
        sme: req.body.smeId
      }).populate('sme')
        .populate('investor')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    if (req.authUser.role === 'investor') {
      message = await MessageModel.find({
        investor: req.body.investorId
      }).populate('sme')
        .populate('investor')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    if (!message[0]) {
      return errorResponse(res, status.notfound, messages.getAllMessages.notfound);
    }

    const response = {
      message,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

    return successResponse(res, status.success,
      messages.getAllMessages.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllMessages.error);
  }
};

/**
 * @method deletMessage
 * @description Method for deleting a message between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const deleteMessage = async (req, res) => {
  const { messageId } = req.param;

  try {
    const message = await MessageModel.findOneAndDelete({
      _id: messageId
    });

    return successResponse(res, status.success,
      messages.deleteMessage.success, message);
  } catch (error) {
    return errorResponse(res, status.error, messages.deleteMessage.error);
  }
};

/**
 * @method getMessage
 * @description Method for getting a message between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getMessage = async (req, res) => {
  const { messageId } = req.param;

  try {
    const message = await MessageModel.findOne({
      _id: messageId
    });

    if (!message) {
      return errorResponse(res, status.notfound, messages.getMessage.notfound);
    }

    const response = message.toJSON();

    return successResponse(res, status.success,
      messages.getMessage.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getMessage.error);
  }
};

/**
 * @method updateMessage
 * @description Method for updating a message between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const updateMessage = async (req, res) => {
  const { messageId } = req.param;

  try {
    const message = await MessageModel.findOneAndUpdate({
      _id: messageId
    }, req.body, {
      new: true
    });

    return successResponse(res, status.success,
      messages.updateMessage.success, message);
  } catch (error) {
    return errorResponse(res, status.error, messages.updateMessage.error);
  }
};

export default {
  sendMessage,
  getAllMessages,
  deleteMessage,
  getMessage,
  updateMessage
};
