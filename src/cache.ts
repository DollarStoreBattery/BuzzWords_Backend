import Redis from "ioredis";
import * as dotenv from "dotenv";
import { getRandomFullPuzzle } from "./puzzleGenerator";
import { Puzzle } from "./gameTypes";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });
const GAME_KEY = "dailyGame";

const getRedisURL = () => {
  if (!process.env.REDIS_URL) {
    console.log("exiting, could not get REDIS URL");
    process.exit(1);
  } else return process.env.REDIS_URL;
};

export const setDailyGame = async () => {
  const redis = new Redis(getRedisURL());

  const dailyGame = getRandomFullPuzzle();
  const expiryTime = 60 * 60 * 24;
  try {
    await redis.set(GAME_KEY, JSON.stringify(dailyGame), "EX", expiryTime);
    return dailyGame;
  } catch (error) {
    console.error("Set daily game failed.", error);
  } finally {
    redis.quit();
  }
};

export const getDailyGame = async () => {
  const redis = new Redis(getRedisURL());

  try {
    const value = await redis.get(GAME_KEY);
    if (value != null) {
      return JSON.parse(value) as Puzzle;
    } else console.error("Daily game returned as null");
  } catch (error) {
    console.error("Something went wrong with fetching the game", error);
  } finally {
    redis.quit();
  }
};
