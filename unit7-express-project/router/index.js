const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.methods)
  res.send('/index')
})

router.get('/user', (req, res) => {
  console.log(111,req.method)
  JSON.parse('(')
  res.send('/user')
})

// 路由链式调用
router.get('/list', (req, res) => {
  console.log(req.methods)
  res.send('/video-list')
}).get('/username', (req, res) => {
  console.log(req.methods)
  res.send('/user')
})

module.exports = router