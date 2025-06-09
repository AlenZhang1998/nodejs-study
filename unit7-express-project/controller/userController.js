exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}