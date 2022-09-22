// const CronJob = require("cron").CronJob;

// const fn = () => console.log("RAN!");
// const midnight = "12 20 * * *";
// const timeZone = "America/Toronto";

// const job = new CronJob(midnight, fn, null, true, timeZone);

import schedule from "node-schedule";
import { setDailyGame } from "./cache";

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

// rule.hour = 19;
// rule.minute = 59;
// rule.second = 20;

rule.tz = "Canada/Eastern";
const job = schedule.scheduleJob(rule, async (fireDate) => {
  console.log(`Scheduled job for ${fireDate} ran.`);
  console.log(await setDailyGame());
});
console.log(job.nextInvocation());
