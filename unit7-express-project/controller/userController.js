const { User } = require('../model')

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
  const dbBack = await User.findOne(req.body)
  // 
  res.status(200).json(dbBack)
}

exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}