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

const withCounter = (fn) => {
  return async (...args) => {
    log("→", args);
    const result = await fn(...args);
    log("←", args, result);
  };
};

export { withCounter };
