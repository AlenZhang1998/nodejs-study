import Redis from "ioredis";

const redis = new Redis();

async function run() {
  try {
    await redis.set("mykey", "value");
    const value = await redis.get("mykey");
    console.log(value);
  } finally {
    redis.disconnect();
  }
}

run();
