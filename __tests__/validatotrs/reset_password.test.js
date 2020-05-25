/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */
import validators from '../../src/validators';
import models from '../../src/models';

const { UserModel, PasswordResetModel } = models;

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

describe('The reset password validator', () => {
  it('should call the next function when it succeeds', async () => {
    const req = {
      body: {
        email: 'email@mails.com',
        password: 'password',
        token: 'randomtoken'
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
    const reqSpyOne = jest.spyOn(PasswordResetModel, 'findOne').mockReturnValue(true);
    const reqSpyTwo = jest.spyOn(UserModel, 'findOne').mockReturnValue(user);


    await validators.resetPasswordValidator(req, res, next);
    expect(reqSpyOne).toHaveBeenCalled();
    expect(reqSpyTwo).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return a 422 if validation fails due to invalid token', async () => {
    const req = {
      body: {
        email: 'emails@mail.com',
        password: 'password',
        token: 34343
      }
    };
    const next = jest.fn();
    const res = new Response();

    const reqSpy = jest.spyOn(PasswordResetModel, 'findOne').mockReturnValue(null);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.resetPasswordValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          email: 'Invalid password reset token.'
        }
      }
    });
  });

  it('should return a 422 if validation fails due to no email', async () => {
    const req = {
      body: {
        email: '',
        password: 'password',
        token: 'randomtoken'
      }
    };
    const next = jest.fn();
    const res = new Response();

    const reqSpy = jest.spyOn(PasswordResetModel, 'findOne').mockReturnValue(null);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.resetPasswordValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          email: 'email is a required field'
        }
      }
    });
  });
});
