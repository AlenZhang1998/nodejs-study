// 引入express模块
const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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
    res.status(500).json({error})
  }
})

app.post('/', async (req, res) => {
  let body = req.body
  if (!body) {
    res.status(403).json({
      code: 403,
      msg: '请求参数错误'
    })
  }
  let back = await readFile('./db.json', 'utf-8');
  let jsonObj = JSON.parse(back)
  // 给输入的用户信息添加个id
  body.id = jsonObj.users[jsonObj.users.length - 1].id + 1
  jsonObj.users.push(body)
  // console.log(jsonObj);

  // 写入文件
  try {
    const w = await writeFile('./db.json', JSON.stringify(jsonObj));
    if(!w) {
      res.status(200).send({
        msg: '添加成功'
      })
    }
  } catch (error) {
    res.status(500).json({error})
  }
})

app.listen(4444, () => {
  console.log('http://127.0.0.1:4444, 服务器启动成功');
})