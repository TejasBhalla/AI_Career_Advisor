import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

console.log("Redis URL:", process.env.UPSTASH_REDIS_URL, {
  tls: {},                  // enable TLS
  maxRetriesPerRequest: 5,  // optional, reduce retry attempts
  enableOfflineQueue: false // prevents queuing requests when connection fails
});

const redis = new Redis(process.env.UPSTASH_REDIS_URL); // Upstash URL includes auth token
await redis.set('foo', 'bar');
export default redis; 