/* eslint-disable func-names */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import randomstring from 'randomstring';
import config from '../config';
import services from '../services';

const { sendEmailNodemailer } = services;

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'sme', 'investor'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailConfirmCode: {
    type: String,
    required: false
  },
  emailConfirmedAt: {
    type: Date,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: false
  }
});

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

/**
 * Hash and save the user's password before
 * saving to the database
 *
 * @return {null}
 */
UserSchema.pre('save', async function () {
  this.password = bcrypt.hashSync(this.password, salt);
  this.emailConfirmCode = randomstring.generate();
});

/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */
UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Send user email confirmation code after registration.
 *
 * @return {null}
 */
UserSchema.post('save', async function () {
  await this.sendEmailConfirmationEmail();
});

/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret);
};

/**
 * Send account confirmation email
 *
 * @return {Promise}
 */
UserSchema.methods.sendEmailConfirmationEmail = async function () {
  const sentEmail = await sendEmailNodemailer(this.email, 'confirmEmail', { code: this.emailConfirmCode });
  return sentEmail;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
