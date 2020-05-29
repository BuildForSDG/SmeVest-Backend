/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */

import { disconnect } from '../utils';
import { profileController } from '../../src/controllers';
import models from '../../src/models';

const { SmeModel, InvestorModel } = models;

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

const dummyProfile = {
  name: 'comp name',
  about: 'about comp',
  category: 'inform tech',
  city: 'comp city',
  address: 'comp address',
  teamSize: '1-20'
};

describe('The profile controller', () => {
  beforeAll(async () => {
    await SmeModel.deleteMany();
  });

  describe('Profile Creation test', () => {
    it('fakes successful user profile creation for an sme', async () => {
      const req = {
        body: dummyProfile,
        authUser: {
          _id: 'SDFAGASDFASFA',
          role: 'sme'
        }
      };

      const profile = ({
        userId: 'SDFAGASDFASFA',
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20',
        toJSON: jest.fn()
      });

      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(SmeModel, 'create').mockReturnValue(profile);
      const statusSpy = jest.spyOn(res, 'status');
      await profileController.createProfile(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(201);
    });

    it('fakes successful user profile creation for an investor', async () => {
      const req = {
        body: dummyProfile,
        authUser: {
          _id: 'SDFAGASDFASFA',
          role: 'investor'
        }
      };

      const profile = ({
        userId: 'SDFAGASDFASFA',
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20',
        toJSON: jest.fn()
      });

      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(InvestorModel, 'create').mockReturnValue(profile);
      const statusSpy = jest.spyOn(res, 'status');
      await profileController.createProfile(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(201);
    });

    it('fakes successful user profile creation for an investor with profile pics', async () => {
      const req = {
        body: dummyProfile,
        authUser: {
          _id: 'SDFAGASDFASFA',
          role: 'investor'
        },
        file: ''
      };

      const profile = ({
        userId: 'SDFAGASDFASFA',
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20',
        toJSON: jest.fn()
      });

      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(InvestorModel, 'create').mockReturnValue(profile);
      const statusSpy = jest.spyOn(res, 'status');
      await profileController.createProfile(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(201);
    });

    it('fake server error(500), if error occurs while creating profile', async () => {
      const req = {
        body: dummyProfile,
        authUser: {
          _id: 'SDFAGASDFASFA',
          role: 'sme'
        }
      };
      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(SmeModel, 'create').mockReturnValue(new Error());
      const statusSpy = jest.spyOn(res, 'status');
      const jsonSpy = jest.spyOn(res, 'json');

      await profileController.createProfile(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 500,
        message: 'Error creating profile, try again'
      });
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
