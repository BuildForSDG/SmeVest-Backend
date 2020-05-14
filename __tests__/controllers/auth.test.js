/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */

import { testApiServer, disconnect } from '../utils';
import { UserModel } from '../../src/models';
import registerUser from '../../src/controllers/auth';

const signUpRoute = '/api/v1/auth/signup';
// const signInRoute = '/api/v1/auth/signin';

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

    await registerUser(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalledWith({
      status: 500,
      message: 'Could not sign up user try again'
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
