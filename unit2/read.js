var fs = require("fs")
// console.log(fs)
fs.readFile('./a.txt', 'utf8', function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取: " + data);
})