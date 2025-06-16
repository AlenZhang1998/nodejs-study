const { body } = require('express-validator')
const validate = require('./errorBack')
const { User } = require('../../model/index')

module.exports.register = validate([
  body('username').notEmpty().withMessage('用户名不能为空'),
  body('password').notEmpty().withMessage('密码不能为空'),
  body('age').notEmpty().withMessage('请输入年龄').bail().isLength({min: 1, max: 3}).withMessage('长度不能大于3'),
  body('email').notEmpty().withMessage('请输入邮箱').bail().isEmail().withMessage('邮箱格式不正确').bail().custom(async val => {
    const emailValidator = await User.findOne({email: val})
    if (emailValidator) {
      return Promise.reject('邮箱已被注册')
    }
  }).bail(),
  body('phone').notEmpty().withMessage('请输入手机号').bail().isMobilePhone().withMessage('手机号格式不正确').bail().custom(async val => {
    const phoneValidator = await User.findOne({phone: val})
    if (phoneValidator) {
      return Promise.reject('手机号已被注册')
    }
  }).bail(),
])
