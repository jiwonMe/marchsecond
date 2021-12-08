import type { Request, Response } from 'express'
import { Router } from 'express'
import Post from '../models/post'
import Branch from '../models/branch'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
  // get post by creator
  if (req.query.creator) {
    const posts = await Post.find({
      creator: req.query.creator as string
    }).exec()
    res.send(posts)
  } else {
    // get all posts
    const posts = await Post.find({})
    res.send(posts)
  }
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

// update post by symbol
route.put('/:symbol', async (req: Request, res: Response) => {
  // const post = await Post.findOneAndUpdate({
  //   symbol: req.params.symbol,
  //   branch: req.query.branch
  // }, req.body, { new: true })
  // res.send(post)
  const post = await Post.findOne({
    symbol: req.body.symbol
  })
  if (!post) {
    res.status(400).send({ message: 'post not found' })
  } else {
    const branch = await Branch.findOne({
      name: req.query.branch as string
    })
    if (!branch) {
      res.status(400).send({ message: 'branch not found' })
    } else {
      post.branch = branch._id
      post.save()
      res.send(post)
    }
  }
})

// delete post
route.delete('/:symbol', async (req: Request, res: Response) => {
  const post = await Post.findOneAndRemove({
    symbol: req.params.symbol
  })
  if (post) {
    res.send(post)
  } else {
    res.send({ message: `${req.params.symbol} not found.` })
  }
})

/*
 * Branch
 */

// create new branch
route.post('/:symbol', async (req: Request, res: Response) => {
  const post = await Post.findOne({
    symbol: req.params.symbol
  })
  const branch = await Branch.findOne({
    name: req.body.name
  })
  if (post && branch) {
    res.status(400).send({ message: 'already exist' })
  } else {
    console.log({
      ...req.body,
      head: post?.id,
      from: post?.id
    })
    const branch = new Branch({
      ...req.body,
      head: post,
      from: post
    })
    await branch.save()
    res.send(branch)
  }
})

module.exports = route
