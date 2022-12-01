import { fetch } from "./fetch.mjs";
import { withCounter } from "./with-counter.mjs";

const fetchWithCount = withCounter(fetch);

const RATE_LIMIT_REQUESTS = 120;

const main = async () => {
  await Promise.all(
    Array.from({ length: RATE_LIMIT_REQUESTS }).map(async (_, i) => {
      await fetchWithCount(i + 1);
    })
  );
};

main();
