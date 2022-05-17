require('dotenv').config()
const express = require('express')
const cors = require('cors')
const challengeRoutes = require('./router/router.js')
const Connect = require('./database/database.js')

const app = express()
const { PORT } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', challengeRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`)
  Connect()
})