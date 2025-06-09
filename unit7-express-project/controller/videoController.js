exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/video-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}