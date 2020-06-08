import mongoose from 'mongoose';


const { Schema } = mongoose;

const ConnectionSchema = new Schema({
  connectionSme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sme'
  },
  connectionInvestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  },
  smeConnecting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sme'
  },
  investorConnecting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  },
  status: {
    type: String,
    enum: ['pending', 'active'],
    default: 'pending',
    required: true
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

const ConnectionModel = mongoose.model('Connection', ConnectionSchema);

export default ConnectionModel;
