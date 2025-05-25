var fs = require("fs")
fs.writeFile('./a.txt', '11111', function(err){
  if (err) {
    return console.error(err)
  }
  console.log("数据写入成功！") 
})