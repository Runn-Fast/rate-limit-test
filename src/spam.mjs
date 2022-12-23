import { fetch } from "./fetch.mjs";
import { withCounter } from "./with-counter.mjs";
import { withDelay } from "./with-delay.mjs";

const fetchWithCount = withDelay(withCounter(fetch));

const RATE_LIMIT_REQUESTS = 120;

const TOTAL_REQUEST_COUNT = RATE_LIMIT_REQUESTS * 3;

const main = async () => {
  await Promise.all(
    Array.from({ length: TOTAL_REQUEST_COUNT }).map(async (_, i) => {
      await fetchWithCount(i + 1);
    })
  );
};

main();
