import mongoose from 'mongoose';


const { Schema } = mongoose;

const InvestmentSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  sme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sme'
  },
  status: {
    type: String,
    enum: ['accepted', 'applied'],
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

const InvestmentModel = mongoose.model('Investment', InvestmentSchema);

export default InvestmentModel;
