import { fetch } from "./fetch.mjs";
import { withCounter } from "./with-counter.mjs";
import { withRateLimit } from "./with-rate-limit.mjs";
import { withDelay } from "./with-delay.mjs";

const RATE_LIMIT_REQUESTS = 120;
const RATE_LIMIT_PERIOD = 60 * 1000;

const fetchWithCount = withDelay(withCounter(fetch));

const request = withRateLimit(
  { numberOfRequests: RATE_LIMIT_REQUESTS, periodMs: RATE_LIMIT_PERIOD },
  fetchWithCount
);

const main = async () => {
  let i = 1;
  while (true) {
    await Promise.all([
      request(i),
      request(i + 1),
      request(i + 2),
      request(i + 3),
      request(i + 4),
      request(i + 5),
      request(i + 6),
      request(i + 7),
      request(i + 8),
      request(i + 9),
    ]);
    i += 10;
  }
};

main();
