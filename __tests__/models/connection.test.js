/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import { disconnect } from '../utils';
import models from '../../src/models';

const {
  UserModel, InvestorModel, SmeModel, ConnectionModel
} = models;

describe('The Message model', () => {
  const user = {
    email: 'connection@user.com',
    password: 'password',
    role: 'sme'
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
  const connection = {
    smeId: '',
    invId: '',
    status: 'active'
  };
  let createdUser;
  let createdSme;
  let createdInvestor;
  let createdConnection;

  beforeAll(async () => {
    await UserModel.deleteMany();
    await InvestorModel.deleteMany();
    await SmeModel.deleteMany();
    await ConnectionModel.deleteMany();

    createdUser = await UserModel.create(user);
    sme.userId = createdUser._id;
    createdSme = await SmeModel.create(sme);
    inv.userId = createdUser._id;
    createdInvestor = await InvestorModel.create(inv);
  });

  it('Create connection successfully', async () => {
    connection.smeId = createdSme._id;
    connection.invId = createdInvestor._id;
    createdConnection = await ConnectionModel.create(connection);
    // Object Id should be defined when successfully created connection.
    expect(createdConnection._id).toBeDefined();
    expect(createdConnection.status).toBe(connection.status);
  });

  it('Create connection successfully, but the field not defined in model should be undefined', async () => {
    connection.project = 'Project field not defined';
    createdConnection = await ConnectionModel.create(connection);
    expect(createdConnection._id).toBeDefined();
    expect(createdConnection.project).toBeUndefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
