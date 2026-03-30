import IORedis from "ioredis";

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});
redis.on("connect", () => {
  console.log("Redis connected");
});

export default redis;
