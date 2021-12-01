import { Schema, model } from 'mongoose'
import type { Branch } from '../types/Branch'

const branchSchema = new Schema<Branch>({
  name: { type: String, required: true },
  head: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  from: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, {
  timestamps: true
})

export default model<Branch>('Branch', branchSchema)
