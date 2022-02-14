import { createTestUser, deleteTestUser } from '../db'
import { request } from '../util'
import { expect } from 'chai'
import nock from 'nock'

describe('/article/save API', () => {
  const username = 'fakeUser'

  let authToken: string

  // We need to mock the pupeeteer-parse
  // service here because in dev mode the task gets
  // called immediately.
  nock('http://localhost:8080/').post('/').reply(200)

  before(async () => {
    // create test user and login
    const user = await createTestUser(username)
    const res = await request
      .post('/local/debug/fake-user-login')
      .send({ fakeEmail: user.email })

    authToken = res.body.authToken
  })

  after(async () => {
    // clean up
    await deleteTestUser(username)
  })

  describe('POST /article/save', () => {
    const url = 'https://www.example.com'

    context('when token and url are valid', () => {
      it('should create an article saving request', async () => {
        const response = await request
          .post('/api/article/save')
          .send({
            url,
            v: '0.2.18',
          })
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('Cookie', `auth=${authToken}`)

        expect(response.body.articleSavingRequestId).to.be.a('string')
      })
    })
  })
})
