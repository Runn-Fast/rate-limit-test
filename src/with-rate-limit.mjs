import * as c from "colorette";

const createDeferred = () => {
  let resolveDeferred;
  const promise = new Promise((resolve) => (resolveDeferred = resolve));
  return { promise, resolve: resolveDeferred };
};

const logHistory = (history) => {
  const oldestEntry = [...history].sort()[0];
  const timeSinceOldestEntryMs = oldestEntry ? Date.now() - oldestEntry : 0;
  const historyPeriod = Math.round(timeSinceOldestEntryMs / 1000);

  const size = history.size;

  const avgMs = size ? Math.round(timeSinceOldestEntryMs / size) : 0;

  console.log(
    [
      "".padStart(10),
      "".padStart(8),
      "".padStart(7),
      c.green(
        `${size} requests in ${historyPeriod} seconds. Average request time is ${avgMs}ms`
      ),
    ].join(c.gray(", "))
  );
};

const withRateLimit = ({ numberOfRequests, periodMs }, fn) => {
  const history = new Set();
  const queue = [];

  const checkQueue = async () => {
    if (history.size < numberOfRequests && queue.length) {
      const { deferred, args } = queue.shift();
      const result = await execute(...args);
      deferred.resolve(result);
    }
  };

  const execute = async (...args) => {
    logHistory(history);

    const now = Date.now();
    history.add(now);

    const result = await fn(...args);

    setTimeout(() => {
      history.delete(now);
      checkQueue();
    }, periodMs);

    return result;
  };

  const executeOrWait = async (...args) => {
    if (history.size >= numberOfRequests) {
      const deferred = createDeferred();
      queue.push({ deferred, args });
      return deferred.promise;
    }

    const result = await execute(...args);
    return result;
  };

  return executeOrWait;
};

export { withRateLimit };
