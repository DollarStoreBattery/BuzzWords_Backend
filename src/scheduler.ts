import * as dotenv from "dotenv";
dotenv.config();

import schedule from "node-schedule";
import { setDailyGame } from "./cache";
import featureFlags from "./featureFlags.json";

import requestRevalidation from "./revalidate";

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = "Canada/Eastern";

const job = schedule.scheduleJob(rule, async (fireDate) => {
  console.log(`Scheduled job for ${fireDate} ran.`);
  console.log(await setDailyGame());
  if (featureFlags.isFrontendHosted) {
    console.log(await requestRevalidation());
  }
});
console.log(job.nextInvocation());
