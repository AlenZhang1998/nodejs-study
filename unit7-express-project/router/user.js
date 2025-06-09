const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
.get('/list', userController.list)
.delete('/', userController.delete)

module.exports = router