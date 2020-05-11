/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import { disconnect } from '../../src/utils';
import { UserModel, InvestorModel } from '../../src/models';

describe('The Investor model', () => {
  const user = {
    email: 'inv@user.com',
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

  let createdUser;
  let createdInvestor;

  beforeAll(async () => {
    await UserModel.deleteMany();
    await InvestorModel.deleteMany();
    createdUser = await UserModel.create(user);
  });

  it('Create Investor Details successfully', async () => {
    inv.userId = createdUser._id;
    createdInvestor = await InvestorModel.create(inv);
    // Object Id should be defined when successfully created investor.
    expect(createdInvestor._id).toBeDefined();
    expect(createdInvestor.name).toBe(inv.name);
    expect(createdInvestor.about).toBe(inv.about);
    expect(createdInvestor.categories).toContain(inv.categories);
    expect(createdInvestor.city).toBe(inv.city);
    expect(createdInvestor.address).toBe(inv.address);
    expect(createdInvestor.city).toBe(inv.city);
  });

  it('Create investor details successfully, but the field not defined in model should be undefined', async () => {
    inv.project = 'Project field not defined';
    createdInvestor = await InvestorModel.create(inv);
    expect(createdInvestor._id).toBeDefined();
    expect(createdInvestor.project).toBeUndefined();
  });

  it('Trying to create sme without required field should fail', async () => {
    const invWithoutRequiredField = new InvestorModel({ name: 'SmeVest Company' });
    let err;
    try {
      // Return an error when trying to save investor without required field.
      err = await invWithoutRequiredField.save();
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
