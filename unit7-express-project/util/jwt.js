const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const tojwt = promisify(jwt.sign) // 变成promise
const verify = promisify(jwt.verify)
const { uuid } = require('../config/config.default')
// // const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
// // console.log(token)

// // 验证
// const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NTA3Nzg1OTh9._SMgroS99JXXrKx0ddl29bVgmPje4OC-W5LRCWChw9c', 'shhhhh');
// console.log(decoded.foo)


// 生成token
module.exports.createToken = async (userinfo) => {
  return await tojwt(
    { userinfo }, 
    uuid,
     {
      expiresIn: 60 * 60 * 24
    }
  )
}

// 验证token
module.exports.verifyToken = async (req, res, next) => {
  // console.log(26, req.headers)
  let token = req.headers.authorization
  token = token ? token.split(' ')[1] : null
  if (token) {
    try {
      const userinfo = await verify(token, uuid)
      req.user = userinfo
      next()
    } catch (error) {
      res.status(402).json({error: '无效的token'})
    }
  } else {
    res.status(402).json({error: '请传入token'})
  }
}