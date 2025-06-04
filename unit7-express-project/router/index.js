const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.methods)
  res.send('/index')
})

router.get('/user', (req, res) => {
  console.log(111,req.method)
  JSON.parse('(')
  res.send('/user')
})

module.exports = router