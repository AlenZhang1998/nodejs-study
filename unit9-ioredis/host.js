import Redis from 'ioredis'

const redis = new Redis()

async function run() {
  try {
    const initialScore = 1
    const candidates = 'ABCDEFGHIJ' // 候选字母
    const randomIndex = Math.floor(Math.random() * candidates.length) // 随机下标
    const member = candidates[randomIndex] // 随机选中的字母

    const currentScore = await redis.zscore('hots', member) // 返回有序集中，成员的分数值

    console.log('随机选中的成员:', member)
    console.log('当前分数:', currentScore)

    if (currentScore !== null) {
      await redis.zincrby('hots', 1, member)
      console.log(`${member} 分数 +1`)
    } else {
      await redis.zadd('hots', initialScore, member)
      console.log(`第一次写入 ${member}，初始分数 ${initialScore}`)
    }

    const paixu = await redis.zrevrange('hots', 0, -1, 'WITHSCORES')
    // console.log('----', paixu)
    let obj = {}
    for (let i = 0; i < paixu.length; i++) {
      if (i % 2 === 0) {
        obj[paixu[i]] = paixu[i + 1]
      }
    }
    console.log('----', obj)
  } finally {
    redis.disconnect()
  }
}

run()
