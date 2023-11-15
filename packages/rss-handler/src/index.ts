import * as Sentry from '@sentry/serverless'
import axios from 'axios'
import crypto from 'crypto'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as jwt from 'jsonwebtoken'
import Parser, { Item } from 'rss-parser'
import { promisify } from 'util'
import { CONTENT_FETCH_URL, createCloudTask } from './task'

interface RssFeedRequest {
  subscriptionIds: string[]
  feedUrl: string
  lastFetchedTimestamps: number[] // unix timestamp in milliseconds
  scheduledTimestamps: number[] // unix timestamp in milliseconds
  lastFetchedChecksums: string[]
  userIds: string[]
}

// link can be a string or an object
type RssFeedItemLink = string | { $: { rel?: string; href: string } }

function isRssFeedRequest(body: any): body is RssFeedRequest {
  return (
    'subscriptionIds' in body &&
    'feedUrl' in body &&
    'lastFetchedTimestamps' in body &&
    'scheduledTimestamps' in body &&
    'userIds' in body &&
    'lastFetchedChecksums' in body
  )
}

export const fetchAndChecksum = async (url: string) => {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 60_000,
      maxRedirects: 10,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        Accept:
          'application/rss+xml, application/rdf+xml;q=0.8, application/atom+xml;q=0.6, application/xml;q=0.4, text/xml, text/html;q=0.4',
      },
    })

    const hash = crypto.createHash('sha256')
    hash.update(response.data as Buffer)

    const dataStr = (response.data as Buffer).toString()

    return { url, content: dataStr, checksum: hash.digest('hex') }
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch or hash content from ${url}.`)
  }
}

const sendUpdateSubscriptionMutation = async (
  userId: string,
  subscriptionId: string,
  lastFetchedAt: Date,
  lastFetchedChecksum: string,
  scheduledAt: Date
) => {
  const JWT_SECRET = process.env.JWT_SECRET
  const REST_BACKEND_ENDPOINT = process.env.REST_BACKEND_ENDPOINT

  if (!JWT_SECRET || !REST_BACKEND_ENDPOINT) {
    throw 'Environment not configured correctly'
  }

  const data = JSON.stringify({
    query: `mutation UpdateSubscription($input: UpdateSubscriptionInput!){
      updateSubscription(input:$input){
        ... on UpdateSubscriptionSuccess{
          subscription{
            id
            lastFetchedAt
          }
        }
        ... on UpdateSubscriptionError{
            errorCodes
        }
      }
    }`,
    variables: {
      input: {
        id: subscriptionId,
        lastFetchedAt,
        lastFetchedChecksum,
        scheduledAt,
      },
    },
  })

  const auth = (await signToken({ uid: userId }, JWT_SECRET)) as string
  try {
    const response = await axios.post(
      `${REST_BACKEND_ENDPOINT}/graphql`,
      data,
      {
        headers: {
          Cookie: `auth=${auth};`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30s
      }
    )

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return !!response.data.data.updateSubscription.subscription
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('update subscription mutation error', error.message)
    } else {
      console.error(error)
    }
    return false
  }
}

const createSavingItemTask = async (
  userId: string,
  feedUrl: string,
  item: Item
) => {
  const input = {
    userId,
    source: 'rss-feeder',
    url: item.link,
    saveRequestId: '',
    labels: [{ name: 'RSS' }],
    rssFeedUrl: feedUrl,
    savedAt: item.isoDate,
    publishedAt: item.isoDate,
  }

  try {
    console.log('Creating task', input.url)
    // save page
    const task = await createCloudTask(CONTENT_FETCH_URL, input)
    console.log('Created task', task)

    return !!task
  } catch (error) {
    console.error('Error while creating task', error)
    return false
  }
}

dotenv.config()
Sentry.GCPFunction.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0,
})

const signToken = promisify(jwt.sign)
const parser = new Parser({
  customFields: {
    item: [
      ['link', 'links', { keepArray: true }],
      'published',
      'updated',
      'created',
    ],
    feed: [
      'lastBuildDate',
      'syn:updatePeriod',
      'syn:updateFrequency',
      'sy:updatePeriod',
      'sy:updateFrequency',
    ],
  },
})

const getUpdateFrequency = (feed: any) => {
  const updateFrequency = (feed['syn:updateFrequency'] ||
    feed['sy:updateFrequency']) as string | undefined

  if (!updateFrequency) {
    return 1
  }

  const frequency = parseInt(updateFrequency, 10)
  if (isNaN(frequency)) {
    return 1
  }

  return frequency
}

const getUpdatePeriodInHours = (feed: any) => {
  const updatePeriod = (feed['syn:updatePeriod'] || feed['sy:updatePeriod']) as
    | string
    | undefined

  switch (updatePeriod) {
    case 'hourly':
      return 1
    case 'daily':
      return 24
    case 'weekly':
      return 7 * 24
    case 'monthly':
      return 30 * 24
    case 'yearly':
      return 365 * 24
    default:
      // default to hourly
      return 1
  }
}

// get link following the order of preference: via, alternate, self
const getLink = (links: RssFeedItemLink[]) => {
  // sort links by preference
  const sortedLinks: string[] = []

  links.forEach((link) => {
    // if link is a string, it is the href
    if (typeof link === 'string') {
      return sortedLinks.push(link)
    }

    if (link.$.rel === 'via') {
      sortedLinks[0] = link.$.href
    }
    if (link.$.rel === 'alternate') {
      sortedLinks[1] = link.$.href
    }
    if (link.$.rel === 'self' || !link.$.rel) {
      sortedLinks[2] = link.$.href
    }
  })

  // return the first link that is not undefined
  return sortedLinks.find((link) => !!link)
}

const processSubscription = async (
  subscriptionId: string,
  userId: string,
  feedUrl: string,
  fetchResult: { content: string; checksum: string },
  lastFetchedAt: number,
  scheduledAt: number,
  lastFetchedChecksum: string
) => {
  let lastItemFetchedAt: Date | null = null
  let lastValidItem: Item | null = null

  if (fetchResult.checksum === lastFetchedChecksum) {
    console.log('feed has not been updated', feedUrl, lastFetchedChecksum)
    return
  }
  const updatedLastFetchedChecksum = fetchResult.checksum

  // fetch feed
  let itemCount = 0
  const feed = await parser.parseString(fetchResult.content)
  console.log('Fetched feed', feed.title, new Date())

  const feedLastBuildDate = feed.lastBuildDate as string | undefined
  console.log('Feed last build date', feedLastBuildDate)
  if (
    feedLastBuildDate &&
    new Date(feedLastBuildDate) < new Date(lastFetchedAt)
  ) {
    console.log('Skipping old feed', feedLastBuildDate)
    return
  }

  // save each item in the feed
  for (const item of feed.items) {
    // use published or updated if isoDate is not available for atom feeds
    item.isoDate =
      item.isoDate ||
      (item.published as string) ||
      (item.updated as string) ||
      (item.created as string)
    console.log('Processing feed item', item.links, item.isoDate)

    if (!item.links || item.links.length === 0) {
      console.log('Invalid feed item', item)
      continue
    }

    item.link = getLink(item.links as RssFeedItemLink[])
    if (!item.link) {
      console.log('Invalid feed item links', item.links)
      continue
    }

    console.log('Fetching feed item', item.link)

    const publishedAt = item.isoDate ? new Date(item.isoDate) : new Date()
    // remember the last valid item
    if (
      !lastValidItem ||
      (lastValidItem.isoDate && publishedAt > new Date(lastValidItem.isoDate))
    ) {
      lastValidItem = item
    }

    // Max limit per-feed update
    if (itemCount > 99) {
      continue
    }

    // skip old items and items that were published before 24h
    if (
      publishedAt < new Date(lastFetchedAt) ||
      publishedAt < new Date(Date.now() - 24 * 60 * 60 * 1000)
    ) {
      console.log('Skipping old feed item', item.link)
      continue
    }

    const created = await createSavingItemTask(userId, feedUrl, item)
    if (!created) {
      console.error('Failed to create task for feed item', item.link)
      continue
    }

    // remember the last item fetched at
    if (!lastItemFetchedAt || publishedAt > lastItemFetchedAt) {
      lastItemFetchedAt = publishedAt
    }

    itemCount = itemCount + 1
  }

  // no items saved
  if (!lastItemFetchedAt) {
    // the feed has been fetched before, no new valid items found
    if (lastFetchedAt || !lastValidItem) {
      console.log('No new valid items found')
      return
    }

    // the feed has never been fetched, save at least the last valid item
    const created = await createSavingItemTask(userId, feedUrl, lastValidItem)
    if (!created) {
      console.error('Failed to create task for feed item', lastValidItem.link)
      throw new Error('Failed to create task for feed item')
    }

    lastItemFetchedAt = lastValidItem.isoDate
      ? new Date(lastValidItem.isoDate)
      : new Date()
  }

  const updateFrequency = getUpdateFrequency(feed)
  const updatePeriodInMs = getUpdatePeriodInHours(feed) * 60 * 60 * 1000
  const nextScheduledAt = scheduledAt + updatePeriodInMs * updateFrequency

  // update subscription lastFetchedAt
  const updatedSubscription = await sendUpdateSubscriptionMutation(
    userId,
    subscriptionId,
    lastItemFetchedAt,
    updatedLastFetchedChecksum,
    new Date(nextScheduledAt)
  )
  console.log('Updated subscription', updatedSubscription)
}

export const rssHandler = Sentry.GCPFunction.wrapHttpFunction(
  async (req, res) => {
    if (req.query.token !== process.env.PUBSUB_VERIFICATION_TOKEN) {
      console.log('query does not include valid token')
      return res.sendStatus(403)
    }

    try {
      if (!isRssFeedRequest(req.body)) {
        console.error('Invalid request body', req.body)
        return res.status(400).send('INVALID_REQUEST_BODY')
      }

      const {
        feedUrl,
        subscriptionIds,
        lastFetchedTimestamps,
        scheduledTimestamps,
        userIds,
        lastFetchedChecksums,
      } = req.body
      console.log('Processing feed', feedUrl)

      const fetchResult = await fetchAndChecksum(feedUrl)

      for (let i = 0; i < subscriptionIds.length; i++) {
        const subscriptionId = subscriptionIds[i]
        const lastFetchedAt = lastFetchedTimestamps[i]
        const scheduledAt = scheduledTimestamps[i]
        const userId = userIds[i]
        const lastFetchedChecksum = lastFetchedChecksums[i]

        await processSubscription(
          subscriptionId,
          userId,
          feedUrl,
          fetchResult,
          lastFetchedAt,
          scheduledAt,
          lastFetchedChecksum
        )
      }

      res.send('ok')
    } catch (e) {
      console.error('Error while parsing RSS feed', e)
      res.status(500).send('INTERNAL_SERVER_ERROR')
    }
  }
)
