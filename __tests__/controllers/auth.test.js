/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */

import { disconnect } from '../utils';
import authController from '../../src/controllers';
import models from '../../src/models';

const { UserModel } = models;

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

const dummyUser = {
  email: 'a@mails.com',
  password: 'password',
  role: 'sme'
};


describe('The authentication controller', () => {
  beforeAll(async () => {
    await UserModel.deleteMany();
  });

  describe('User Registration test', () => {
    it('fakes successful user signup', async () => {
      const req = {
        body: dummyUser
      };
      const next = jest.fn();
      const res = new Response();
      const statusSpy = jest.spyOn(res, 'status');
      await authController.registerUser(req, res, next);
      expect(statusSpy).toHaveBeenCalledWith(201);
    });

    it('fake server error(500), if error occurs on registering', async () => {
      const req = {
        body: dummyUser
      };
      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'create').mockReturnValue(new Error());
      const statusSpy = jest.spyOn(res, 'status');
      const jsonSpy = jest.spyOn(res, 'json');

      await authController.registerUser(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 500,
        message: 'Could not sign up user try again'
      });
    });
  });

  describe('User Signin test', () => {
    it('fakes a unsuccessful user sign in because user is not verified', async () => {
      const req = {
        body: dummyUser
      };
      const next = jest.fn();
      const res = new Response();
      const statusSpy = jest.spyOn(res, 'status');
      const jsonSpy = jest.spyOn(res, 'json');
      await authController.signInUser(req, res, next);
      expect(statusSpy).toHaveBeenCalledWith(401);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 401,
        message: 'Email not verified, check your mail to verify'
      });
    });

    it('fakes a unsuccessful user sign in because user is not found', async () => {
      const req = {
        body: {
          email: 'nomail@mails.com',
          password: 'password'
        }
      };
      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(null);
      const statusSpy = jest.spyOn(res, 'status');
      const jsonSpy = jest.spyOn(res, 'json');
      await authController.signInUser(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(401);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 401,
        message: 'User Cannot be found'
      });
    });

    it('fakes a successful user sign in after user is verified', async () => {
      const req = {
        body: dummyUser
      };
      const user = ({
        _id: 'ksd095',
        isVerified: true,
        email: dummyUser.email,
        role: dummyUser.role,
        password: dummyUser.password,
        comparePasswords: jest.fn(),
        generateToken: jest.fn(),
        toJSON: jest.fn()
      });

      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(user);
      const statusSpy = jest.spyOn(res, 'status');
      const compareSpy = jest.spyOn(user, 'comparePasswords').mockReturnValue(true);
      const tokenSpy = jest.spyOn(user, 'generateToken').mockReturnValue('SDADFDSFASEFRSETDSGDSRGFSESE');
      const toJsonSpy = jest.spyOn(user, 'toJSON').mockReturnValue(user);

      await authController.signInUser(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(toJsonSpy).toHaveBeenCalled();
      expect(compareSpy).toHaveBeenCalled();
      expect(tokenSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(200);
    });

    it('fakes a unsuccessful user sign in if password is incorrect', async () => {
      const req = {
        body: dummyUser
      };
      const user = ({
        _id: 'ksd095',
        isVerified: true,
        email: dummyUser.email,
        role: dummyUser.role,
        password: 'wrongpassword',
        comparePasswords: jest.fn(),
        toJSON: jest.fn()
      });

      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(user);
      const statusSpy = jest.spyOn(res, 'status');
      const compareSpy = jest.spyOn(user, 'comparePasswords').mockReturnValue(false);
      const toJsonSpy = jest.spyOn(user, 'toJSON').mockReturnValue(user);
      const jsonSpy = jest.spyOn(res, 'json');

      await authController.signInUser(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(toJsonSpy).toHaveBeenCalled();
      expect(compareSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(401);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 401,
        message: 'Invalid Credentials'
      });
    });

    it('fake server error(500), if error occurs when signing in', async () => {
      const req = {
        body: {
          email: 'a@mails.com',
          password: 'password'
        }
      };
      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(new Error());
      const statusSpy = jest.spyOn(res, 'status');
      const jsonSpy = jest.spyOn(res, 'json');

      await authController.signInUser(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 500,
        message: 'Could not sign in user try again'
      });
    });
  });

  describe('User Confirmation test', () => {
    it('fakes successful user confirmation', async () => {
      const req = {
        authUser: {
          email: dummyUser.email
        }
      };
      const next = jest.fn();
      const res = new Response();
      const statusSpy = jest.spyOn(res, 'status');
      await authController.confirmEmail(req, res, next);
      expect(statusSpy).toHaveBeenCalledWith(200);
    });

    it('fake server error(500), if error occurs during confirmation', async () => {
      const req = {
        authUser: {
          email: dummyUser.email
        }
      };
      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'findOneAndUpdate').mockReturnValue(new Error());
      const statusSpy = jest.spyOn(res, 'status');
      const jsonSpy = jest.spyOn(res, 'json');

      await authController.confirmEmail(req, res, next);
      expect(reqSpy).toHaveBeenCalled();
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 500,
        message: 'Error confirming email, please try again'
      });
    });
  });


  afterAll(async () => {
    await disconnect();
  });
});
