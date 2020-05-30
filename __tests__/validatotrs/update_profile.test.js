/* eslint-disable class-methods-use-this */
/**
 * @jest-environment node
 */
import validators from '../../src/validators';

class Response {
  status(status) {
    this.status = status;

    return this;
  }

  json(data) {
    return data;
  }
}

describe('The update profile validator', () => {
  it('should call the next function when validation succeeds', async () => {
    const req = {
      body: {
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20'
      }
    };
    const next = jest.fn();
    const res = new Response();
    await validators.updateProfileValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return a 422 if validation fails', async () => {
    const req = {
      body: {
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20'
      }
    };
    const next = jest.fn();
    const res = new Response();

    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.updateProfileValidator(req, res, next);
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          name: 'name is a required field'
        }
      }
    });
  });
});
