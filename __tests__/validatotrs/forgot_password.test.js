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

describe('The forgot password validator', () => {
  it('should call the next function when it succeeds', async () => {
    const req = {
      body: {
        email: 'emails@mails.com'
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
    const reqSpyOne = jest.spyOn(UserModel, 'findOne').mockReturnValue(user);
    const reqSpyTwo = jest.spyOn(PasswordResetModel, 'findOne').mockReturnValue(false);


    await validators.forgotPasswordValidator(req, res, next);
    expect(reqSpyOne).toHaveBeenCalled();
    expect(reqSpyTwo).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return a 422 if validation fails due to no email', async () => {
    const req = {
      body: {
        email: ''
      }
    };
    const next = jest.fn();
    const res = new Response();

    const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(null);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.forgotPasswordValidator(req, res, next);
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

  it('should return a 422 if validation fails due to non existing user', async () => {
    const req = {
      body: {
        email: 'wrongemail@mails.com'
      }
    };
    const next = jest.fn();
    const res = new Response();

    const reqSpy = jest.spyOn(UserModel, 'findOne').mockReturnValue(null);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.forgotPasswordValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          email: 'No account was found with this email.'
        }
      }
    });
  });

  it('should return a 422 if validation fails due to password link sent already', async () => {
    const req = {
      body: {
        email: 'emails@mails.com'
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

    const reqSpyOne = jest.spyOn(UserModel, 'findOne').mockReturnValue(user);
    const reqSpyTwo = jest.spyOn(PasswordResetModel, 'findOne').mockReturnValue(true);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.forgotPasswordValidator(req, res, next);
    expect(reqSpyOne).toHaveBeenCalled();
    expect(reqSpyTwo).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          email: 'Password reset link already sent.'
        }
      }
    });
  });
});
