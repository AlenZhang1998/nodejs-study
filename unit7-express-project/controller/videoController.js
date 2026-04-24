const { Video, Videocomment, Videolike, Subscribe } = require('../model')

const getPageParam = (value, defaultValue) => {
  const parsedValue = Number.parseInt(value, 10)

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return defaultValue
  }

  return parsedValue
}

// 获取视频列表
exports.videolist = async (req, res) => {
  try {
    const pageNum = getPageParam(req.query.pageNum ?? req.body?.pageNum, 1)
    const pageSize = getPageParam(req.query.pageSize ?? req.body?.pageSize, 10)
    const skipCount = (pageNum - 1) * pageSize

    const [videolist, total] = await Promise.all([
      Video.find()
        .sort({ _id: -1 }) // 先按 _id 倒序排好 要放在分页前面， 不然数据顺序可能不稳定
        .skip(skipCount) // 再跳过前面不属于当前页的数据
        .limit(pageSize) // 再取当前页需要的条数
        .populate('user'), // 自动去 User 模型里把这个 ObjectId 对应的用户信息查出来。
      Video.countDocuments() // 同时再查一次总数，返回给前端做分页显示
    ])

    res.status(200).json({
      videolist,
      pageNum,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 获取视频详情
exports.video = async (req, res) => {
  // console.log(42,req.params)
  try {
    const { videoId } = req.params
    const videoDetail = await Video.findById(videoId).populate('user', '_id username cover') // 只要user里面的这几个字段
    let videoInfo = videoDetail.toJSON()
    videoInfo.islike = false
    videoInfo.isdislike = false
    videoInfo.isSubcribe = false
    // console.log(45, videoDetail)

    if (req?.user?.userinfo) {
      // 已登录
      // 判断之前是否喜欢/不喜欢 这个视频
      const userId = req.user.userinfo._id
      const record = await Videolike.findOne({
        user: userId,
        video: videoId,
        like: 1
      })
      const record2 = await Videolike.findOne({
        user: userId,
        video: videoId,
        like: -1
      })
      if (record) {
        videoInfo.islike = true
      }
      if (record2) {
        videoInfo.isdislike = true
      }

      // 判断是否关注过该视频作者
      const record3 = await Subscribe.findOne({
        user: userId,
        channel: videoInfo.user._id
      })
      if (record3) {
        videoInfo.isSubcribe = true
      }
    }

    res.status(200).json(videoInfo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/video-delete')
}

// 上传视频
exports.createVideo = async (req, res) => {
  try {
    const videoModel = new Video({
      ...req.body,
      user: req.user.userinfo._id
    })
    const dbBack = await videoModel.save()

    res.status(201).json({ video: dbBack })
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 422 : 500
    res.status(statusCode).json({ error: error.message })
  }
}

// 200 = 成功
// 201 = 成功并且创建了新资源

// 评论视频
exports.comment = async (req, res) => {
  try {
    const { videoId } = req.params
    // 拿到被评论的视频
    const videoInfo = await Video.findById(videoId)
    if (!videoInfo) {
      return res.status(404).json({ err: '视频不存在' })
    }

    // 添加评论信息
    const comment = await new Videocomment({
      content: req.body.content,
      video: videoId,
      user: req.user.userinfo._id
    }).save()
    videoInfo.commentCount++
    await videoInfo.save()

    res.status(201).json(comment)
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 422 : 500
    res.status(statusCode).json({ error: error.message })
  }
}

// 获取评论列表
exports.commentlist = async (req, res) => {
  try {
    const { videoId } = req.params
    const pageNum = getPageParam(req.query.pageNum ?? req.body?.pageNum, 1)
    const pageSize = getPageParam(req.query.pageSize ?? req.body?.pageSize, 10)
    const skipCount = (pageNum - 1) * pageSize

    const [commentlist, total] = await Promise.all([
      Videocomment.find({ video: videoId })
        .sort({ _id: -1 }) // 先按 _id 倒序排好 要放在分页前面， 不然数据顺序可能不稳定
        .skip(skipCount) // 再跳过前面不属于当前页的数据
        .limit(pageSize) // 再取当前页需要的条数
        .populate('user', '_id username image'), // 自动去 User 模型里把这个 ObjectId 对应的用户信息查出来。
      Videocomment.countDocuments() // 同时再查一次总数，返回给前端做分页显示
    ])

    res.status(200).json({
      commentlist,
      pageNum,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    })
  } catch (error) {
    // const statusCode = error.name === 'ValidationError' ? 422 : 500
    res.status(500).json({ error: error.message })
  }
}

// 删除视频评论
exports.deletecomment = async (req, res) => {
  try {
    // console.log(137, req.user.userinfo._id)
    const { videoId, commentId } = req.params
    // 查询视频是否存在
    const videoInfo = await Video.findById(videoId)
    if (!videoInfo) {
      return res.status(404).json({ err: '视频不存在' })
    }
    // 查询评论是否存在
    const videocommentInfo = await Videocomment.findById(commentId)
    if (!videocommentInfo) {
      return res.status(404).json({ err: '评论不存在' })
    }
    // 只能删除自己写的评论
    if (!videocommentInfo.user.equals(req.user.userinfo._id)) {
      return res.status(403).json({ err: '评论无法删除' })
    }
    await videocommentInfo.deleteOne() // 删除评论
    videoInfo.commentCount--
    await videoInfo.save()

    res.status(200).json({ msg: '删除成功' })
  } catch (error) {
    // const statusCode = error.name === 'ValidationError' ? 422 : 500
    res.status(500).json({ error: error.message })
  }
}

// 喜欢视频 (谁点了喜欢， 喜欢什么视频)
exports.likevideo = async (req, res) => {
  try {
    const { videoId } = req.params
    const userId = req.user.userinfo._id

    // 查询视频是否存在
    const videoInfo = await Video.findById(videoId)
    if (!videoInfo) {
      return res.status(404).json({ err: '视频不存在' })
    }
    // 喜欢不喜欢 是 互斥 的
    const doc = await Videolike.findOne({
      user: userId,
      video: videoId
    })
    let islike = true
    if (doc && doc.like === 1) {
      // 之前点过喜欢
      await doc.deleteOne() // 不能写remove()
      islike = false
    } else if (doc && doc.like === -1) {
      // 之前点过不喜欢
      doc.like = 1
      await doc.save()
      islike = true
    } else {
      // 首次喜欢
      await new Videolike({
        user: userId,
        video: videoId,
        like: 1
      }).save()
    }

    videoInfo.likeCount = await Videolike.countDocuments({
      video: videoId,
      like: 1
    })
    videoInfo.dislikeCount = await Videolike.countDocuments({
      video: videoId,
      like: -1
    })
    await videoInfo.save()

    res.status(200).json({
      ...videoInfo.toJSON(),
      islike
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 不喜欢
exports.dislikevideo = async (req, res) => {
  try {
    const { videoId } = req.params
    const userId = req.user.userinfo._id

    // 查询视频是否存在
    const videoInfo = await Video.findById(videoId)
    if (!videoInfo) {
      return res.status(404).json({ err: '视频不存在' })
    }
    // 喜欢不喜欢 是 互斥 的
    const doc = await Videolike.findOne({
      user: userId,
      video: videoId
    })
    let isdislike = true
    if (doc && doc.like === -1) {
      // 之前点过不喜欢
      await doc.deleteOne() // 不能写remove()
      isdislike = false
    } else if (doc && doc.like === 1) {
      // 之前点过喜欢
      doc.like = -1
      await doc.save()
      isdislike = true
    } else {
      // 首次不喜欢
      await new Videolike({
        user: userId,
        video: videoId,
        like: -1
      }).save()
    }

    videoInfo.likeCount = await Videolike.countDocuments({
      video: videoId,
      like: 1
    })
    videoInfo.dislikeCount = await Videolike.countDocuments({
      video: videoId,
      like: -1
    })
    await videoInfo.save()

    res.status(200).json({
      ...videoInfo.toJSON(),
      isdislike
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 获取喜欢的视频列表
exports.likelist = async (req, res) => {
  try {
    const userId = req.user.userinfo._id
    const pageNum = getPageParam(req.query.pageNum ?? req.body?.pageNum, 1)
    const pageSize = getPageParam(req.query.pageSize ?? req.body?.pageSize, 10)
    const skipCount = (pageNum - 1) * pageSize

    const [likelist, total] = await Promise.all([
      Videolike.find({ user: userId, like: 1 })
        .sort({ _id: -1 }) // 先按 _id 倒序排好 要放在分页前面， 不然数据顺序可能不稳定
        .skip(skipCount) // 再跳过前面不属于当前页的数据
        .limit(pageSize) // 再取当前页需要的条数
        .populate('video', '_id title user'), // 自动去 User 模型里把这个 ObjectId 对应的用户信息查出来。
      Videolike.countDocuments({ user: userId, like: 1 }) // 同时再查一次 自己喜欢的 总数，返回给前端做分页显示
    ])

    res.status(200).json({
      likelist,
      pageNum,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    })
  } catch (error) {
    // const statusCode = error.name === 'ValidationError' ? 422 : 500
    res.status(500).json({ error: error.message })
  }
}
