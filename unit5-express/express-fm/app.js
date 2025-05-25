// 引入express模块
const express = require('express');

// 创建服务器
const app = express();

// 监听请求
app.get('/', (req, res) => {
  res.send('hello express')
})

app.listen(4444, () => {
  console.log('http://127.0.0.1:4444, 服务器启动成功');
})