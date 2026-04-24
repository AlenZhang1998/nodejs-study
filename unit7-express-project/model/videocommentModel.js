const mongoose = require('mongoose')
// const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const videocommentScheme = new mongoose.Schema({
  content: {
    // 评论内容
    type: String,
    required: true
  },
  video: {
    // 被评论的视频id
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video' // 和videoModel关联
  },
  user: {
    // 哪个用户评论的
    type: mongoose.ObjectId,
    required: true,
    ref: 'User' // 和userModel关联
  },
  ...baseModel
})

module.exports = videocommentScheme
