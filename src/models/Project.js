import mongoose from 'mongoose';


const { Schema } = mongoose;

const ProjectSchema = new Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  },
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  offerRate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'given'],
    required: true,
    default: 'active'
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

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
