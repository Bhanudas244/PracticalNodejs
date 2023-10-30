const express = require('express')
const route = express.Router()
const bookRoute  = require('./book.route')


route.use('/book',bookRoute)




module.exports = route