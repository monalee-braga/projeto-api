import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  id: { type: String },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiredAt: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique: true,
    required: true
  }
})

const token = mongoose.model('token', tokenSchema)

export default token
