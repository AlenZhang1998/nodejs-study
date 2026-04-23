const { User, Subscribe } = require('../model')
const fs = require('fs')
const lodash = require('lodash')
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
  const dbBack = await User.find()
  res.status(200).json({userlist: dbBack})
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
}

// 关注频道
exports.subscribe = async (req, res) => {
  try {
    // 不能关注自己  拿到当前 id 与被关注的 id
    console.log('87-subscribe', req.user.userinfo._id)
    const userId = String(req.user.userinfo._id)
    const channelId = req.params.userId

    if (userId === channelId) {
      return res.status(401).json({err: '不能关注自己'})
    }

    // 查询是否已关注
    const record = await Subscribe.findOne({
      user: userId,
      channel: channelId
    })

    if (record) {
      return res.status(401).json({err: '你已经关注啦'})
    } else {
      const channelUser = await User.findById(channelId)
      if (!channelUser) {
        return res.status(404).json({err: '用户不存在'})
      }
      // 新增关注
      await new Subscribe({
        user: userId,
        channel: channelId
      }).save()

      // 关注数量+1
      channelUser.subscribeCount++
      await channelUser.save()

      return res.status(200).json({msg: '关注成功'})
    }
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 422 : 500
    return res.status(statusCode).json({err: error.message})
  }
}

//取消关注
exports.unsubscribe = async (req, res) => {
  try {
    // 不能取消关注自己  拿到当前 id 与被关注的 id
    console.log('134-unsubscribe', req.user.userinfo._id)
    const userId = String(req.user.userinfo._id)
    const channelId = req.params.userId

    if (userId === channelId) {
      return res.status(401).json({err: '不能取消关注自己'})
    }

    // 查询是否已取关
    const record = await Subscribe.findOne({
      user: userId,
      channel: channelId
    })

    if (!record) {
      return res.status(401).json({err: '你已经取消关注啦'})
    } else {
      await record.deleteOne()
      
      const channelUser = await User.findById(channelId)
      if (!channelUser) {
        return res.status(404).json({err: '用户不存在'})
      }

      // 关注数量-1
      channelUser.subscribeCount--
      await channelUser.save()

      return res.status(200).json({msg: '取消关注成功'})
    }
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 422 : 500
    return res.status(statusCode).json({err: error.message})
  }
}

// 获取频道
exports.getuser = async (req, res) => {
  try {
    // console.log(req.params)
    // const userId = String(req.user.userinfo._id)
    const channelId = req.params.userId
    let isSubscribe = false

    if (req.user) { // 如果已登录
      // 再看是否关注过用户
      const record = await Subscribe.findOne({
        user: String(req.user.userinfo._id),
        channel: channelId
      })

      if (record) { // 关注过
        isSubscribe = true
      }
    }
    const user = await User.findById(channelId)
    if (!user) {
      return res.status(404).json({ err: '用户不存在' })
    }    
    // user.isSubscribe = isSubscribe

    return res.status(200).json({
      ...lodash.pick(user, [ // pick 创建一个从object中选中属性的对象
        '_id',
        'username',
        'image',
        'subscribeCount',
        'cover',
        'channeldes',
      ]),
      isSubscribe
    })
  } catch (error) {
    return res.status(500).json({err: error})
  }
}

// 获取关注列表
exports.getsubscribe = async (req, res) => {
  try {
    const subscribeList = await Subscribe.find({
      user: req.params.userId
    }).populate('channel', '_id username image subscribeCount cover channeldes')
    // 加了 .populate('channel') 之后，Mongoose 会自动去把这个 ObjectId 对应的 User 文档查出来并替换进去。

    return res.status(200).json(subscribeList)
  } catch (error) {
    return res.status(500).json({err: error})
  }
}

// 获取粉丝列表
exports.getchannel = async (req, res) => {
  try {
    const channelList = await Subscribe.find({
      user: req.user.userinfo._id // 自己的id
    }).populate('user', '_id username image subscribeCount cover channeldes')
    // 加了 .populate('channel') 之后，Mongoose 会自动去把这个 ObjectId 对应的 User 文档查出来并替换进去。

    return res.status(200).json(channelList)
  } catch (error) {
    return res.status(500).json({err: error})
  }
}