const jwt = require('jsonwebtoken')
// const token = jwt.sign({ foo: 'bar' }, 'shhhhh')
// console.log(token)

// 验证
const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NTA3Nzg1OTh9._SMgroS99JXXrKx0ddl29bVgmPje4OC-W5LRCWChw9c', 'shhhhh');
console.log(decoded.foo) 