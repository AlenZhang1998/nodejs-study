// var fs = require('fs')
var controller = require("./controller");

module.exports = function (req, res) {
  console.log(req.method, req.url);
  if (req.method === "GET") {
    if (req.url === "/") {
      controller.index(res);
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
      controller.user(require('querystring').parse(data))
    })
  }
}