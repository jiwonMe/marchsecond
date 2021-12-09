import { Schema, model } from 'mongoose'
import type { Branch } from '../types/Branch'

const branchSchema = new Schema<Branch>({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  head: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  from: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
  timestamps: true
})

export default model<Branch>('Branch', branchSchema)
