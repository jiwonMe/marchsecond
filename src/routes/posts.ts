import type { Request, Response } from 'express'
import { Router } from 'express'
import Post from '../models/post'
import Branch from '../models/branch'
import Repository from '../models/repository'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
  // when no query is provided, return all branches' head posts.
  const repositories = await Repository.find({})

  res.send(repositories)
})

// get post by symbol
route.get('/:symbol', async (req: Request, res: Response) => {
  const repository = await Repository.findOne({
    symbol: req.params.symbol
  })
  if (repository) {
    if (req.query.branch) {
      const branch = await Branch.findById(repository.branches.get(req.query.branch as string))
      if (branch) {
        const post = await Post.findById(branch.head)
        res.send(post)
      } else {
        res.status(404).send('branch not found')
      }
    } else {
      const branch = await Branch.findById(repository.currentBranch)
      if (branch) {
        const post = await Post.findById(branch.head)
        res.send(post)
      } else {
        res.status(404).send('branch not found')
      }
    }
  } else {
    res.status(404).send('Repository not found')
  }
})

// create post
route.post('/', async (req: Request, res: Response) => {
  const repository = await Repository.findOne({
    symbol: req.body.symbol
  })
  if (!repository) {
    // if repository doesn't exist, create it
    const newRepository = new Repository({
      symbol: req.body.symbol,
      branches: new Map()
    })

    // create post node
    const newPost = new Post({
      symbol: req.body.symbol,
      creator: req.body.creator,
      title: req.body.title,
      content: req.body.content,
      imagePath: req.body.imagePath || null,
      repository: newRepository._id
    })

    // create branch and add post node to it
    const newBranch = new Branch({
      symbol: req.body.symbol,
      name: 'main',
      from: newPost._id,
      head: newPost._id
    })

    // add post to branch
    newBranch.posts.push(newPost)
    // add branch to repository
    newRepository.branches.set(newBranch.name, newBranch._id)
    newRepository.currentBranch = newBranch._id

    // save all
    await newRepository.save()
    await newBranch.save()
    await newPost.save()

    res.status(201).send(newPost)
  } else {
    res.status(400).send('Repository already exists')
  }
})

// update post by symbol
route.put('/:symbol', async (req: Request, res: Response) => {
  // find repository by symbol
  const repository = await Repository.findOne({
    symbol: req.params.symbol
  })

  const post = new Post({
    symbol: req.params.symbol,
    content: req.body.content,
    creator: req.body.creator,
    imagePath: req.body.imagePath || null,
    title: req.body.title
  })

  if (repository) {
    post.repository = repository._id
    if (req.query.branch) {
      // if branch is specified, add new post node in that branch
      // find branch by name
      const branch = await Branch.findById(repository.branches.get(req.query.branch as string))
      if (branch) {
        branch.head = post._id
        branch.posts.push(post._id)
        await branch.save()
      } else {
        // create new Branch
        const newBranch = new Branch({
          symbol: req.params.symbol,
          name: req.query.branch as string,
          from: repository.currentBranch.head
        })

        newBranch.posts.push(post._id)

        // add branch to repository
        repository.branches.set(newBranch.name, newBranch._id)

        repository.currentBranch = newBranch._id

        await post.save()
        await newBranch.save()
        await repository.save()
      }
    } else {
      const branch = await Branch.findById(repository.currentBranch)
      if (branch) {
        branch.head = post._id
        branch.posts.push(post._id)
        await branch.save()
      } else {
        res.status(400).send('Current Branch not found')
      }
    }
  } else {
    res.status(404).send('Repository not found')
  }
})

// delete all post and branch in repository
route.delete('/:symbol', async (req: Request, res: Response) => {
  await Repository.deleteOne({
    symbol: req.params.symbol
  })

  await Branch.deleteMany({
    symbol: req.params.symbol
  })

  await Post.deleteMany({
    symbol: req.params.symbol
  })

  res.send('success')
})

module.exports = route
