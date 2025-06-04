const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

const PORT = process.env.PORT || 3000

// 挂载路由
// app.use('/api', router)

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())

// function logs(req) {
//   console.log(`${req.method}, ${req.url}, ${Date.now()}`);
//   // console.log(`${req.method}, ${req.url}, ${Date.now()}`);
//   // console.log(`${req.method}, ${req.url}, ${Date.now()}`);
// }

// app.get('/', (req, res) => {
//   logs(req)
//   res.send('/index')
// })

// app.get('/register', (req, res) => {
//   logs(req)
//   res.send('/iregisterdex')
// })

// app.get('/login', (req, res) => {
//   logs(req)
//   res.send('/login')
// })

app.use((req, res, next) => {
  console.log(`${req.method}, ${req.url}, ${Date.now()}`);
  next()
})

app.get('/', (req, res) => {
  res.send('/index')
})

app.get('/register', (req, res) => {
  res.send('/iregisterdex')
})

app.get('/login', (req, res) => {
  res.send('/login')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
