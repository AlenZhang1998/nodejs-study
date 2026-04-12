var fs = require("fs")
// console.log(fs)

// 异步读取
fs.readFile('./a.txt', 'utf8', function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取: " + data);
})

// 同步读取
var data = fs.readFileSync('./a.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");

// 同步读取: 1111122222
// 程序执行完毕。
// 异步读取: 1111122222