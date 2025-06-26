const { User } = require('../model')
// const jwt = require('jsonwebtoken')
const { createToken } = require('../util/jwt')

// 用户注册
exports.register = async (req, res) => {
  console.log('register', req.body)
  // return
  // res.send('/user-register')
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  user = dbBack.toJSON()
  delete user.password
  res.status(201).json({user})
}

// 用户登录
exports.login = async (req, res) => {
  console.log('login', req.body)
  // 客户端数据验证
  // 连接数据库查询
  let dbBack = await User.findOne(req.body)
  if(!dbBack) {
    res.status(402).json({error: '邮箱或者密码不正确'})
  }

  dbBack = dbBack.toJSON()
  // dbBack.token = jwt.sign(dbBack, '05216649-2c81-4ab7-9ec1-b34e7bbd3d19')
  dbBack.token = await createToken(dbBack)
  res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
  console.log(req)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}