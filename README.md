# rate limit test

## installation

```bash
pnpm install
```

## usage

### throttle

Make 200 requests, waiting at least 500ms between each request.

```bash
node ./throttle.mjs
```

### queue

Make 200 requests, making no more than 120 requests per minute

```bash
node ./queue.mjs
```
