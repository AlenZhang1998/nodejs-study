var fs = require("fs")

// 异步追加
fs.appendFile('./a.txt', '\n444444', function(err) {
  if (err) {
    return console.error(err)
  }
  console.log('追加成功')
})

// 同步追加
fs.appendFileSync('./a.txt', '\n555555')
console.log('追加成功')

// 追加成功