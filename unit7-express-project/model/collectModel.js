const mongoose = require('mongoose')
// const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const collectScheme = new mongoose.Schema({
  user: {
    // 谁收藏了哪个视频
    type: mongoose.ObjectId,
    required: true,
    ref: 'User' // 和userModel关联
  },
  video: {
    // 视频id
    type: mongoose.ObjectId,
    required: true,
    ref: 'Video' // 和videoModel关联
  },

  ...baseModel
})

module.exports = collectScheme
