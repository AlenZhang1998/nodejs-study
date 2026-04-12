var fs = require("fs")

// 异步写入
fs.writeFile('./a.txt', '123', function(err){
  if (err) {
    return console.error(err)
  }
  console.log("数据写入成功！") 
})

// 同步写入
try {
  fs.writeFileSync('./a.txt', 'Hello, World!');
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err);
}

// File written successfully
// 数据写入成功！
// 123lo, World!