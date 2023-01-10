import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { 
    type: String 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password: { 
    type: String, 
    required: true, 
    select: false 
  },
  permission: { 
    type: String, 
    enum: ["normal", "admin"],
    required: [true, "Please specify user permission"]
  },
  telephone: { 
    type: String 
  },
  createAt: { 
    type: Date, 
    default: Date.now 
  }
})

const user = mongoose.model('User', userSchema)

export default user
