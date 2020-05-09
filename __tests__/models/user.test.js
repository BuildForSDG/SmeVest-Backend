/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { disconnect } from '../../src/utils';
import config from '../../src/config';
import { UserModel } from '../../src/models';

describe('The User model', () => {
  const user = {
    email: 'test@user.com',
    password: 'password',
    role: 'sme'
  };

  let createdUser;

  beforeAll(async () => {
    await UserModel.deleteMany();
    createdUser = await UserModel.create(user);
  });

  it('should hash the user password before saving to the database', async () => {
    expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(true);
  });

  it('should set the email confirm code for the user before saving to the database', async () => {
    expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
  });

  describe('The generateToken method', () => {
    it('should generate a valid jwt for a user', async () => {
      const token = createdUser.generateToken();

      const { id } = jwt.verify(token, config.jwtSecret);

      expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)));
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
