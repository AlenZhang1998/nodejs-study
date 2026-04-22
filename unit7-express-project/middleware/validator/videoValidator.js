// bail 如果前面验证不通过，后面就不继续
// https://express-validator.github.io/docs/guides/manually-running

const { body } = require('express-validator')
const validate = require('./errorBack')
const { User } = require('../../model/index')

module.exports.createVideo = validate([
  body('title').notEmpty().withMessage('视频名不能为空').bail().isLength({max: 20}).withMessage('视频名不能大于20')
])