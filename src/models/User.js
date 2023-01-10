import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  permission: { type: String, required: true },
  telephone: { type: String },
  createAt: { type: Date, default: Date.now }
})

const user = mongoose.model('user', userSchema)

export default user
