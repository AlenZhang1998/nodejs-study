// 追加内容
var fs = require("fs")
fs.readFile('./a.txt', 'utf-8', function(err, data){
  if (!err) {
    let newData = data + 22222
    fs.writeFile('./a.txt', newData, function(err) {
      if (!err) {
        console.log('追加成功')
      }
    })
  }
})