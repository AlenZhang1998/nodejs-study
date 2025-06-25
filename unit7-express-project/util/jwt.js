const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const tojwt = promisify(jwt.sign) // 变成promise
// // const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
// // console.log(token)

// // 验证
// const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NTA3Nzg1OTh9._SMgroS99JXXrKx0ddl29bVgmPje4OC-W5LRCWChw9c', 'shhhhh');
// console.log(decoded.foo)


// 生成token
module.exports.createToken = async (userinfo) => {
  return await tojwt(
    {userinfo}, 
    'aec7e4a2-d5f9-412a-ac19-dcae6a88c237',
     {
      expiresIn: 60 * 60
    }
  )
}