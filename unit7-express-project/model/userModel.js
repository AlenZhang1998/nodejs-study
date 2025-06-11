const mongoose = require('mongoose')

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
    default: '123456'
    // required: true
  },
  // email: {
  //   type: String,
  //   required: true
  // },
  // phone: {
  //   type: String,
  //   required: true
  // },
  // image: {
  //   type: String,
  //   default: null
  // },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = userScheme