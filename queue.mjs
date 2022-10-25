import Queue from 'p-queue'

import { fetch } from './fetch.mjs'

const queue = new Queue({
  concurrency: 1,
  intervalCap: 120,
  interval: 1000 * 60,
})

const queueFetch = (count) => queue.add(() => fetch(count))

const fetchManyWithQueue = async (numberOfRequests) => {
  await Promise.all(Array.from({ length: numberOfRequests }).map((_, i) => {
    return queueFetch(i + 1)
  }))
}

const main = async () => {
  const numberOfRequests = 200
  await fetchManyWithQueue(numberOfRequests)
}

main()
