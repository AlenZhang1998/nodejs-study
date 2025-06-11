const { User } = require('../model')

exports.register = async (req, res) => {
  console.log(111, req.body)
  // res.send('/user-register')
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  res.status(201).json(dbBack)
}

exports.list = async (req, res) => {
  console.log(req.methods)
  res.send('/user-list')
}

exports.delete = async (req, res) => {
  console.log(req.methods)
  // res.send('/user-delete')
}