/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse, errorResponse, messages, status
} from '../utils';

const { ConnectionModel } = models;

/**
 * @method createConnection
 * @description Method for creating connection between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const createConnection = async (req, res) => {
  try {
    let connection;
    if (req.authUser.role === 'sme') {
      req.body.smeConnecting = req.body.smeId;
      connection = await ConnectionModel.create(req.body);
    }

    if (req.authUser.role === 'investor') {
      req.body.investorConnecting = req.body.investorId;
      connection = await ConnectionModel.create(req.body);
    }

    const response = connection.toJSON();

    return successResponse(res, status.created,
      messages.createConnection.success, response);
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.error, messages.createConnection.error);
  }
};

/**
 * @method acceptConnection
 * @description Method for accepting connection between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const acceptConnection = async (req, res) => {
  const { connectionId } = req.params;
  const { connectionSme, connectionInvestor } = req.body;
  try {
    let connection;

    if (req.authUser.role === 'sme') {
      connection = await ConnectionModel.findOneAndUpdate({
        $and: [{ connectionSme },
          { _id: connectionId }]
      }, { status: 'active', updatedAt: new Date() }, {
        new: true
      });
    }

    if (req.authUser.role === 'investor') {
      connection = await ConnectionModel.findOneAndUpdate({
        $and: [{ connectionInvestor },
          { _id: connectionId }]
      }, { status: 'active', updatedAt: new Date() }, {
        new: true
      });
    }

    const response = connection.toJSON();

    return successResponse(res, status.success,
      messages.acceptConnection.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.acceptConnection.error);
  }
};

/**
 * @method declineConnection
 * @description Method for declining connection between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const declineConnection = async (req, res) => {
  const { connectionId } = req.param;
  const { connectionSme, connectionInvestor } = req.body;

  try {
    let connection;

    if (req.authUser.role === 'sme') {
      connection = await ConnectionModel.findOneAndDelete({
        $and: [{ connectionSme },
          { _id: connectionId }]
      });
    }

    if (req.authUser.role === 'investor') {
      connection = await ConnectionModel.findOneAndDelete({
        $and: [{ connectionInvestor },
          { _id: connectionId }]
      });
    }

    const response = connection.toJSON();

    return successResponse(res, status.success,
      messages.declineConnection.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.declineConnection.error);
  }
};

/**
 * @method getAllActiveConnections
 * @description Method for getting active connection between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getAllActiveConnections = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const {
    connectionSme, connectionInvestor, smeId, investorId
  } = req.body;

  try {
    let connections;
    let count;

    if (req.authUser.role === 'sme') {
      connections = await ConnectionModel.find({
        $and: [
          {
            $or: [{ connectionSme },
              { smeConnecting: smeId }]
          },
          { status: 'active' }
        ]
      }).populate('connectionInvestor')
        .populate('investorConnecting')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ updatedAt: -1 })
        .exec();
    }

    if (req.authUser.role === 'investor') {
      connections = await ConnectionModel.find({
        $and: [
          {
            $or: [{ connectionInvestor },
              { investorConnecting: investorId }]
          },
          { status: 'active' }
        ]
      }).populate('connectionSme')
        .populate('smeConnecting')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ updatedAt: -1 })
        .exec();
    }

    if (!connections[0]) {
      return errorResponse(res, status.notfound, messages.getAllActiveConnections.notfound);
    }

    const response = {
      connections,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

    return successResponse(res, status.success,
      messages.getAllActiveConnections.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllActiveConnections.error);
  }
};

/**
 * @method getAllPendingConnections
 * @description Method for getting active connection between sme and investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getAllPendingConnections = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { connectionSme, connectionInvestor } = req.body;
  try {
    let connections;
    let count;

    if (req.authUser.role === 'sme') {
      connections = await ConnectionModel.find({
        $and: [{ connectionSme }, { status: 'pending' }]
      }).populate('investorConnecting')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    if (req.authUser.role === 'investor') {
      connections = await ConnectionModel.find({
        $and: [{ connectionInvestor }, { status: 'pending' }]
      }).populate('smeConnecting')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
    }

    if (!connections[0]) {
      return errorResponse(res, status.notfound, messages.getAllPendingConnections.notfound);
    }


    const response = {
      connections,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

    return successResponse(res, status.success,
      messages.getAllPendingConnections.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllPendingConnections.error);
  }
};


export default {
  createConnection,
  declineConnection,
  acceptConnection,
  getAllActiveConnections,
  getAllPendingConnections
};
