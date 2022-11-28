import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  permission: { type: String, required: true },
  telephone: { type: String },
});

const users = mongoose.model('users', userSchema);

export default users;
