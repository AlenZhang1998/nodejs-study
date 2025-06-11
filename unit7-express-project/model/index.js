const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/express-video')
}

// // 创建一个用户集合
// // 定义模型
// const user = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   }
// })

// const userModel = mongoose.model('User', user) // 第一个参数是集合的名字+s
// const u = new userModel({
//   name: '张三',
//   age: 18
// })

// u.save().then(res => {
//   console.log(666, res)
// })


main().then(res => {
  console.log(res, 'mongo连接成功')
}).catch(err => {
  console.log(err,'mongo连接失败')
})

module.exports = {
  User: mongoose.model('User', require('./userModel'))
}