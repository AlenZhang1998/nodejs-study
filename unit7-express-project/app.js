const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

const PORT = process.env.PORT || 3000

// app.use((req, res, next) => {
//   console.log(`${req.method}, ${req.url}, ${Date.now()}`);
//   next()
// })

app.use('/user', (req, res, next) => {
  console.log(`${req.method}, ${req.url}, ${Date.now()}`);
  next()
}, function (req, res, next) {
  console.log(666)
  next()
  res.send('/user')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
