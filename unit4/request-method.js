// 导入http模块
var http = require("http");
var fs = require("fs");
var url = require("url");
var router = require("./router");

// 创建http服务
// 获取到服务器实例对象
var server = http.createServer();
server.listen(8080, function () {
  console.log("http://127.0.0.1:8080, 服务器启动成功");
});

server.on("request", function (req, res) {
  router(req, res);
});
