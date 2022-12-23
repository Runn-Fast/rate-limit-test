# rate limit test

## installation

```bash
npm install
```

## Poll

```bash
npm run poll
```

The script will start making requests to https://app.runn-testing.net, trying
to keep under the rate limit of 120 requests per minute.

![](./screenshot.png)

## Spam

```bash
npm run spam
```

The script will make 360 requests concurrently. It is expected that two-thirds
of these requests should be blocked.
