// 引入express模块
const express = require('express');
// const fs = require('fs');
// const { promisify } = require('util');
// const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);
const db = require('./db.js')

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
    const back = await db.getDb();
    res.send(back);
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
  let back = await db.getDb();
  let jsonObj = back
  // 给输入的用户信息添加个id
  body.id = jsonObj.users[jsonObj.users.length - 1].id + 1
  jsonObj.users.push(body)
  // console.log(jsonObj);

  // 写入文件
  try {
    const w = await db.saveDb(jsonObj);
    if(!w) {
      res.status(200).send({
        msg: '添加成功'
      })
    }
  } catch (error) {
    res.status(500).json({error})
  }
})

app.put('/:id', async (req, res) => {
  console.log(req.params,req.body);
  try {
    let userInfo = await db.getDb();
    let userId = Number(req.params.id)
    let user = userInfo.users.find(item => item.id === userId)
    if (!user) {
      res.status(403).json({
        code: 403,
        msg: '用户不存在'
      })
    }
    // res.send(user)
    // 修改user
    const body = req.body
    user.username = body.username ? body.username : user.username
    user.age = body.age? body.age : user.age
    userInfo.users[userId - 1] = user

    let w = await db.saveDb(userInfo)
    if (!w) {
      res.status(201).send({
        msg: '修改成功'
      })
    }
  } catch (error) {
    res.status(500).json({error})
  }
})

app.listen(4444, () => {
  console.log('http://127.0.0.1:4444, 服务器启动成功！');
})