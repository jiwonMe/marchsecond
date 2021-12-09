import { Schema, model } from 'mongoose'
import type { Post } from '../types/Post'

const postSchema = new Schema<Post>({
  symbol: { type: String, ref: 'Branch', required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String },
  creator: { type: String, ref: 'User', required: true },
  repository: { type: Schema.Types.ObjectId, ref: 'Repository', required: true }
}, {
  timestamps: true
})

export default model<Post>('Post', postSchema)
