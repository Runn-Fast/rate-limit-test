import undici from "undici";

const fetch = async (i) => {
  const response = await undici.fetch(
    `https://app.runn-testing.net/api/v0/teams?i=${i}`,
    {
      method: "GET",
      headers: {
        // api key for user@example.com on runn-testing.net
        Authorization: "Bearer TEST_5xAF8y_ujFiHeZwUhJvM",
      },
    }
  );
  await response.text();

  const cfRay = response.headers.get("cf-ray") ?? "";
  return [response.status, response.statusText, cfRay];
};

export { fetch };
