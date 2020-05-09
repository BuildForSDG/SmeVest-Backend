import mongoose from 'mongoose';


const { Schema } = mongoose;

const InvestmentSchema = new Schema({
  projId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  smeId: {
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
