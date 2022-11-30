import { setTimeout } from "timers/promises";

const withDelay = (fn) => {
  return async (...args) => {
    const result = await fn(...args);
    const status = result[0];

    if (status === 429) {
      await setTimeout(60 * 1000);
    }

    return result;
  };
};

export { withDelay };
