/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */

import { testApiServer, disconnect } from '../utils';
import { UserModel } from '../../src/models';
import authController from '../../src/controllers';

const signUpRoute = '/api/v1/auth/signup';
const signInRoute = '/api/v1/auth/signin';

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

describe('The authentication controller', () => {
  beforeAll(async () => {
    await UserModel.deleteMany();
  });

  describe('User Registration test', () => {
    it('should return response when registration succeeds', async () => {
      const req = {
        body: {
          email: 'a@mails.com',
          password: 'password',
          role: 'sme'
        }
      };

      const response = await testApiServer().post(signUpRoute).send(req.body);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User Created Successfully');
    });

    it('fake server error(500), if error occurs on registering', async () => {
      const req = {
        body: {
          email: 'a@mails.com',
          password: 'password',
          role: 'sme'
        }
      };
      const next = jest.fn();
      const res = new Response();
      const reqSpy = jest.spyOn(UserModel, 'create').mockImplementation(() => new Error());
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
    it('should return response when signin succeeds', async () => {
      const req = {
        body: {
          email: 'a@mails.com',
          password: 'password'
        }
      };

      const response = await testApiServer().post(signInRoute).send(req.body);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Successfully Signed In');
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
      const reqSpy = jest.spyOn(UserModel, 'findOne').mockImplementation(() => new Error());
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

  afterAll(async () => {
    await disconnect();
  });
});
