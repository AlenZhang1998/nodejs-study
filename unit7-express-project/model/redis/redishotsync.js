const { redis } = require('./index')

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
