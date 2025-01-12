import mongoose from 'mongoose';

const UserInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const user_detail = mongoose.model('user_detail', UserInfoSchema);
