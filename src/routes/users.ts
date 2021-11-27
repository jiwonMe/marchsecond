import type { Request, Response } from 'express'
import { Router } from 'express'
import User from '../models/user'

const route = Router()

// get all users
route.get('/', async (req: Request, res: Response) => {
  const users = await User.find({})
  res.send(users)
})

// get user by id
route.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: `User with id ${req.params.id} not found` })
  }
})

// create user
route.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body)
  await user.save()
  res.send(user)
})

// update user
route.put('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: `User with id ${req.params.id} not found` })
  }
})

// delete user
route.delete('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: `User with id ${req.params.id} not found` })
  }
})

export default Router
