// 导入http模块
var http = require("http");
var fs = require("fs");
var url = require("url");

// 创建http服务
// 获取到服务器实例对象
var server = http.createServer();
server.listen(8080, function () {
  console.log("http://127.0.0.1:8080, 服务器启动成功");
});

server.on("request", function (req, res) {
  console.log(req.method, req.url);
  if (req.method === "GET") {
    // console.log(url.parse(req.url, true))
    if (req.url === "/") {
      fs.readFile("./index.html", "utf-8", function (err, data) {
        if (err) {
          res.end("404 Not Found");
        } else {
          // res.write(data)
          res.end(data);
        }
      });
    } else {
      res.write("hello, 111");
      res.end(); // 断开服务器
    }
  } else if (req.method === "POST") {
    console.log("post");
    // 请求体中

    // res.write("post");
    // res.end(); // 断开服务器

    var  data = ''
    req.on('data', function (chunk) {
      data += chunk
    })
    req.on('end', function () {
      // console.log(data)
      // res.end(data)
      console.log(require('querystring').parse(data))
    })
  }
});
