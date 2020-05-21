/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */
import validators from '../../src/validators';
import models from '../../src/models';

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

describe('The register validator', () => {
  it('should call the next function when validation succeeds', async () => {
    const req = {
      body: {
        email: 'a@mails.com',
        password: 'password',
        role: 'sme'
      }
    };
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(models.UserModel, 'findOne').mockImplementation(() => null);

    await validators.registerValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('it should return 422 if validation fails because email already exist', async () => {
    const req = {
      body: {
        email: 'a@mails.com',
        password: 'password',
        role: 'sme'
      }
    };
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(models.UserModel, 'findOne').mockImplementation(() => true);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.registerValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          email: 'This email has already been taken.'
        }
      }
    });
  });

  it('should return a 422 if validation fails', async () => {
    const req = {
      body: {
        email: 'b@mail.com',
        password: 'password'
      }
    };
    const next = jest.fn();
    const res = new Response();

    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.registerValidator(req, res, next);
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          role: 'role is a required field'
        }
      }
    });
  });

  it('should return a 422 if validation fails', async () => {
    const req = {
      body: {
        email: 'c@mail.com',
        role: 'sme'
      }
    };
    const next = jest.fn();
    const res = new Response();

    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.registerValidator(req, res, next);
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          password: 'password is a required field'
        }
      }
    });
  });
});
