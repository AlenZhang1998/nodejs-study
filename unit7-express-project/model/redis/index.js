const Redis = require('ioredis')

const redis = new Redis()

redis.on('error', (err) => {
  console.log(22, err)
  if (err) {
    console.log('Redis连接错误', err)
    redis.quit()
  }
})

redis.on('ready', () => {
  console.log('Redis连接成')
})

module.exports.redis = redis
