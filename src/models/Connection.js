import mongoose from 'mongoose';


const { Schema } = mongoose;

const ConnectionSchema = new Schema({
  smeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sme'
  },
  invId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  },
  status: {
    type: String,
    enum: ['pending', 'declined', 'active'],
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
