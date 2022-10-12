import Redis from "ioredis";
import * as dotenv from "dotenv";
import { getRandomFullPuzzle } from "./puzzleGenerator";
import { Puzzle } from "./gameTypes";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

enum RedisKeys {
  GAME_KEY = "dailyGame",
  YESTERDAY_KEY = "yesterdayGame",
}

const getRedisURL = () => {
  if (!process.env.REDIS_URL) {
    console.log("exiting, could not get REDIS URL");
    process.exit(1);
  } else return process.env.REDIS_URL;
};

export const setDailyGame = async () => {
  const redis = new Redis(getRedisURL());
  const newDailyGame = getRandomFullPuzzle();
  try {
    const currentGame = await getKey(RedisKeys.GAME_KEY);
    if (currentGame) {
      await redis.set(RedisKeys.YESTERDAY_KEY, JSON.stringify(currentGame));
    }
    await redis.set(RedisKeys.GAME_KEY, JSON.stringify(newDailyGame));
    return newDailyGame;
  } catch (error) {
    console.error("Set daily game failed.", error);
  } finally {
    redis.quit();
  }
};

export const getKey = async (key: RedisKeys) => {
  const redis = new Redis(getRedisURL());
  try {
    const value = await redis.get(key);
    if (value != null) {
      return JSON.parse(value) as Puzzle;
    } else console.error(`get ${key} returned as null`);
  } catch (error) {
    console.error(`Something went wrong with fetching ${key}`, error);
  } finally {
    redis.quit();
  }
};
