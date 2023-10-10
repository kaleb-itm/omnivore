import * as chai from 'chai'
import { expect } from 'chai'
import chaiString from 'chai-string'
import 'mocha'
import sinon from 'sinon'
import { DeepPartial } from 'typeorm'
import { Highlight } from '../../src/entity/highlight'
import { Label } from '../../src/entity/label'
import { LibraryItem, LibraryItemState } from '../../src/entity/library_item'
import { UploadFile } from '../../src/entity/upload_file'
import { User } from '../../src/entity/user'
import {
  ArticleSavingRequestStatus,
  BulkActionType,
  PageType,
  SyncUpdatedItemEdge,
  UpdateReason,
  UploadFileStatus,
} from '../../src/generated/graphql'
import { getRepository } from '../../src/repository'
import { createHighlight } from '../../src/services/highlights'
import {
  createLabel,
  deleteLabels,
  saveLabelsInLibraryItem,
} from '../../src/services/labels'
import {
  createLibraryItem,
  createLibraryItems,
  deleteLibraryItemById,
  deleteLibraryItemByUrl,
  deleteLibraryItems,
  deleteLibraryItemsByUserId,
  findLibraryItemById,
  findLibraryItemByUrl,
  updateLibraryItem,
} from '../../src/services/library_item'
import { deleteUser } from '../../src/services/user'
import * as createTask from '../../src/utils/createTask'
import * as uploads from '../../src/utils/uploads'
import { createTestLibraryItem, createTestUser } from '../db'
import { generateFakeUuid, graphqlRequest, request } from '../util'

chai.use(chaiString)

const archiveLink = async (authToken: string, linkId: string) => {
  const query = `
  mutation {
    setLinkArchived(
      input: {
        linkId: "${linkId}",
        archived: ${true}
      }
    ) {
      ... on ArchiveLinkSuccess {
        linkId
      }
      ... on ArchiveLinkError {
        errorCodes
      }
    }
  }
  `
  return graphqlRequest(query, authToken).expect(200)
}

const createArticleQuery = (
  url: string,
  source: string,
  document: string,
  title: string
) => {
  return `
  mutation {
    createArticle(input: {
      url: "${url}"
      source: "${source}"
      preparedDocument: {
        document: "${document}"
        pageInfo: {
          contentType: "text/html"
          title: "${title}"
        }
      }
    }) {
      ... on CreateArticleSuccess {
        createdArticle {
          id
          title
          content
          isArchived
        }
        user {
          id
          name
        }
        created
      }
      ... on CreateArticleError {
        errorCodes
      }
    }
  }
  `
}

const getArticleQuery = (slug: string) => {
  return `
  query {
    article(slug: "${slug}", username: "") {
      ... on ArticleSuccess {
        article {
          id
          slug
          content
          highlights {
            id
            shortId
            quote
            prefix
            suffix
            patch
            annotation
            sharedAt
            createdAt
            updatedAt
          }
        }
      }
      ... on ArticleError {
        errorCodes
      }
    }
  }
  `
}

const searchQuery = (keyword = '') => {
  return `
  query {
    search(
      after: ""
      first: 5
      query: "${keyword}") {
      ... on SearchSuccess {
        edges {
          cursor
          node {
            id
            url
            createdAt
            updatedAt
            highlights {
              id
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          totalCount
        }
      }
      ... on SearchError {
        errorCodes
      }
    }
  }
  `
}

const savePageQuery = (
  url: string,
  title: string,
  originalContent: string,
  state: ArticleSavingRequestStatus | null = null,
  labels: string[] | null = null
) => {
  return `
    mutation {
      savePage(
        input: {
          url: "${url}",
          source: "test",
          clientRequestId: "${generateFakeUuid()}",
          title: "${title}",
          originalContent: "${originalContent}"
          state: ${state}
          labels: ${
            labels
              ? '[' + labels.map((label) => `{ name: "${label}" }`) + ']'
              : null
          }
        }
      ) {
        ... on SaveSuccess {
          url
        }
        ... on SaveError {
          errorCodes
        }
      }
    }
    `
}

const saveFileQuery = (url: string, uploadFileId: string) => {
  return `
    mutation {
      saveFile (
        input: {
          url: "${url}",
          source: "test",
          clientRequestId: "${generateFakeUuid()}",
          uploadFileId: "${uploadFileId}",
        }
      ) {
        ... on SaveSuccess {
          url
        }
        ... on SaveError {
          errorCodes
        }
      }
    }
    `
}

const saveUrlQuery = (
  url: string,
  state: ArticleSavingRequestStatus | null = null,
  labels: string[] | null = null
) => {
  return `
    mutation {
      saveUrl(
        input: {
          url: "${url}",
          source: "test",
          clientRequestId: "${generateFakeUuid()}",
          state: ${state}
          labels: ${
            labels
              ? '[' + labels.map((label) => `{ name: "${label}" }`) + ']'
              : null
          }
        }
      ) {
        ... on SaveSuccess {
          url
        }
        ... on SaveError {
          errorCodes
        }
      }
    }
    `
}

const setBookmarkQuery = (articleId: string, bookmark: boolean) => {
  return `
    mutation {
      setBookmarkArticle(
        input: {
          articleID: "${articleId}",
          bookmark: ${bookmark}
        }
      ) {
        ... on SetBookmarkArticleSuccess {
          bookmarkedArticle {
            id
          }
        }
        ... on SetBookmarkArticleError {
          errorCodes
        }
      }
    }
    `
}

const saveArticleReadingProgressQuery = (
  articleId: string,
  progress: number,
  topPercent: number | null = null
) => {
  return `
    mutation {
      saveArticleReadingProgress(
        input: {
          id: "${articleId}",
          readingProgressPercent: ${progress}
          readingProgressAnchorIndex: 0
          readingProgressTopPercent: ${topPercent}
        }
      ) {
        ... on SaveArticleReadingProgressSuccess {
          updatedArticle {
            id
            readingProgressPercent
            readAt
            readingProgressTopPercent
          }
        }
        ... on SaveArticleReadingProgressError {
          errorCodes
        }
      }
    }
    `
}

const typeaheadSearchQuery = (keyword: string) => {
  return `
  query {
    typeaheadSearch(query: "${keyword}") {
      ... on TypeaheadSearchSuccess {
        items {
          id
          slug
          title
          contentReader
        }
      }
      ... on TypeaheadSearchError {
        errorCodes
      }
    }
  }
  `
}

describe('Article API', () => {
  let authToken: string
  let user: User

  before(async () => {
    // create test user and login
    user = await createTestUser('fakeUser')
    const res = await request
      .post('/local/debug/fake-user-login')
      .send({ fakeEmail: user.email })

    authToken = res.body.authToken
  })

  after(async () => {
    // clean up
    await deleteUser(user.id)
  })

  describe('CreateArticle', () => {
    let query = ''
    let url = ''
    let source = ''
    let document = ''
    let title = ''
    let itemId = ''

    beforeEach(async () => {
      query = createArticleQuery(url, source, document, title)
    })

    context('when saving from document', () => {
      before(() => {
        url = 'https://blog.omnivore.app/p/testing-is-fun-with-omnivore'
        source = 'puppeteer-parse'
        document = '<p>test</p>'
        title = 'new title'
      })

      after(async () => {
        await deleteLibraryItemById(itemId, user.id)
      })

      it('should create an article', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.createArticle.createdArticle.title).to.eql(title)
        itemId = res.body.data.createArticle.createdArticle.id
      })
    })

    context('when saving an archived article', () => {
      before(async () => {
        url = 'https://blog.omnivore.app/saving-archived-article.com'
        source = 'puppeteer-parse'
        document = '<p>test</p>'
        title = 'new title'

        const item = await createLibraryItem(
          {
            readableContent: document,
            slug: 'test saving an archived article slug',
            title,
            user: { id: user.id },
            originalUrl: url,
            archivedAt: new Date(),
            state: LibraryItemState.Archived,
          },
          user.id
        )
        itemId = item.id
      })

      after(async () => {
        await deleteLibraryItemById(itemId, user.id)
      })

      it('unarchives the article', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.createArticle.createdArticle.isArchived).to.false
      })
    })
  })

  describe('GetArticle', () => {
    const realSlug = 'testing-is-really-fun-with-omnivore'

    let query = ''
    let slug = ''
    let itemId: string

    before(async () => {
      const itemToCreate: DeepPartial<LibraryItem> = {
        title: 'test title',
        originalContent: '<p>test</p>',
        slug: realSlug,
        readingProgressTopPercent: 100,
        user,
        originalUrl: 'https://blog.omnivore.app/test-with-omnivore',
        highlights: [
          {
            shortId: 'test short id',
            patch: 'test patch',
            quote: 'test quote',
            user,
          },
        ],
      }
      const item = await createLibraryItem(itemToCreate, user.id)
      itemId = item.id
    })

    after(async () => {
      await deleteLibraryItemById(itemId, user.id)
    })

    beforeEach(async () => {
      query = getArticleQuery(slug)
    })

    context('when item exists', () => {
      before(() => {
        slug = realSlug
      })

      it('should return the item', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.article.article.slug).to.eql(slug)
      })

      it('should return highlights', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.article.article.highlights).to.length(1)
      })

      context('when item is failed to process', () => {
        before(async () => {
          await updateLibraryItem(
            itemId,
            {
              state: LibraryItemState.Processing,
              savedAt: new Date(Date.now() - 1000 * 60),
            },
            user.id
          )
        })

        it('should return unable to parse', async () => {
          const res = await graphqlRequest(query, authToken).expect(200)

          expect(res.body.data.article.article.content).to.eql(
            '<p>We were unable to parse this page.</p>'
          )
        })
      })
    })

    context('query with id instead of slug', () => {
      before(() => {
        slug = itemId
      })

      it('returns the item', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.article.article.id).to.eql(slug)
      })
    })

    context('when item does not exist', () => {
      before(() => {
        slug = 'not-a-real-slug'
      })

      it('should return an error', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.article.errorCodes).to.eql(['NOT_FOUND'])
      })
    })
  })

  describe('SavePage', () => {
    let query = ''
    let title = 'Example Title'
    let url = 'https://blog.omnivore.app'
    let originalContent = '<div>Example Content</div>'

    beforeEach(() => {
      query = savePageQuery(url, title, originalContent)
    })

    context('when we save a new item', () => {
      after(async () => {
        await deleteLibraryItemByUrl(url, user.id)
      })

      it('should return a slugged url', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)
        expect(res.body.data.savePage.url).to.startsWith(
          'http://localhost:3000/fakeUser/example-title-'
        )
      })
    })

    context('when we save a item that is already archived', () => {
      before(() => {
        url = 'https://blog.omnivore.app/new-url'
      })

      after(async () => {
        await deleteLibraryItemByUrl(url, user.id)
      })

      it('it should return that item in the Search Query', async () => {
        await graphqlRequest(
          savePageQuery(url, title, originalContent),
          authToken
        ).expect(200)

        // Save a link, then archive it
        let allLinks = await graphqlRequest(searchQuery(''), authToken).expect(
          200
        )
        const justSavedId = allLinks.body.data.search.edges[0].node.id
        await archiveLink(authToken, justSavedId)

        // test the negative case, ensuring the archive link wasn't returned
        allLinks = await graphqlRequest(searchQuery(''), authToken).expect(200)
        expect(allLinks.body.data.search.edges[0]?.node?.url).to.not.eq(url)

        // Now save the link again, and ensure it is returned
        await graphqlRequest(
          savePageQuery(url, title, originalContent),
          authToken
        ).expect(200)

        allLinks = await graphqlRequest(searchQuery(''), authToken).expect(200)
        expect(allLinks.body.data.search.edges[0].node.url).to.eq(url)
      })
    })

    xcontext('when we also want to save labels and archives the item', () => {
      after(async () => {
        await deleteLibraryItemById(url, user.id)
      })

      it('saves the labels and archives the item', async () => {
        url = 'https://blog.omnivore.app/new-url-2'
        const state = ArticleSavingRequestStatus.Archived
        const labels = ['test name', 'test name 2']
        await graphqlRequest(
          savePageQuery(url, title, originalContent, state, labels),
          authToken
        ).expect(200)

        const savedItem = await findLibraryItemByUrl(url, user.id)
        expect(savedItem?.archivedAt).to.not.be.null
        expect(savedItem?.labels?.map((l) => l.name)).to.eql(labels)
      })
    })
  })

  describe('SaveUrl', () => {
    let query = ''
    let url = 'https://blog.omnivore.app/new-url-1'

    before(() => {
      sinon.replace(createTask, 'enqueueParseRequest', sinon.fake.resolves(''))
    })

    beforeEach(() => {
      query = saveUrlQuery(url)
    })

    after(() => {
      sinon.restore()
    })

    afterEach(async () => {
      await deleteLibraryItemByUrl(url, user.id)
    })

    context('when we save a new url', () => {
      it('should return a slugged url', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)
        expect(res.body.data.saveUrl.url).to.startsWith(
          'http://localhost:3000/fakeUser/links/'
        )
      })
    })

    xcontext('when we save labels', () => {
      it('saves the labels and archives the item', async () => {
        url = 'https://blog.omnivore.app/new-url-2'
        const state = ArticleSavingRequestStatus.Archived
        const labels = ['test name', 'test name 2']
        await graphqlRequest(
          saveUrlQuery(url, state, labels),
          authToken
        ).expect(200)

        const savedItem = await findLibraryItemByUrl(url, user.id)
        expect(savedItem?.archivedAt).to.not.be.null
        expect(savedItem?.labels?.map((l) => l.name)).to.eql(labels)
      })
    })
  })

  describe('setBookmarkArticle', () => {
    let itemId: string

    before(async () => {
      const itemToSave: DeepPartial<LibraryItem> = {
        user,
        title: 'test title',
        readableContent: '<p>test</p>',
        originalUrl: 'https://blog.omnivore.app/setBookmarkArticle',
        slug: 'test-with-omnivore',
      }
      const item = await createLibraryItem(itemToSave, user.id)
      itemId = item.id
    })

    after(async () => {
      await deleteLibraryItemById(itemId, user.id)
    })

    it('marks an article as deleted', async () => {
      await graphqlRequest(setBookmarkQuery(itemId, false), authToken).expect(
        200
      )
      const item = await findLibraryItemById(itemId, user.id)
      expect(item?.state).to.eql(LibraryItemState.Deleted)
    })
  })

  describe('saveArticleReadingProgressResolver', () => {
    let query = ''
    let itemId = ''
    let progress = 0.5
    let topPercent: number | null = null

    before(async () => {
      itemId = (await createTestLibraryItem(user.id)).id
    })

    after(async () => {
      await deleteLibraryItemById(itemId, user.id)
    })

    it('saves a reading progress on an article', async () => {
      query = saveArticleReadingProgressQuery(itemId, progress, topPercent)
      const res = await graphqlRequest(query, authToken).expect(200)
      expect(
        res.body.data.saveArticleReadingProgress.updatedArticle
          .readingProgressPercent
      ).to.eq(progress)
      expect(res.body.data.saveArticleReadingProgress.updatedArticle.readAt).not
        .null
    })

    it('should not allow setting the reading progress lower than current progress', async () => {
      const firstQuery = saveArticleReadingProgressQuery(itemId, 75)
      const firstRes = await graphqlRequest(firstQuery, authToken).expect(200)
      expect(
        firstRes.body.data.saveArticleReadingProgress.updatedArticle
          .readingProgressPercent
      ).to.eq(75)

      // Now try to set to a lower value (50), value should not be updated
      // refresh index to ensure the reading progress is updated
      const secondQuery = saveArticleReadingProgressQuery(itemId, 50)
      const secondRes = await graphqlRequest(secondQuery, authToken).expect(200)
      expect(
        secondRes.body.data.saveArticleReadingProgress.updatedArticle
          .readingProgressPercent
      ).to.eq(75)
    })

    context('when item is a PDF', () => {
      let item: LibraryItem

      before(async () => {
        item = await createLibraryItem(
          {
            user,
            title: 'test update reading progress for PDF',
            readableContent: '<p>test</p>',
            originalUrl:
              'https://blog.omnivore.app/test-update-reading-progress-for-pdf',
            slug: 'test-update-reading-progress-for-pdf',
            itemType: PageType.File,
            readingProgressBottomPercent: 90,
          },
          user.id
        )
      })

      after(async () => {
        await deleteLibraryItemById(item.id, user.id)
      })

      it('allows setting the reading progress lower than current progress', async () => {
        const query = saveArticleReadingProgressQuery(itemId, 50)
        const res = await graphqlRequest(query, authToken).expect(200)
        expect(
          res.body.data.saveArticleReadingProgress.updatedArticle
            .readingProgressPercent
        ).to.eq(50)
      })
    })

    it('does not save topPercent if not undefined', async () => {
      query = saveArticleReadingProgressQuery(itemId, progress, null)
      const res = await graphqlRequest(query, authToken).expect(200)
      expect(
        res.body.data.saveArticleReadingProgress.updatedArticle
          .readingProgressTopPercent
      ).to.eq(0)
    })

    it('saves topPercent if defined', async () => {
      const topPercent = 0.2
      query = saveArticleReadingProgressQuery(itemId, progress, topPercent)
      const res = await graphqlRequest(query, authToken).expect(200)
      expect(
        res.body.data.saveArticleReadingProgress.updatedArticle
          .readingProgressTopPercent
      ).to.eql(topPercent)
    })

    it('saves topPercent as 0 if defined as 0', async () => {
      const topPercent = 0
      query = saveArticleReadingProgressQuery(itemId, progress, topPercent)
      const res = await graphqlRequest(query, authToken).expect(200)
      expect(
        res.body.data.saveArticleReadingProgress.updatedArticle
          .readingProgressTopPercent
      ).to.eql(topPercent)
    })

    it('returns BAD_DATA error if top position is greater than bottom position', async () => {
      query = saveArticleReadingProgressQuery(itemId, 0.5, 0.8)
      const res = await graphqlRequest(query, authToken).expect(200)
      expect(res.body.data.saveArticleReadingProgress.errorCodes).to.eql([
        'BAD_DATA',
      ])
    })
  })

  describe('SaveFile', () => {
    let query = ''
    let url = ''
    let uploadFileId = ''

    before(() => {
      sinon.replace(
        uploads,
        'getStorageFileDetails',
        sinon.fake.resolves({ fileUrl: 'fake url', md5Hash: 'fake hash' })
      )
    })

    beforeEach(() => {
      query = saveFileQuery(url, uploadFileId)
    })

    after(() => {
      sinon.restore()
    })

    context('when the file is not uploaded', () => {
      before(async () => {
        url = 'fake url'
        uploadFileId = generateFakeUuid()
      })

      it('should return Unauthorized error', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)
        expect(res.body.data.saveFile.errorCodes).to.eql(['UNAUTHORIZED'])
      })
    })

    context('when the file is uploaded', () => {
      before(async () => {
        url = 'https://blog.omnivore.app/'
        const uploadFile = await getRepository(UploadFile).save({
          fileName: 'test.pdf',
          contentType: 'application/pdf',
          url: url,
          user: user,
          status: UploadFileStatus.Initialized,
        })
        uploadFileId = uploadFile.id
      })

      it('should return the new url', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)
        expect(res.body.data.saveFile.url).to.startsWith(
          'http://localhost:3000/fakeUser/links'
        )
      })
    })
  })

  describe('Search API', () => {
    const url = 'https://blog.omnivore.app/p/getting-started-with-omnivore'
    const items: LibraryItem[] = []
    const highlights: Highlight[] = []
    const searchedKeyword = 'aaabbbccc'

    let query = ''
    let keyword = ''

    before(async () => {
      const readingProgressArray = [0, 2, 97, 98, 100]
      // Create some test items
      for (let i = 0; i < 5; i++) {
        const itemToSave: DeepPartial<LibraryItem> = {
          user,
          title: 'test title',
          readableContent: `<p>test ${searchedKeyword}</p>`,
          slug: 'test slug',
          originalUrl: `${url}/${i}`,
          siteName: 'Example',
          readingProgressBottomPercent: readingProgressArray[i],
        }
        const item = await createLibraryItem(itemToSave, user.id)
        items.push(item)

        // Create some test highlights
        const highlightToSave: DeepPartial<Highlight> = {
          patch: 'test patch',
          shortId: `test shortId${i}`,
          user,
          quote: '<p>search highlight</p>',
          libraryItem: item,
        }
        const highlight = await createHighlight(
          highlightToSave,
          item.id,
          user.id
        )
        highlights.push(highlight)
      }
    })

    beforeEach(async () => {
      query = searchQuery(keyword)
    })

    after(async () => {
      await deleteLibraryItemsByUserId(user.id)
    })

    context('when type:highlights is not in the query', () => {
      before(() => {
        keyword = searchedKeyword
      })

      it('should return items in descending order', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.edges.length).to.eql(5)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[4].id)
        expect(res.body.data.search.edges[1].node.id).to.eq(items[3].id)
        expect(res.body.data.search.edges[2].node.id).to.eq(items[2].id)
        expect(res.body.data.search.edges[3].node.id).to.eq(items[1].id)
        expect(res.body.data.search.edges[4].node.id).to.eq(items[0].id)
      })

      it('should return highlights in items', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.edges[0].node.highlights.length).to.eql(1)
        expect(res.body.data.search.edges[0].node.highlights[0].id).to.eq(
          highlights[4].id
        )
      })
    })

    context('when is:unread is in the query', () => {
      before(() => {
        keyword = `'${searchedKeyword}' is:unread`
      })

      it('returns unread articles in descending order', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.edges.length).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when is:reading is in the query', () => {
      before(() => {
        keyword = `'${searchedKeyword}' is:reading`
      })

      it('returns reading articles in descending order', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.edges.length).to.eq(3)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[3].id)
        expect(res.body.data.search.edges[1].node.id).to.eq(items[2].id)
        expect(res.body.data.search.edges[2].node.id).to.eq(items[1].id)
      })
    })

    context('when is:read is in the query', () => {
      before(() => {
        keyword = `'${searchedKeyword}' is:read`
      })

      it('returns fully read articles in descending order', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.edges.length).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[4].id)
      })
    })

    context('when no:label is in the query', () => {
      before(async () => {
        keyword = `'${searchedKeyword}' no:label`
      })

      it('returns non-labeled items in descending order', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(5)
      })
    })

    context('when no:highlight is in the query', () => {
      before(async () => {
        keyword = `'${searchedKeyword}' no:highlight`
      })

      it('returns non-highlighted items in descending order', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(0)
      })
    })

    context('when site:${site_name} is in the query', () => {
      before(async () => {
        keyword = `'${searchedKeyword}' site:example`
      })

      it('returns items from the site', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(5)
      })
    })

    context("when 'in:archive label:test' is in the query", () => {
      let items: LibraryItem[] = []
      let label: Label

      before(async () => {
        keyword = 'in:archive label:test'
        // Create some test items
        label = await createLabel('test', '', user.id)
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              archivedAt: new Date(),
              state: LibraryItemState.Archived,
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              archivedAt: new Date(),
              state: LibraryItemState.Archived,
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
            },
          ],
          user.id
        )
        await saveLabelsInLibraryItem([label], items[0].id, user.id)
        await saveLabelsInLibraryItem([label], items[2].id, user.id)
      })

      after(async () => {
        await deleteLabels({ id: label.id }, user.id)
        await deleteLibraryItems(items, user.id)
      })

      it('returns archived items with label test', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context("when in:library label:test' is in the query", () => {
      let items: LibraryItem[] = []
      let label: Label

      before(async () => {
        keyword = 'in:library label:test'
        // Create some test items
        label = await createLabel('test', '', user.id)
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              subscription: 'test subscription',
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
              archivedAt: new Date(),
              state: LibraryItemState.Archived,
            },
          ],
          user.id
        )
        await saveLabelsInLibraryItem([label], items[0].id, user.id)
        await saveLabelsInLibraryItem([label], items[1].id, user.id)
        await saveLabelsInLibraryItem([label], items[2].id, user.id)
      })

      after(async () => {
        await deleteLabels({ id: label.id }, user.id)
        await deleteLibraryItems(items, user.id)
      })

      it('returns library items with label test', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when type:file label:test is in the query', () => {
      let items: LibraryItem[] = []
      let label: Label

      before(async () => {
        keyword = 'type:file label:test'
        // Create some test items
        label = await createLabel('test', '', user.id)
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              itemType: PageType.File,
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              itemType: PageType.File,
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
            },
          ],
          user.id
        )
        await saveLabelsInLibraryItem([label], items[0].id, user.id)
        await saveLabelsInLibraryItem([label], items[2].id, user.id)
      })

      after(async () => {
        await deleteLabels({ id: label.id }, user.id)
        await deleteLibraryItems(items, user.id)
      })

      it('returns files with label test', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when in:archive is:unread is in the query', () => {
      let items: LibraryItem[] = []

      before(async () => {
        keyword = 'in:archive is:unread'
        // Create some test items
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              itemType: PageType.File,
              archivedAt: new Date(),
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              archivedAt: new Date(),
              readingProgressBottomPercent: 100,
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
            },
          ],
          user.id
        )
      })

      after(async () => {
        await deleteLibraryItems(items, user.id)
      })

      it('returns unread archived items', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when rss:feed in:archive is in the query', () => {
      let items: LibraryItem[] = []

      before(async () => {
        keyword = 'rss:feed in:archive'
        // Create some test items
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              archivedAt: new Date(),
              subscription: 'feed',
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              subscription: 'feed',
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
              archivedAt: new Date(),
            },
          ],
          user.id
        )
      })

      after(async () => {
        await deleteLibraryItems(items, user.id)
      })

      it('returns archived feed items', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when in:trash is:unread is in the query', () => {
      let items: LibraryItem[] = []

      before(async () => {
        keyword = 'in:trash is:unread'
        // Create some test items
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              deletedAt: new Date(),
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              deletedAt: new Date(),
              readingProgressBottomPercent: 100,
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
            },
          ],
          user.id
        )
      })

      after(async () => {
        await deleteLibraryItems(items, user.id)
      })

      it('returns unfinished deleted items', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when readPosition:>20 readPosition:<50 is in the query', () => {
      let items: LibraryItem[] = []

      before(async () => {
        keyword = 'readPosition:>20 readPosition:<50'
        // Create some test items
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              readingProgressBottomPercent: 40,
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              readingProgressBottomPercent: 10,
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
              readingProgressBottomPercent: 100,
            },
          ],
          user.id
        )
      })

      after(async () => {
        await deleteLibraryItems(items, user.id)
      })

      it('returns items with reading progress between 20% and 50% exclusively', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })

    context('when wordsCount:>=10000 wordsCount:<=20000 is in the query', () => {
      let items: LibraryItem[] = []

      before(async () => {
        keyword = 'wordsCount:>=10000 wordsCount:<=20000'
        // Create some test items
        items = await createLibraryItems(
          [
            {
              user,
              title: 'test title 1',
              readableContent: '<p>test 1</p>',
              slug: 'test slug 1',
              originalUrl: `${url}/test1`,
              wordCount: 10000,
            },
            {
              user,
              title: 'test title 2',
              readableContent: '<p>test 2</p>',
              slug: 'test slug 2',
              originalUrl: `${url}/test2`,
              wordCount: 8000,
            },
            {
              user,
              title: 'test title 3',
              readableContent: '<p>test 3</p>',
              slug: 'test slug 3',
              originalUrl: `${url}/test3`,
              wordCount: 100000,
            },
          ],
          user.id
        )
      })

      after(async () => {
        await deleteLibraryItems(items, user.id)
      })

      it('returns items with words count between 10000 and 20000 inclusively', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.search.pageInfo.totalCount).to.eq(1)
        expect(res.body.data.search.edges[0].node.id).to.eq(items[0].id)
      })
    })
  })

  describe('TypeaheadSearch API', () => {
    const items: LibraryItem[] = []

    let query = ''
    let keyword = 'typeahead'

    before(async () => {
      // Create some test items
      for (let i = 0; i < 5; i++) {
        const itemToSave: DeepPartial<LibraryItem> = {
          user,
          title: 'typeahead search item',
          readableContent: '<p>test</p>',
          slug: '',
          originalUrl: `https://blog.omnivore.app/p/typeahead-search-${i}`,
        }
        const item = await createLibraryItem(itemToSave, user.id)
        items.push(item)
      }
    })

    beforeEach(async () => {
      query = typeaheadSearchQuery(keyword)
    })

    after(async () => {
      await deleteLibraryItemsByUserId(user.id)
    })

    it('returns items with typeahead prefix', async () => {
      const res = await graphqlRequest(query, authToken).expect(200)

      expect(res.body.data.typeaheadSearch.items.length).to.eql(5)
      expect(res.body.data.typeaheadSearch.items[0].id).to.eq(items[4].id)
      expect(res.body.data.typeaheadSearch.items[1].id).to.eq(items[3].id)
      expect(res.body.data.typeaheadSearch.items[2].id).to.eq(items[2].id)
      expect(res.body.data.typeaheadSearch.items[3].id).to.eq(items[1].id)
      expect(res.body.data.typeaheadSearch.items[4].id).to.eq(items[0].id)
    })
  })

  describe('UpdatesSince API', () => {
    const updatesSinceQuery = (since: string) => `
      query {
        updatesSince(
          since: "${since}") {
          ... on UpdatesSinceSuccess {
            edges {
              cursor
              node {
                id
                createdAt
                updatedAt
                pageType
              }
              itemID
              updateReason
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
              totalCount
            }
          }
          ... on UpdatesSinceError {
            errorCodes
          }
        }
      }
    `
    let since: string
    let items: LibraryItem[] = []
    let deletedItems: LibraryItem[] = []

    before(async () => {
      // Create some test items
      for (let i = 0; i < 5; i++) {
        const itemToSave: DeepPartial<LibraryItem> = {
          title: 'test item',
          slug: '',
          readableContent: '<p>test</p>',
          originalUrl: `https://blog.omnivore.app/p/updates-since-${i}`,
          user,
        }
        const item = await createLibraryItem(itemToSave, user.id)
        items.push(item)
      }

      // set the since to be the timestamp before deletion
      since = items[4].updatedAt.toISOString()

      // Delete some items
      for (let i = 0; i < 3; i++) {
        await updateLibraryItem(
          items[i].id,
          { state: LibraryItemState.Deleted, deletedAt: new Date() },
          user.id
        )
        deletedItems.push(items[i])
      }
    })

    after(async () => {
      // Delete all items
      await deleteLibraryItemsByUserId(user.id)
    })

    it('returns items deleted after since', async () => {
      const res = await graphqlRequest(
        updatesSinceQuery(since),
        authToken
      ).expect(200)

      expect(
        res.body.data.updatesSince.edges.filter(
          (e: SyncUpdatedItemEdge) => e.updateReason === UpdateReason.Deleted
        ).length
      ).to.eql(3)
      expect(res.body.data.updatesSince.edges[0].itemID).to.eq(
        deletedItems[2].id
      )
      expect(res.body.data.updatesSince.edges[1].itemID).to.eq(
        deletedItems[1].id
      )
      expect(res.body.data.updatesSince.edges[2].itemID).to.eq(
        deletedItems[0].id
      )
      expect(res.body.data.updatesSince.edges[0].updateReason).to.eq(
        UpdateReason.Deleted
      )
    })
  })

  describe('BulkAction API', () => {
    const bulkActionQuery = (action: BulkActionType, query = 'in:all') => `
      mutation {
        bulkAction (action: ${action}, query: "${query}") {
          ... on BulkActionSuccess {
            success
          }
          ... on BulkActionError {
            errorCodes
          }
        }
      }
    `

    before(async () => {
      // Create some test items
      for (let i = 0; i < 5; i++) {
        await createLibraryItem(
          {
            user,
            itemType: i == 0 ? PageType.Article : PageType.File,
            title: 'test item',
            readableContent: '<p>test</p>',
            slug: '',
            state:
              i == 0 ? LibraryItemState.Failed : LibraryItemState.Succeeded,
            originalUrl: `https://blog.omnivore.app/p/bulk-action-${i}`,
          },
          user.id
        )
      }
    })

    after(async () => {
      // Delete all items
      await deleteLibraryItemsByUserId(user.id)
    })

    context('when action is Archive', () => {
      it('archives all items', async () => {
        const res = await graphqlRequest(
          bulkActionQuery(BulkActionType.Archive),
          authToken
        ).expect(200)
        expect(res.body.data.bulkAction.success).to.be.true

        const items = await graphqlRequest(searchQuery(), authToken).expect(200)
        expect(items.body.data.search.pageInfo.totalCount).to.eql(0)
      })
    })

    context('when action is Delete', () => {
      it('deletes all items', async () => {
        const res = await graphqlRequest(
          bulkActionQuery(BulkActionType.Delete),
          authToken
        ).expect(200)
        expect(res.body.data.bulkAction.success).to.be.true

        const items = await graphqlRequest(
          searchQuery('in:all'),
          authToken
        ).expect(200)
        expect(items.body.data.search.pageInfo.totalCount).to.eql(0)
      })
    })
  })

  describe('SetFavoriteArticle API', () => {
    const setFavoriteArticleQuery = (articleId: string) => `
      mutation {
        setFavoriteArticle(id: "${articleId}") {
          ... on SetFavoriteArticleSuccess {
            success
          }
          ... on SetFavoriteArticleError {
            errorCodes
          }
        }
      }`

    let articleId = ''

    before(async () => {
      const itemToSave: DeepPartial<LibraryItem> = {
        user,
        title: 'test setFavoriteArticle',
        slug: '',
        readableContent: '<p>test</p>',
        originalUrl: `https://blog.omnivore.app/p/setFavoriteArticle`,
      }
      const item = await createLibraryItem(itemToSave, user.id)
      articleId = item.id
    })

    after(async () => {
      // Delete the item
      await deleteLibraryItemById(articleId, user.id)
    })

    it('favorites the article', async () => {
      await graphqlRequest(
        setFavoriteArticleQuery(articleId),
        authToken
      ).expect(200)

      const item = await findLibraryItemById(articleId, user.id)
      expect(item?.labels?.map((l) => l.name)).to.eql(['Favorites'])
    })
  })
})
