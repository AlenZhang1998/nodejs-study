const { User } = require('../model')

exports.register = async (req, res) => {
  console.log(111, req.body)
  return
  // res.send('/user-register')
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  user = dbBack.toJSON()
  delete user.password
  res.status(201).json({user})
}

exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}