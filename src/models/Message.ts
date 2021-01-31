import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Message', MessageSchema);
