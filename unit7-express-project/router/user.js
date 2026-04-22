const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

const { body, validationResult } = require('express-validator')
const validator = require('../middleware/validator/userValidator')

const { verifyToken } = require('../util/jwt')

const multer  = require('multer')
const upload = multer({ dest: 'public/' })

router
.post('/register',
  // body('age').notEmpty().withMessage('请输入年龄').isLength({min: 1, max: 3}).withMessage('长度不能大于3'),
  validator.register,
  userController.register)
.post('/logins', validator.login, userController.login)
.get('/list', verifyToken(), userController.list)
.put('/', verifyToken(), validator.update, userController.update) // 编辑用户
.delete('/', userController.delete) // 删除用户
.post('/headimg', verifyToken(), upload.single('headimg'), userController.headimg) // 上传头像

module.exports = router