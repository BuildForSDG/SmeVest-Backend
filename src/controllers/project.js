/* eslint-disable no-underscore-dangle */
import models from '../models';
import {
  successResponse,
  errorResponse,
  messages,
  status
} from '../utils';

const {
  ProjectModel
} = models;

/**
 * @method createProject
 * @description Method for creating project by investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const createProject = async (req, res) => {
  try {
    const project = await ProjectModel.create(req.body);

    const response = project.toJSON();

    return successResponse(res, status.created,
      messages.createProject.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.createProject.error);
  }
};

/**
 * @method getProject
 * @description Method for getting projects created by investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getProject = async (req, res) => {
  const {
    projectId
  } = req.param;

  try {
    const project = await ProjectModel.findOne({
      _id: projectId
    }).populate('investor');

    if (!project) {
      errorResponse(res, status.notfound, messages.getProfile.notfound);
    }

    const response = project.toJSON();

    return successResponse(res, status.success,
      messages.getProject.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getProject.error);
  }
};

/**
 * @method updateProject
 * @description Method for uodating projects created by investors
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */
const updateProject = async (req, res) => {
  const {
    projectId
  } = req.param;

  try {
    const project = await ProjectModel.findOneAndUpdate({
      _id: projectId
    }, req.body, {
      new: true
    });

    const response = project.toJSON();

    return successResponse(res, status.success,
      messages.acceptConnection.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.acceptConnection.error);
  }
};

/**
 * @method getAllActiveProjecs
 * @description Method for getting active projects
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getAllActiveProjects = async (req, res) => {
  const {
    page = 1, limit = 10
  } = req.query;
  const {
    investor
  } = req.body;

  try {
    let count;

    const projects = await ProjectModel.find({
      $and: [{
        investor
      }, {
        status: 'active'
      }]
    }).populate('investor')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({
        createdAt: -1
      })
      .exec();

    if (!projects[0]) {
      return errorResponse(res, status.notfound, messages.getAllActiveProjects.notfound);
    }

    const response = {
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

    return successResponse(res, status.success,
      messages.getAllActiveProjects.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllActiveProjects.error);
  }
};

/**
 * @method getAllGivenProjects
 * @description Method for getting given projects
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} response body object
 */

const getAllGivenProjects = async (req, res) => {
  const {
    page = 1, limit = 10
  } = req.query;
  const {
    investor
  } = req.body;

  try {
    let count;

    const projects = await ProjectModel.find({
      $and: [{
        investor
      }, {
        status: 'given'
      }]
    }).populate('investor')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({
        createdAt: -1
      })
      .exec();

    if (!projects[0]) {
      return errorResponse(res, status.notfound, messages.getAllGivenProjects.notfound);
    }


    const response = {
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    };

    return successResponse(res, status.success,
      messages.getAllGivenProjects.success, response);
  } catch (error) {
    return errorResponse(res, status.error, messages.getAllGivenProjects.error);
  }
};

export default {
  createProject,
  getProject,
  updateProject,
  getAllActiveProjects,
  getAllGivenProjects
};
