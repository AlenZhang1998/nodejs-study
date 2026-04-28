import Redis from 'ioredis'

const redis = new Redis()

async function run() {
  try {
    // await redis.set('mykey', 'value')
    // const value = await redis.get("mykey");
    // console.log(value);
    // const res = await redis.keys("*");
    const res = await redis.smembers('list1')
    console.log(res)
  } finally {
    redis.disconnect()
  }
}

run()
