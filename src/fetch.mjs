import undici from "undici";

const fetch = async (i) => {
  const response = await undici.fetch(
    `https://app.runn-testing.net/api/v0/teams?i=${i}`,
    {
      method: "GET",
      headers: {
        // api key for user@example.com on runn-testing.net
        Authorization: "Bearer LIVE_osagZcJfU9Vza53ULMgx",
      },
    }
  );
  await response.text();

  return [response.status, response.statusText];
};

export { fetch };
