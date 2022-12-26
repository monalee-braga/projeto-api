import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  id: { type: String },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiredAt: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

const token = mongoose.model('tokens', tokenSchema)

export default token
