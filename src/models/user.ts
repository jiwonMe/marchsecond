import type { User } from '../types/User'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<User>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tier: { type: String, required: true }
})

// Create Model & Export
export default model<User>('User', userSchema)
