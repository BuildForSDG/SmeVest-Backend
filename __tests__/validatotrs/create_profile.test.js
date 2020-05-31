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

describe('The create profile validator', () => {
  it('should call the next function when validation succeeds for sme', async () => {
    const req = {
      body: {
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20'
      },
      authUser: {
        _id: 'DFFSDFSE32QE',
        role: 'sme'
      }
    };
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(models.SmeModel, 'findOne').mockReturnValue(null);

    await validators.createProfileValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('it should return 422 if validation fails because profile already exist for sme', async () => {
    const req = {
      body: {
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20'
      },
      authUser: {
        _id: 'DFFSDFSE32QE',
        role: 'sme'
      }
    };
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(models.SmeModel, 'findOne').mockReturnValue(true);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.createProfileValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          userId: 'This user has already created profile.'
        }
      }
    });
  });

  it('should call the next function when validation succeeds for investor', async () => {
    const req = {
      body: {
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20'
      },
      authUser: {
        _id: 'DFFSDFSE32QE',
        role: 'investor'
      }
    };
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(models.InvestorModel, 'findOne').mockReturnValue(null);

    await validators.createProfileValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('it should return 422 if validation fails because profile already exist for investor', async () => {
    const req = {
      body: {
        name: 'comp name',
        about: 'about comp',
        category: 'inform tech',
        city: 'comp city',
        address: 'comp address',
        teamSize: '1-20'
      },
      authUser: {
        _id: 'DFFSDFSE32QE',
        role: 'investor'
      }
    };
    const next = jest.fn();
    const res = new Response();
    const reqSpy = jest.spyOn(models.InvestorModel, 'findOne').mockReturnValue(true);
    const statusSpy = jest.spyOn(res, 'status');
    const jsonSpy = jest.spyOn(res, 'json');

    await validators.createProfileValidator(req, res, next);
    expect(reqSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Validation failed.',
      data: {
        errors: {
          userId: 'This user has already created profile.'
        }
      }
    });
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

    await validators.createProfileValidator(req, res, next);
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
