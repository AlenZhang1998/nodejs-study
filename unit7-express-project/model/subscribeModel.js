const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const subscribeScheme = new mongoose.Schema({
  user: {
    // 发起关注的人 / 粉丝
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  channel: {
    // 被关注的人 / 频道
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  ...baseModel
})

module.exports = subscribeScheme

// 张三关注了李四
// {
//   user: 张三的id,
//   channel: 李四的id
// }
