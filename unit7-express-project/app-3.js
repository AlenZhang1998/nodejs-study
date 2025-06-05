const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()
const router = require('./router/index')

const PORT = process.env.PORT || 3000

// 路由级别中间件

// app.use(router)
app.use('/v1', router)

// 容错处理
app.use((req, res, next) => {
  // console.log(err)
  res.status(404).send('404 Not Found! ')
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('service Error')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
