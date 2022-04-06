import { User } from '../../src/entity/user'
import { Page } from '../../src/elastic/types'
import { createTestUser, deleteTestUser } from '../db'
import { createTestElasticPage, graphqlRequest, request } from '../util'
import { ReportType } from '../../src/generated/graphql'
import { ContentDisplayReport } from '../../src/entity/reports/content_display_report'
import { expect } from 'chai'
import { getRepository } from '../../src/entity/utils'

describe('Report API', () => {
  const username = 'fakeUser'

  let user: User
  let authToken: string
  let page: Page

  before(async () => {
    // create test user and login
    user = await createTestUser(username)
    const res = await request
      .post('/local/debug/fake-user-login')
      .send({ fakeEmail: user.email })

    authToken = res.body.authToken

    // create a page
    page = await createTestElasticPage(user)
  })

  after(async () => {
    // clean up
    await deleteTestUser(username)
  })

  describe('reportItem', () => {
    let pageId: string
    let reportTypes: ReportType[]
    let query: string

    beforeEach(() => {
      query = `
        mutation {
          reportItem(
            input: {
              pageId: "${pageId}",
              itemUrl: "test url"
              reportTypes: [${reportTypes}],
              reportComment: "test comment"
            }
          ) {
            message
          }
        }
      `
    })

    context('when page exists and report is content display', () => {
      before(() => {
        pageId = page.id
        reportTypes = [ReportType.ContentDisplay]
      })

      after(async () => {
        await getRepository(ContentDisplayReport).delete({
          elasticPageId: pageId,
        })
      })

      it('should report an item', async () => {
        await graphqlRequest(query, authToken).expect(200)

        expect(
          await getRepository(ContentDisplayReport).findBy({
            elasticPageId: pageId,
          })
        ).to.exist
      })
    })
  })
})
