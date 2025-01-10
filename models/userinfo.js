import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { 
    timestamps: true,
    collection: 'userinfos'  // Ensure collection is correctly named
  }
);

export const userinfos = mongoose.models.userinfos || mongoose.model('userinfos', userSchema);
