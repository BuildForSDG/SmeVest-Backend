/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */
import validators from '../../src/validators';
import UserModel from '../../src/models/User';

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

describe('The login validator', () => {
  it('should call the next function when validation succeeds', async () => {
    const req = {
      body: {
        token: 'DFASGFASFAERFsfsdffs'
      }
    };
    const user = ({
      _id: 'ksd095',
      isVerified: true,
      email: 'email@mails.com',
      role: 'sme',
      password: 'passwords'
    });
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(user);

    await validators.confirmEmailValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return a 422 if validation fails due to invalid token', async () => {
    const req = {
      body: {
        token: 12345
      }
    };
    const next = jest.fn();
    const res = new Response();

    const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(null);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.confirmEmailValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          email: 'Invalid email confirmation token.'
        }
      }
    });
  });

  it('should return a 422 if validation fails due to no token', async () => {
    const req = {
      body: {
        name: 'mynames'
      }
    };
    const next = jest.fn();
    const res = new Response();

    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.confirmEmailValidator(req, res, next);
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          token: 'token is a required field'
        }
      }
    });
  });
});
