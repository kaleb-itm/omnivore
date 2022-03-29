import { createApp } from '../src/server'
import supertest from 'supertest'
import { v4 } from 'uuid'
import { corsConfig } from '../src/utils/corsConfig'
import { Page } from '../src/elastic/types'
import { PageType } from '../src/generated/graphql'
import { getPageById } from '../src/elastic'
import { User } from '../src/entity/user'
import { Label } from '../src/entity/label'
import { createPubSubClient } from '../src/datalayer/pubsub'
import { createPage } from '../src/elastic/pages'

const { app, apollo } = createApp()
export const request = supertest(app)

before(async () => {
  await apollo.start()
  apollo.applyMiddleware({ app, path: '/api/graphql', cors: corsConfig })
})

export const graphqlRequest = (
  query: string,
  authToken?: string
): supertest.Test => {
  return request
    .post(apollo.graphqlPath)
    .send({
      query,
    })
    .set('Accept', 'application/json')
    .set('authorization', authToken || '')
    .expect('Content-Type', /json/)
}

export const generateFakeUuid = () => {
  return v4()
}

export const createTestElasticPage = async (
  user: User,
  labels?: Label[]
): Promise<Page> => {
  const page: Page = {
    id: '',
    hash: 'test hash',
    userId: user.id,
    pageType: PageType.Article,
    title: 'test title',
    content: '<p>test content</p>',
    createdAt: new Date(),
    url: 'https://example.com/test-url',
    slug: 'test-with-omnivore',
    labels: labels,
    readingProgressPercent: 0,
    readingProgressAnchorIndex: 0,
  }

  const pageId = await createPage(page, {
    pubsub: createPubSubClient(),
    refresh: true,
    uid: user.id,
  })
  if (pageId) {
    page.id = pageId
  }

  const res = await getPageById(page.id)
  console.log('got page', res)
  if (!res) {
    throw new Error('Failed to create page')
  }
  return res
}
