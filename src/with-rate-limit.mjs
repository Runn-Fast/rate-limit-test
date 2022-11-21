import * as c from "colorette";

const createDeferred = () => {
  let resolveDeferred;
  const promise = new Promise((resolve) => (resolveDeferred = resolve));
  return { promise, resolve: resolveDeferred };
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
    history.add(args);

    const result = await fn(...args);

    setTimeout(() => {
      history.delete(args);
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
