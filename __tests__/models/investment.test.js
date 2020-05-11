/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import { disconnect } from '../../src/utils';
import {
  UserModel, InvestorModel, ProjectModel, SmeModel, InvestmentModel
} from '../../src/models';

describe('The Message model', () => {
  const user = {
    email: 'investment@user.com',
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
  const sme = {
    userId: '',
    name: 'SmeVest Company',
    about: 'we love investors',
    category: 'information technology',
    city: 'Lagos',
    address: 'IKeja Crescent',
    teamSize: '11-50'
  };

  const project = {
    invId: '',
    name: 'Funding for fintech',
    about: 'Special Seed funding',
    offerRate: '$110 million'
  };

  const investment = {
    projId: '',
    smeId: '',
    status: 'applied'
  };

  let createdUser;
  let createdInvestor;
  let createdProject;
  let createdSme;
  let createdInvestment;

  beforeAll(async () => {
    await UserModel.deleteMany();
    await InvestorModel.deleteMany();
    await SmeModel.deleteMany();
    await ProjectModel.deleteMany();
    await InvestmentModel.deleteMany();

    createdUser = await UserModel.create(user);
    sme.userId = createdUser._id;
    createdSme = await SmeModel.create(sme);
    inv.userId = createdUser._id;
    createdInvestor = await InvestorModel.create(inv);
    project.invId = createdInvestor._id;
    createdProject = await ProjectModel.create(project);
  });

  it('Create Investment successfully', async () => {
    investment.projId = createdProject._id;
    investment.smeId = createdSme._id;
    createdInvestment = await InvestmentModel.create(investment);
    // Object Id should be defined when successfully created project.
    expect(createdInvestment._id).toBeDefined();
    expect(createdInvestment.status).toBe(investment.status);
  });

  it('Create investment successfully, but the field not defined in model should be undefined', async () => {
    investment.time = 'Time field not defined';
    createdInvestment = await InvestmentModel.create(investment);
    expect(createdInvestment._id).toBeDefined();
    expect(createdInvestment.time).toBeUndefined();
  });

  it('Trying to create investment without required field should fail', async () => {
    const investmentWithoutRequiredField = new InvestmentModel({ name: 'SmeVest Company' });
    let err;
    try {
      // Return an error when trying to save project without required field.
      err = await investmentWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.status).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
