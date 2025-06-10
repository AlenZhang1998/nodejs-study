exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}

exports.register = async (req, res) => {
  console.log(req.body)
  res.send('/user-register')
}