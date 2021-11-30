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

export default model<Post>('Post', postSchema)
