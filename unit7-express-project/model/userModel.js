const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: val => {
      return md5(val)
    },
    select: false // 查询的时候剔除 select: false：防查询时默认带出密码
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  image: { // 头像
    type: String,
    default: null
  },
  cover: { // 频道封面
    type: String,
    default: null
  },
  channeldes: { // 频道描述
    type: String,
    default: null
  },
  ...baseModel
  
})

module.exports = userScheme