import mongoose from 'mongoose';


const { Schema } = mongoose;

const MessageSchema = new Schema({
  sme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sme'
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  },
  body: {
    type: String,
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

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
