const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: val => {
      return md5(val)
    }
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  // image: {
  //   type: String,
  //   default: null
  // },
  ...baseModel
  
})

module.exports = userScheme