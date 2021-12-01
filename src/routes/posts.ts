import type { Request, Response } from 'express'
import { Router } from 'express'
import Post from '../models/post'

const route = Router()

// get all posts
route.get('/', async (req: Request, res: Response) => {
  const posts = await Post.find({})
  res.send(posts)
})

// get post by symbol
route.get('/:symbol', async (req: Request, res: Response) => {
  const post = await Post.findOne({
    symbol: req.params.symbol
  })
  if (req.query.branch) {
    console.log(req.query.branch)
  }
  res.send(post)
})

// get posts by creator
route.get('/user/:userId', async (req: Request, res: Response) => {
  const posts = await Post.find({
    creator: req.params.userId
  }).exec()
  res.send(posts)
})

// create post
route.post('/', async (req: Request, res: Response) => {
  const post = await Post.findOne({
    symbol: req.body.symbol
  })
  if (post) {
    res.status(400).send({ message: 'already exist' })
  } else {
    const post = new Post(req.body)
    await post.save()
    res.send(post)
  }
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

/*
 * Branch
 */

module.exports = route
