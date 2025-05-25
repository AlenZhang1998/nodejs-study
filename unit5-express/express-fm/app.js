// 引入express模块
const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// 创建服务器
const app = express();
// app.use(express.urlencoded())
app.use(express.json())

// 监听请求
// app.get('/', (req, res) => {
//   fs.readFile('./db.json', (err, data) => {
//     if (err) {
//       res.status(500).json({err})
//       // res.send('404 not found');
//     } else {
//       res.send(JSON.parse(data).users);
//     }
//   })
// })
app.get('/', async (req, res) => {
  try {
    const back = await readFile('./db.json', 'utf-8');
    res.send(JSON.parse(back).users);
  } catch (error) {
    res.status(500).json({err})
  }
})

app.post('/', async (req, res) => {
  console.log(req.headers);
  console.log(req.query);
  console.log(req.body);
  res.send('post请求');
})

app.listen(4444, () => {
  console.log('http://127.0.0.1:4444, 服务器启动成功');
})