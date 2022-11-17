import { fetch } from "./fetch.mjs";
import { withCounter } from "./with-counter.mjs";
import { withRateLimit } from "./with-rate-limit.mjs";

const RATE_LIMIT_REQUESTS = 100;
const RATE_LIMIT_PERIOD = 60 * 1000;

const request = withRateLimit(
  { numberOfRequests: RATE_LIMIT_REQUESTS, periodMs: RATE_LIMIT_PERIOD },
  withCounter(fetch)
);

const main = async () => {
  let i = 1;
  while (true) {
    await request(i);
    i += 1;
  }
};

main();
