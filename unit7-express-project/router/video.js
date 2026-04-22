const express = require('express')

const router = express.Router()
const videoValidator = require('../middleware/validator/videoValidator')
const videoController = require('../controller/videoController')
const { verifyToken } = require('../util/jwt')

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
router
.get('/videolist', videoController.videolist)
.get('/:videoId', verifyToken(false), videoController.video)
.post('/createVideo', verifyToken(), videoValidator.createVideo, videoController.createVideo)

module.exports = router
