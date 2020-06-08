import mongoose from 'mongoose';


const { Schema } = mongoose;

const SmeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  about: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    lowercase: true
  },
  country: {
    type: String,
    required: false,
    default: 'Nigeria'
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  moto: {
    type: String,
    required: false
  },
  teamSize: {
    type: String,
    required: true
  },
  credVerification: {
    type: String,
    enum: ['not_verified', 'verified', 'pending', 'declined'],
    default: 'not_verified',
    required: false
  },
  webLink: {
    type: String,
    required: false
  },
  linkedInLink: {
    type: String,
    required: false
  },
  twitterLink: {
    type: String,
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

const SmeModel = mongoose.model('Sme', SmeSchema);

export default SmeModel;
