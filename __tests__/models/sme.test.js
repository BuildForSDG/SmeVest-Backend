/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import { disconnect } from '../utils';
import { UserModel, SmeModel } from '../../src/models';

describe('The Sme model', () => {
  const user = {
    email: 'sme@user.com',
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

  let createdUser;
  let createdSme;

  beforeAll(async () => {
    await UserModel.deleteMany();
    await SmeModel.deleteMany();
    createdUser = await UserModel.create(user);
  });

  it('Create Sme Details successfully', async () => {
    sme.userId = createdUser._id;
    createdSme = await SmeModel.create(sme);
    // Object Id should be defined when successfully created sme.
    expect(createdSme._id).toBeDefined();
    expect(createdSme.name).toBe(sme.name);
    expect(createdSme.about).toBe(sme.about);
    expect(createdSme.category).toBe(sme.category);
    expect(createdSme.city).toBe(sme.city);
    expect(createdSme.address).toBe(sme.address);
    expect(createdSme.city).toBe(sme.city);
    expect(createdSme.teamSize).toBe(sme.teamSize);
  });

  it('Create sme details successfully, but the field not defined in model should be undefined', async () => {
    sme.project = 'Project field not defined';
    createdSme = await SmeModel.create(sme);
    expect(createdSme._id).toBeDefined();
    expect(createdSme.project).toBeUndefined();
  });

  it('Trying to create sme without required field should fail', async () => {
    const smeWithoutRequiredField = new SmeModel({ name: 'SmeVest Company' });
    let err;
    try {
      // Return an error when trying to save sme without required field.
      err = await smeWithoutRequiredField.save();
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
