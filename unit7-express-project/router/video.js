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
  .post('/createVideo', verifyToken(), videoValidator.createVideo, videoController.createVideo) // 上传视频
  .post('/comment/:videoId', verifyToken(), videoValidator.comment, videoController.comment) // 添加视频评论
  .get('/commentlist/:videoId', videoController.commentlist) // 获取评论列表
  .delete('/:videoId', verifyToken(), videoController.delete) // 删除视频
  .delete('/comment/:videoId/:commentId', verifyToken(), videoController.deletecomment) // 删除视频评论
  .get('/like/:videoId', verifyToken(), videoController.likevideo) // 喜欢视频
  .get('/dislike/:videoId', verifyToken(), videoController.dislikevideo) // 不喜欢视频
  .get('/likelist', verifyToken(), videoController.likelist) // 喜欢的视频列表
  .get('/:videoId', verifyToken(false), videoController.video) // 获取视频详情
  .get('/collect/:videoId', verifyToken(), videoController.collectVideo) // 收藏视频

module.exports = router
