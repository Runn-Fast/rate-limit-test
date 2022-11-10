import createThrottle from "p-throttle";

import { fetch } from "./fetch.mjs";

const throttle = createThrottle({
  limit: 1,
  interval: 500,
});

const throttledFetch = throttle((count) => fetch(count));

const fetchManyWithThrottle = async (numberOfRequests) => {
  for (let i = 0; i <= numberOfRequests; i += 1) {
    await throttledFetch(i);
  }
};

const main = async () => {
  const numberOfRequests = 200;
  await fetchManyWithThrottle(numberOfRequests);
};

main();
