var fs = require('fs')

module.exports = {
  index(res) {
    fs.readFile("./index.html", "utf-8", function (err, data) {
      if (err) {
        res.end("404 Not Found");
      } else {
        // res.write(data)
        res.end(data);
      }
    });
  },

  user(postData, res){
    // 业务逻辑代码
    console.log(postData)
  }
}