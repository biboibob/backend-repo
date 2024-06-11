import { createClient } from "redis";
import "dotenv/config";

const onGetValueRedis = async (key: any) => {
  const client = await createClient({
    password: process.env.REDIS_PASSWORD as string,
    socket: {
      host: process.env.REDIS_HOST as string,
      port: process.env.REDIS_PORT as unknown as number,
    },
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  const value = await client.get(key);
  await client.disconnect();

  if (value) {
    return value;
  } else {
    return false;
  }
};

const onSetValueRedis = async (key: any, value: any) => {
  const client = await createClient({
    password: process.env.REDIS_PASSWORD as string,
    socket: {
      host: process.env.REDIS_HOST as string,
      port: process.env.REDIS_PORT as unknown as number,
    },
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  await client.set(key, value);
  await client.disconnect();
};

export { onGetValueRedis, onSetValueRedis };
