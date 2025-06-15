const { body } = require('express-validator')

module.exports.register = [
  body('username').notEmpty().withMessage('用户名不能为空'),
  body('password').notEmpty().withMessage('密码不能为空'),
  body('age').notEmpty().withMessage('请输入年龄').bail().isLength({min: 1, max: 3}).withMessage('长度不能大于3')
]
