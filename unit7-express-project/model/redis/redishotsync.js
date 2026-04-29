const { redis } = require('./index')

// 增加热度
exports.hotsync = async (videoId, incNum) => {
  // videoId
  // incNum 热度需要加多少
  const data = await redis.zscore('videohots', videoId) // 返回有序集中，成员的分数值
  let inc // 本次加的热度

  if (data !== null) {
    // 如果记录过热度
    inc = await redis.zincrby('videohots', incNum, videoId)
    console.log(`${videoId} 热度 + ${incNum}`)
  } else {
    inc = await redis.zadd('videohots', incNum, videoId)
    console.log(`第一次记录 ${videoId}，初始热度 ${incNum}`)
  }
  return inc
}

// 热门视频
exports.tophots = async (num) => {
  // num 获取数量
  const hotsAll = await redis.zrevrange('videohots', 0, -1, 'WITHSCORES') // 先拿到全部的热门视频 0 -1
  const gethots = hotsAll.slice(0, num * 2)
  let obj = {}
  for (let i = 0; i < gethots.length; i++) {
    if (i % 2 === 0) {
      obj[gethots[i]] = gethots[i + 1]
    }
  }
  console.log('----', obj)
  return obj
}
