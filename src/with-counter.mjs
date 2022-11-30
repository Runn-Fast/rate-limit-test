import * as c from "colorette";

let lastLogAt = undefined;

const log = (direction, args, value) => {
  const now = new Date();

  const duration = lastLogAt ? now.getTime() - lastLogAt.getTime() : 0;
  const durationMs = `+${duration}ms`;

  lastLogAt = now;

  console.log(
    [
      c.white(now.toISOString().slice(11, 21)),
      duration > 0
        ? c.blue(durationMs.padStart(8))
        : c.gray(durationMs.padStart(8)),
      c.yellow(direction + " " + JSON.stringify(args).padStart(5)),
      JSON.stringify(value),
    ].join(c.gray(", "))
  );
};

const logHistory = (history) => {
  const oldestEntry = history[0];
  const timeSinceOldestEntryMs = oldestEntry ? Date.now() - oldestEntry : 0;
  const historyPeriod = Math.round(timeSinceOldestEntryMs / 1000);

  const length = history.length;
  const avgMs = length ? Math.round(timeSinceOldestEntryMs / length) : 0;

  console.log(
    [
      "".padStart(10),
      "".padStart(8),
      "".padStart(7),
      c.green(
        `${length} requests in ${historyPeriod} seconds. Average request time is ${avgMs}ms`
      ),
    ].join(c.gray(", "))
  );
};

const withCounter = (fn) => {
  let history = [];

  return async (...args) => {
    const now = Date.now();
    history = history.filter((value) => value >= now - 60 * 1000);
    history.push(now);
    logHistory(history);
    log("→", args);
    const result = await fn(...args);
    log("←", args, result);
    return result;
  };
};

export { withCounter };
