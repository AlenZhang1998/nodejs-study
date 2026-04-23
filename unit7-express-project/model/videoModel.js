const mongoose = require('mongoose')
// const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const videoScheme = new mongoose.Schema({
  title: { // 视频标题
    type: String,
    required: true
  },
  description: { // 视频描述
    type: String,
    default: null
  },
  user: { // 
    type: mongoose.ObjectId,
    required: true,
    ref: 'User' // 和userModel关联 表示“视频属于哪个用户”
  },
  cover: { // 视频封面
    type: String,
    default: null
  },
  commentCount: { // 视频评论数
    type: Number,
    default: 0
  },
  ...baseModel
  
})

module.exports = videoScheme
