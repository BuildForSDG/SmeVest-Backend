/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import { disconnect } from '../utils';
import models from '../../src/models';

const {
  UserModel, InvestorModel, SmeModel, MessageModel
} = models;

describe('The Message model', () => {
  const user = {
    email: 'msg@user.com',
    password: 'password',
    role: 'investor'
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
  const inv = {
    userId: '',
    type: 'organization',
    name: 'Investing Company',
    about: 'we love smes',
    categories: 'information technology',
    city: 'Lagos',
    address: 'Vitorial Island'
  };
  const msg = {
    smeId: '',
    invId: '',
    body: 'We love messaging'
  };
  let createdUser;
  let createdSme;
  let createdInvestor;
  let createdMsg;

  beforeAll(async () => {
    await UserModel.deleteMany();
    await InvestorModel.deleteMany();
    await SmeModel.deleteMany();
    await MessageModel.deleteMany();

    createdUser = await UserModel.create(user);
    sme.userId = createdUser._id;
    createdSme = await SmeModel.create(sme);
    inv.userId = createdUser._id;
    createdInvestor = await InvestorModel.create(inv);
  });

  it('Create Message successfully', async () => {
    msg.smeId = createdSme._id;
    msg.invId = createdInvestor._id;
    createdMsg = await MessageModel.create(msg);
    // Object Id should be defined when successfully created message.
    expect(createdMsg._id).toBeDefined();
    expect(createdMsg.body).toBe(msg.body);
  });

  it('Create message successfully, but the field not defined in model should be undefined', async () => {
    msg.project = 'Project field not defined';
    createdMsg = await MessageModel.create(msg);
    expect(createdMsg._id).toBeDefined();
    expect(createdMsg.project).toBeUndefined();
  });

  it('Trying to create message without required field should fail', async () => {
    const msgWithoutRequiredField = new MessageModel({ name: 'SmeVest Company' });
    let err;
    try {
      // Return an error when trying to save message without required field.
      err = await msgWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.body).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
