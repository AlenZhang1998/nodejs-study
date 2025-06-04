const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()
const router = require('./router/index')

const PORT = process.env.PORT || 3000

// 路由级别中间件

// app.use(router)
app.use('/v1', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
