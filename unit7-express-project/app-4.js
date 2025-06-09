const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()
const router = require('./router/index')

const PORT = process.env.PORT || 3000

// app.all不匹配路由方法(不区分get\post等)
app.all('/xx', (req, res, next) => {
  res.send('xx')
})

// ?前面为可选字符 /uer也可以
app.get('/us?er', (req, res) => {
  res.send(`${req.method}---${req.url}`)
})

app.get('/user/:id/video/:vid', (req, res) => {
  console.log(req.params)
  res.send(`${req.method}---${req.url}`)
})

// 路由链式调用
// app.get('/user', (req, res) => {

// }).post('/video', (req, res) => {
  
// })

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
