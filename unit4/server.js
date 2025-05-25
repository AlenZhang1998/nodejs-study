// 导入http模块
var http = require('http')

// 创建http服务
// 获取到服务器实例对象
var server = http.createServer()
server.listen(8080, function () {
    console.log('http://127.0.0.1:8080, 服务器启动成功')
})

// 监听request请求事件
server.on('request', function (req, res) {
    console.log('request')
    res.write('hello, 你好') // 响应数据
    res.end() // 断开服务器
})