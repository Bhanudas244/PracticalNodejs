const express = require('express')
const route = express.Router()
const BookController  = require('../controller/book.controller')


route.get('/',BookController.index)
route.post('/',BookController.store)
route.get('/:bookId',BookController.edit)
route.patch('/update/:bookId',BookController.update)
route.delete('/delete/:bookId',BookController.delete)


module.exports = route