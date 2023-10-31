const express = require('express')
const route = express.Router()
const bookRoute  = require('./book.route')
const reelRoute  = require('./reel.route')


route.use('/book',bookRoute)
route.use('/reel',reelRoute)




module.exports = route