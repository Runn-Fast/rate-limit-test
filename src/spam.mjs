import { fetch } from "./fetch.mjs";
import { withCounter } from "./with-counter.mjs";
import { withDelay } from "./with-delay.mjs"

const fetchWithCount = withDelay(withCounter(fetch));

const RATE_LIMIT_REQUESTS = 360;

const main = async () => {
  await Promise.all(
    Array.from({ length: RATE_LIMIT_REQUESTS }).map(async (_, i) => {
      await fetchWithCount(i + 1);
    })
  );
};

main();
