const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
dotenv.config() // Load .env file

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true }) // Connect to MongoDB
  .then(() => console.log('MongoDB Connected'))
  .catch((err: Error) => console.log(err))

/*
 * server listening on port that is defined
 * in .env file or default to 2000
 */

// const jsonFile = fs.readFileSync('./data/user.sample.json', 'utf8')
//
// const users: User[] = JSON.parse(jsonFile)
//
// // Route: /users (GET) - Return all users
// app.get('/admin/users', (req: Request, res: Response) => {
//   res.send(users)
// })

// // create method
// // Route: /user (POST) - Create new user
// app.post('/user', (req: Request, res: Response) => {
//   const user = req.body
//   user.id = nanoid(8)
//   users.push(user)
//   res.send(user)
// })

// // read method
// // Route: /user/:id (GET) - Return user with id
// app.get('/user/:id', (req: Request, res: Response) => {
//   const id = req.params.id
//   const userFounded = users.find((user: User) => user.userId === id)
//   if (userFounded) {
//     res.send(userFounded)
//   } else {
//     res.status(404).send({ message: `User with id ${id} not found` })
//   }
// })

// // update method
// // Route: /user/:id (PUT) - Update user with id
// app.put('/user/:id', (req: Request, res: Response) => {
//   const id = req.params.id
//   const userIndex = users.findIndex((user: User) => user.userId === id)
//   if (users[userIndex]) {
//     const user = {
//       ...users[userIndex],
//       ...req.body
//     }
//     console.log(user)
//     users[userIndex] = user
//     res.send(user)
//   } else {
//     res.status(404).send({ message: `User with id ${id} not found` })
//   }
// })

// // delete method
// // Route: /user/:id (DELETE) - Delete user with id
// app.delete('/user/:id', (req: Request, res: Response) => {
//   const id = req.params.id
//   const userFounded = users.find((user: User) => user.userId === id)
//   if (userFounded) {
//     const userIndex = users.findIndex((user: User) => user.userId === id)
//     users.splice(userIndex, 1)
//     res.send({ message: `User with id ${id} deleted` })
//   } else {
//     res.status(404).send({ message: `User with id ${id} not found` })
//   }
// })

app.use('/users', require('./routes/users'))

app.use('/posts', require('./routes/posts'))

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT || 2000}`)
})
