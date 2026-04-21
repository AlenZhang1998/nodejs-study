const { User } = require('../model')
const fs = require('fs')
// const jwt = require('jsonwebtoken')
const { createToken } = require('../util/jwt')
const { promisify } = require('util')

const rename = promisify(fs.rename)

// 用户注册
exports.register = async (req, res) => {
  console.log('7-register', req.body)
  // return
  // res.send('/user-register')
  const userModel = new User(req.body)
  const dbBack = await userModel.save() // 把这个对象保存到数据库 save() 是 Mongoose 文档实例的方法。
  user = dbBack.toJSON()
  delete user.password // 避免密码泄露 防接口响应时把密码发回前端
  res.status(201).json({user})
}

// 用户登录
exports.login = async (req, res) => {
  console.log('19-login', req.body)
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
  console.log(34, req.user)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  res.send('/user-delete')
}

// 用户修改
exports.update = async (req, res) => {
  console.log('45-login', req.user)
  const id = req.user.userinfo._id
  const dbBack = await User.findByIdAndUpdate(id, req.body, {
    new: true, // 这样才能返回最新数据
    runValidators: true
  }) // jwt req.user = userinfo
  console.log(48, dbBack)
  res.status(200).json({user: dbBack})
}

// 上传头像
exports.headimg = async (req, res) => {
  console.log('57-headimg', req.file)
  // {
  //   "fieldname": "headimg",
  //   "originalname": "id_b.jpg",
  //   "encoding": "7bit",
  //   "mimetype": "image/jpeg",
  //   "destination": "public/",
  //   "filename": "2891f7aea542b8377a0c2a54496e19f1",
  //   "path": "public\\2891f7aea542b8377a0c2a54496e19f1",
  //   "size": 5766197
  // }
  try {
    const fileArr = req.file.originalname.split('.')
    const fileType = fileArr[fileArr.length - 1]
    await rename(
      './public/' + req.file.filename,
      './public/' + req.file.filename + '.' + fileType
    )
    res.status(201).json({filepath: req.file.filename + '.' + fileType})
  } catch (error) {
    res.status(500).json({error})
  }
  
  // const id = req.user.userinfo._id
  // const dbBack = await User.findByIdAndUpdate(id, {image: req.file.path}, {
  //   new: true, // 这样才能返回最新数据
  //   runValidators: true
  // }) // jwt req.user = userinfo
  // console.log(60, dbBack)
  // res.status(200).json({user: dbBack})
}