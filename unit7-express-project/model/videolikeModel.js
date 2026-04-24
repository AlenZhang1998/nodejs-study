const mongoose = require('mongoose')
// const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const videolikeScheme = new mongoose.Schema({
  user: { // 谁点的喜欢
    type: mongoose.ObjectId,
    required: true,
    ref: 'User' // 和userModel关联
  },
  video: { // 喜欢的视频id
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video' // 和videoModel关联
  },
  like: { // 喜欢1 / 不喜欢-1
    type: Number,
    required: true,
    enum: [1, -1]
  },
  
  ...baseModel
})

module.exports = videolikeScheme
