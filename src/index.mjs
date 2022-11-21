import { fetch } from "./fetch.mjs";
import { withCounter } from "./with-counter.mjs";
// import { withRateLimit } from "./with-rate-limit.mjs";
import Queue from "p-queue";

const RATE_LIMIT_REQUESTS = 100;
const RATE_LIMIT_PERIOD = 60 * 1000;

const queue = new Queue({
  concurrency: 5,
  intervalCap: RATE_LIMIT_REQUESTS,
  interval: RATE_LIMIT_PERIOD,
});

const fetchWithCount = withCounter(fetch);
const request = (count) => queue.add(() => fetchWithCount(count));

// const request = withRateLimit(
//   { numberOfRequests: RATE_LIMIT_REQUESTS, periodMs: RATE_LIMIT_PERIOD },
//   fetchWithCount,
// );

const main = async () => {
  let i = 1;
  while (true) {
    // make 5 requests in parallel
    await Promise.all([
      request(i),
      request(i + 1),
      request(i + 2),
      request(i + 3),
      request(i + 4),
    ]),
      (i += 5);
  }
};

main();
