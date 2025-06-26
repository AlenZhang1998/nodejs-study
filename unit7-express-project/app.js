const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router/index')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors()) // 跨域处理
app.use(morgan('dev')) // 日志记录(dev开发模式下)
app.use('/api/v1', router) // v1版本


const PORT = process.env.PORT || 8888 // 设置默认端口
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
