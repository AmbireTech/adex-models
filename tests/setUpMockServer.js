const express = require('express')
const bodyParser = require('body-parser')
const headerParser = require('header-parser')
const testRoutes = require('./testRoutes')

const app = express()
const PORT = 3333
const router = express.Router()

app.use(headerParser)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', testRoutes)

app.listen(PORT, () => console.log(`Testove mestove happens on ${PORT}`))

module.exports = app