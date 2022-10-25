import undici from 'undici'

let lastRequestAt = undefined

const fetch = async (count) => {
  const now = new Date()
  const timeSinceLastRequest = lastRequestAt ?
    `+${now.getTime() - lastRequestAt.getTime()}ms`
    : ''
  lastRequestAt = now

  console.log(count, timeSinceLastRequest)

  const response = await undici.fetch('https://app.runn-testing.net/api/v0/teams', {
    method: 'GET',
    headers: {
      // api key for user@example.com on runn-testing.net
      Authorization: 'Bearer LIVE_osagZcJfU9Vza53ULMgx'
    }
  })
  await response.text()
  console.log([response.status, response.statusText])
}

export { fetch }
