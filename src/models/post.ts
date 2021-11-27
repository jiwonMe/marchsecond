import { Schema, model } from 'mongoose'
import type { Post } from '../types/Post'

const postSchema = new Schema<Post>({
  url: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

module.exports = model<Post>('Post', postSchema)
