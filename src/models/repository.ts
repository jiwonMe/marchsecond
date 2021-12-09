import { Schema, model } from 'mongoose'
import type { Repository } from '../types/Repository'

const repositorySchema = new Schema<Repository>({
  symbol: { type: String, required: true, unique: true },
  branches: { type: Map, of: Schema.Types.ObjectId, required: false },
  currentBranch: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: true
})

export default model<Repository>('Repository', repositorySchema)
