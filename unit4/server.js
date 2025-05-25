// 导入http模块
var http = require('http')
var fs = require('fs')

// 创建http服务
// 获取到服务器实例对象
var server = http.createServer()
server.listen(8080, function () {
    console.log('http://127.0.0.1:8080, 服务器启动成功')
})

// 监听request请求事件
// server.on('request', function (req, res) {
//     console.log('request')
//     // res.setHeader('Content-type', 'text/plain;charset=utf-8') // 响应头
//     res.setHeader('Content-Type', 'text/html;charset=utf-8') // 响应头
//     res.write(`hello, <h1>你好</h1>`) // 响应数据
//     res.end() // 断开服务器
// })

server.on('request', function (req, res) {
    if (req.url === '/') {
        fs.readFile('./index.html','utf-8', function (err, data) {
            if (err) {
                res.end('404 Not Found')
            } else {
                // res.write(data)
                res.end(data)
            }
        })
    } else {
        res.write('hello')
        res.end() // 断开服务器
    }
})