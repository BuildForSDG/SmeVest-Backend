import mongoose from 'mongoose';

const { Schema } = mongoose;

const PasswordResetSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PasswordResetModel = mongoose.model('PasswordReset', PasswordResetSchema);

export default PasswordResetModel;
