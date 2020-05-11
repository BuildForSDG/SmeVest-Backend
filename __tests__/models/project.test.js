/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import { disconnect } from '../../src/utils';
import {
  UserModel, InvestorModel, ProjectModel
} from '../../src/models';

describe('The Message model', () => {
  const user = {
    email: 'msg@user.com',
    password: 'password',
    role: 'investor'
  };
  const inv = {
    userId: '',
    type: 'organization',
    name: 'Investing Company',
    about: 'we love smes',
    categories: 'information technology',
    city: 'Lagos',
    address: 'Vitorial Island'
  };

  const project = {
    invId: '',
    name: 'Funding for fintech',
    about: 'Special Seed funding',
    offerRate: '$110 million'
  };

  let createdUser;
  let createdInvestor;
  let createdProject;

  beforeAll(async () => {
    await UserModel.deleteMany();
    await InvestorModel.deleteMany();
    await ProjectModel.deleteMany();

    createdUser = await UserModel.create(user);
    inv.userId = createdUser._id;
    createdInvestor = await InvestorModel.create(inv);
  });

  it('Create Message successfully', async () => {
    project.invId = createdInvestor._id;
    createdProject = await ProjectModel.create(project);
    // Object Id should be defined when successfully created project.
    expect(createdProject._id).toBeDefined();
    expect(createdProject.name).toBe(project.name);
    expect(createdProject.about).toBe(project.about);
    expect(createdProject.offerRate).toBe(project.offerRate);
  });

  it('Create project successfully, but the field not defined in model should be undefined', async () => {
    project.time = 'Time field not defined';
    createdProject = await ProjectModel.create(project);
    expect(createdProject._id).toBeDefined();
    expect(createdProject.time).toBeUndefined();
  });

  it('Trying to create project without required field should fail', async () => {
    const projectWithoutRequiredField = new ProjectModel({ name: 'SmeVest Company' });
    let err;
    try {
      // Return an error when trying to save project without required field.
      err = await projectWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.about).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
