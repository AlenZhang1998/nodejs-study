const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

const { body, validationResult } = require('express-validator')
const validator = require('../middleware/validator/userValidator')

router
.post('/register',
  // body('age').notEmpty().withMessage('请输入年龄').isLength({min: 1, max: 3}).withMessage('长度不能大于3'),
  ...validator.register,
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(401).json({error: err.array()})
    }
    next()
  },userController.register)
.get('/list', userController.list)
.delete('/', userController.delete)

module.exports = router