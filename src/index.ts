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

app.use('/user', require('./routes/users'))

app.use('/post', require('./routes/posts'))

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT || 2000}`)
})
