const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

const { body, validationResult } = require('express-validator')
const validator = require('../middleware/validator/userValidator')

const { verifyToken } = require('../util/jwt')

router
.post('/register',
  // body('age').notEmpty().withMessage('请输入年龄').isLength({min: 1, max: 3}).withMessage('长度不能大于3'),
  validator.register,
  userController.register)
.post('/logins', validator.login, userController.login)
.get('/list', verifyToken, userController.list)
.delete('/', userController.delete)

module.exports = router