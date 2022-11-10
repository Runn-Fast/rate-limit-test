import undici from "undici";

let lastRequestAt = undefined;

const fetch = async (count) => {
  const now = new Date();
  const timeSinceLastRequest = lastRequestAt
    ? `+${now.getTime() - lastRequestAt.getTime()}ms`
    : "";

  console.log(`${count.toString().padStart(3)}. ${timeSinceLastRequest}`);

  const response = await undici.fetch(
    "https://app.runn-testing.net/api/v0/teams",
    {
      method: "GET",
      headers: {
        // api key for user@example.com on runn-testing.net
        Authorization: "Bearer LIVE_osagZcJfU9Vza53ULMgx",
      },
    }
  );
  await response.text();

  const responseFinishedAt = new Date();
  const duration = `+${responseFinishedAt.getTime() - now.getTime()}ms`;

  lastRequestAt = responseFinishedAt;

  console.log(`     ${duration} ${response.status} ${response.statusText}`);
};

export { fetch };
