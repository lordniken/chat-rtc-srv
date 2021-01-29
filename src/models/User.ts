import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  status: {
    type: String
  }
});

module.exports = model('User', UserSchema);
