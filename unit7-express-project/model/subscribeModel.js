const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const subscribeScheme = new mongoose.Schema({
  user: { // 
    type: mongoose.ObjectId,
    required: true,
    ref: 'User' // 和userModel关联 表示“视频属于哪个用户”
  },
  channel: { // 视频描述
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  ...baseModel
  
})

module.exports = subscribeScheme