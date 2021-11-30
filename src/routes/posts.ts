import type { Request, Response } from 'express'
import { Router } from 'express'
import Post from '../models/post'

const route = Router()

// get all posts
route.get('/', async (req: Request, res: Response) => {
  const posts = await Post.find({})
  res.send(posts)
})

// get post by id
route.get('/:id', async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id)
  res.send(post)
})

// create post
route.post('/', async (req: Request, res: Response) => {
  const post = new Post(req.body)
  await post.save()
  res.send(post)
})

// update post
route.put('/:id', async (req: Request, res: Response) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(post)
})

// delete post
route.delete('/:id', async (req: Request, res: Response) => {
  await Post.findByIdAndRemove(req.params.id)
  res.send({})
})

module.exports = route
