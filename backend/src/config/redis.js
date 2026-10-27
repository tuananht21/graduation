import Redis from "ioredis";
import env from "./environment.js";

const redis = new Redis({
  host: env.REDIS_URL, // Redis đang chạy trong Docker, expose ra cổng 6379
  port: env.REDIS_PORT,
});

redis.on("connect", () => {
  console.log("✅ Redis connected successfully!");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;