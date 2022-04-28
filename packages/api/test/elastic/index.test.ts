import 'mocha'
import { expect } from 'chai'
import { InFilter, ReadFilter } from '../../src/utils/search'
import {
  Highlight,
  Page,
  PageContext,
  PageType,
  State,
} from '../../src/elastic/types'
import { createPubSubClient } from '../../src/datalayer/pubsub'
import {
  countByCreatedAt,
  createPage,
  deletePage,
  getPageById,
  getPageByParam,
  searchPages,
  updatePage,
} from '../../src/elastic/pages'
import { addLabelInPage } from '../../src/elastic/labels'
import {
  addHighlightToPage,
  searchHighlights,
} from '../../src/elastic/highlights'

describe('elastic api', () => {
  const userId = 'userId'
  const ctx: PageContext = {
    pubsub: createPubSubClient(),
    refresh: true,
    uid: userId,
  }

  let page: Page

  before(async () => {
    // create a testing page
    page = {
      id: '',
      hash: 'test hash',
      userId: userId,
      pageType: PageType.Article,
      title: 'test title',
      content: '<p>test</p>',
      slug: 'test slug',
      createdAt: new Date(),
      updatedAt: new Date(),
      readingProgressPercent: 100,
      readingProgressAnchorIndex: 0,
      url: 'https://blog.omnivore.app/p/getting-started-with-omnivore',
      archivedAt: new Date(),
      labels: [
        {
          id: 'Test label id',
          name: 'test label',
          color: '#ffffff',
          createdAt: new Date(),
        },
        {
          id: 'Test label id 2',
          name: 'test label 2',
          color: '#eeeeee',
          createdAt: new Date(),
        },
      ],
      state: State.Succeeded,
    }
    const pageId = await createPage(page, ctx)
    if (!pageId) {
      expect.fail('Failed to create page')
    }
    page.id = pageId
  })

  after(async () => {
    // delete the testing page
    await deletePage(page.id, ctx)
  })

  describe('createPage', () => {
    let newPageId: string | undefined

    after(async () => {
      if (newPageId) {
        await deletePage(newPageId, ctx)
      }
    })

    it('creates a page', async () => {
      const newPageData: Page = {
        id: '',
        hash: 'hash',
        userId: 'userId',
        pageType: PageType.Article,
        title: 'test',
        content: 'test',
        slug: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        readingProgressPercent: 0,
        readingProgressAnchorIndex: 0,
        url: 'https://blog.omnivore.app/testUrl',
        state: State.Succeeded,
      }

      newPageId = await createPage(newPageData, ctx)

      expect(newPageId).to.be.a('string')
    })
  })

  describe('getPageByParam', () => {
    it('gets a page by url', async () => {
      const pageFound = await getPageByParam({
        userId: page.userId,
        url: page.url,
      })

      expect(pageFound).not.undefined
    })
  })

  describe('getPageById', () => {
    it('gets a page by id', async () => {
      const pageFound = await getPageById(page.id)
      expect(pageFound).not.undefined
    })
  })

  describe('updatePage', () => {
    it('updates a page', async () => {
      const newTitle = 'new title'
      const updatedPageData: Partial<Page> = {
        title: newTitle,
      }

      await updatePage(page.id, updatedPageData, ctx)

      const updatedPage = await getPageById(page.id)
      expect(updatedPage?.title).to.eql(newTitle)
    })
  })

  describe('searchPages', () => {
    it('searches pages', async () => {
      const searchResults = await searchPages(
        {
          inFilter: InFilter.ALL,
          labelFilters: [],
          readFilter: ReadFilter.ALL,
          query: 'test',
        },
        page.userId
      )
      expect(searchResults).not.undefined
    })
  })

  describe('addLabelInPage', () => {
    context('when the label not exist in the page', () => {
      it('adds the label to the page', async () => {
        const newLabel = {
          id: 'new label id',
          name: 'new label',
          color: '#07D2D1',
        }

        const result = await addLabelInPage(page.id, newLabel, ctx)
        expect(result).to.be.true

        const updatedPage = await getPageById(page.id)
        expect(updatedPage?.labels).to.deep.include(newLabel)
      })
    })

    context('when the label exists in the page', () => {
      it('does not add the label to the page', async () => {
        const newLabel = {
          id: 'Test label id',
          name: 'test label',
          color: '#07D2D1',
        }

        const result = await addLabelInPage(page.id, newLabel, ctx)

        expect(result).to.be.false
      })
    })
  })

  describe('countByCreatedAt', () => {
    const createdAt = Date.now() - 60 * 60 * 24 * 1000

    before(async () => {
      const newPageData: Page = {
        id: '',
        hash: 'hash',
        userId: userId,
        pageType: PageType.Article,
        title: 'test',
        content: 'test',
        slug: 'test',
        createdAt: new Date(createdAt),
        readingProgressPercent: 0,
        readingProgressAnchorIndex: 0,
        url: 'https://blog.omnivore.app/testCount',
        state: State.Succeeded,
      }

      await createPage(newPageData, ctx)
    })

    it('counts pages by createdAt', async () => {
      const count = await countByCreatedAt(userId, createdAt, createdAt)
      expect(count).to.eq(1)
    })
  })

  describe('searchHighlights', () => {
    const highlightId = 'highlightId'

    before(async () => {
      const highlightData: Highlight = {
        patch: 'test patch',
        quote: 'test content',
        shortId: 'test shortId',
        id: highlightId,
        userId: page.userId,
        createdAt: new Date(),
      }

      await addHighlightToPage(page.id, highlightData, ctx)
    })

    it('searches highlights', async () => {
      const [searchResults, count] = (await searchHighlights(
        {
          query: 'test',
        },
        page.userId
      )) || [[], 0]

      expect(count).to.eq(1)
      expect(searchResults[0].id).to.eq(highlightId)
    })
  })
})
