const { Video } = require('../model')

exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/video-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/video-delete')
}

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
