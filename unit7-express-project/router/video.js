const express = require('express')

const router = express.Router()
const videoController = require('../controllers/videoController')

// router.get('/list', (req, res) => {
//   console.log(req.methods)
//   res.send('/video-list')
// })

// router.get('/user', (req, res) => {
//   console.log(111,req.method)
//   JSON.parse('(')
//   res.send('/user')
// })

// 路由链式调用
router.get('/list', videoController.list)

module.exports = router