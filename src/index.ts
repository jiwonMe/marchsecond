import type { Request, Response } from 'express'

const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const fs = require('fs')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
dotenv.config() // Load .env file

const app = express()

app.use(bodyparser.json())

/*
 * server listening on port that is defined
 * in .env file or default to 2000
 */

const jsonFile = fs.readFileSync('./data/user.sample.json', 'utf8')

interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
}

const users: User[] = JSON.parse(jsonFile)

// Route: /users (GET) - Return all users
app.get('/admin/users', (req: Request, res: Response) => {
  res.send(users)
})

// create method
// Route: /user (POST) - Create new user
app.post('/user', (req: Request, res: Response) => {
  const user = req.body
  user.id = nanoid(8)
  users.push(user)
  res.send(user)
})

// read method
// Route: /user/:id (GET) - Return user with id
app.get('/user/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const userFounded = users.find((user: User) => user.id === id)
  if (userFounded) {
    res.send(userFounded)
  } else {
    res.status(404).send({ message: `User with id ${id} not found` })
  }
})

// update method
// Route: /user/:id (PUT) - Update user with id
app.put('/user/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const userIndex = users.findIndex((user: User) => user.id === id)
  if (users[userIndex]) {
    const user = {
      ...users[userIndex],
      ...req.body
    }
    console.log(user)
    users[userIndex] = user
    res.send(user)
  } else {
    res.status(404).send({ message: `User with id ${id} not found` })
  }
})

// delete method
// Route: /user/:id (DELETE) - Delete user with id
app.delete('/user/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const userFounded = users.find((user: User) => user.id === id)
  if (userFounded) {
    const userIndex = users.findIndex((user: User) => user.id === id)
    users.splice(userIndex, 1)
    res.send({ message: `User with id ${id} deleted` })
  } else {
    res.status(404).send({ message: `User with id ${id} not found` })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT || 2000}`)
})
