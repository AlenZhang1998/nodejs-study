const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

const { body, validationResult } = require('express-validator')

router
.post('/register',
  // body('age').notEmpty().withMessage('请输入年龄').isLength({min: 1, max: 3}).withMessage('长度不能大于3'),
  [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('age').notEmpty().withMessage('请输入年龄').isLength({min: 1, max: 3}).withMessage('长度不能大于3')
  ],
  (req, res, next) => {
    const err = validationResult(req);
    if (err) {
      console.log(err)
    }
    userController.register
  })
.get('/list', userController.list)
.delete('/', userController.delete)

module.exports = router