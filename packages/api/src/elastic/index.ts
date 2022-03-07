/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { env } from '../env'
import { Client } from '@elastic/elasticsearch'
import { PageType, SortOrder, SortParams } from '../generated/graphql'
import {
  InFilter,
  LabelFilter,
  LabelFilterType,
  ReadFilter,
} from '../utils/search'
import { Page, SearchBody, SearchResponse } from './types'

const INDEX_NAME = 'pages'
const client = new Client({
  node: env.elastic.url,
  maxRetries: 3,
  requestTimeout: 50000,
  auth: {
    username: env.elastic.username,
    password: env.elastic.password,
  },
})

const ingest = async (): Promise<void> => {
  await client.indices.create({
    index: INDEX_NAME,
    body: {
      settings: {
        analysis: {
          analyzer: {
            html_strip_analyzer: {
              tokenizer: 'standard',
              filter: ['lowercase'],
              char_filter: ['html_strip'],
            },
          },
          normalizer: {
            lowercase_normalizer: {
              filter: ['lowercase'],
            },
          },
        },
      },
      mappings: {
        properties: {
          userId: {
            type: 'keyword',
          },
          title: {
            type: 'text',
          },
          author: {
            type: 'text',
          },
          description: {
            type: 'text',
          },
          content: {
            type: 'text',
            analyzer: 'html_strip_analyzer',
          },
          url: {
            type: 'keyword',
          },
          uploadFileId: {
            type: 'keyword',
          },
          pageType: {
            type: 'keyword',
          },
          slug: {
            type: 'text',
          },
          labels: {
            type: 'nested',
            properties: {
              name: {
                type: 'keyword',
                normalizer: 'lowercase_normalizer',
              },
            },
          },
          readingProgress: {
            type: 'float',
          },
          readingProgressAnchorIndex: {
            type: 'integer',
          },
          createdAt: {
            type: 'date',
          },
          savedAt: {
            type: 'date',
          },
          archivedAt: {
            type: 'date',
          },
          siteName: {
            type: 'text',
          },
        },
      },
    },
  })
}

const appendQuery = (body: SearchBody, query: string): void => {
  body.query.bool.should.push({
    multi_match: {
      query,
      fields: ['title', 'content', 'author', 'description', 'slug', 'siteName'],
    },
  })
}

const appendTypeFilter = (body: SearchBody, filter: PageType): void => {
  body.query.bool.filter.push({
    term: {
      pageType: filter,
    },
  })
}

const appendReadFilter = (body: SearchBody, filter: ReadFilter): void => {
  switch (filter) {
    case ReadFilter.UNREAD:
      body.query.bool.filter.push({
        range: {
          readingProgress: {
            gte: 98,
          },
        },
      })
      break
    case ReadFilter.READ:
      body.query.bool.filter.push({
        range: {
          readingProgress: {
            lt: 98,
          },
        },
      })
  }
}

const appendInFilter = (body: SearchBody, filter: InFilter): void => {
  switch (filter) {
    case InFilter.ARCHIVE:
      body.query.bool.filter.push({
        exists: {
          field: 'archivedAt',
        },
      })
      break
    case InFilter.INBOX:
      body.query.bool.must_not.push({
        exists: {
          field: 'archivedAt',
        },
      })
  }
}

const appendNotNullField = (body: SearchBody, field: string): void => {
  body.query.bool.filter.push({
    exists: {
      field,
    },
  })
}

const appendExcludeLabelFilter = (
  body: SearchBody,
  filters: LabelFilter[]
): void => {
  body.query.bool.must_not.push({
    nested: {
      path: 'labels',
      query: filters.map((filter) => {
        return {
          terms: {
            'labels.name': filter.labels,
          },
        }
      }),
    },
  })
}

const appendIncludeLabelFilter = (
  body: SearchBody,
  filters: LabelFilter[]
): void => {
  body.query.bool.filter.push({
    nested: {
      path: 'labels',
      query: {
        bool: {
          filter: filters.map((filter) => {
            return {
              terms: {
                'labels.name': filter.labels,
              },
            }
          }),
        },
      },
    },
  })
}

export const createPage = async (data: Page): Promise<string | undefined> => {
  try {
    const { body } = await client.index({
      id: data.id || undefined,
      index: INDEX_NAME,
      body: data,
      refresh: true,
    })

    return body._id as string
  } catch (e) {
    console.error('failed to create a page in elastic', e)
    return undefined
  }
}

export const updatePage = async (
  id: string,
  data: Partial<Page>
): Promise<void> => {
  try {
    await client.update({
      index: INDEX_NAME,
      id,
      body: {
        doc: data,
      },
      refresh: true,
    })
  } catch (e) {
    console.error('failed to update a page in elastic', e)
  }
}

export const deletePage = async (id: string): Promise<void> => {
  try {
    await client.delete({
      index: INDEX_NAME,
      id,
    })
  } catch (e) {
    console.error('failed to delete a page in elastic', e)
  }
}

export const getPageByUrl = async (
  userId: string,
  url: string
): Promise<Page | undefined> => {
  try {
    const { body } = await client.search({
      index: INDEX_NAME,
      body: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  userId,
                },
              },
              {
                term: {
                  url,
                },
              },
            ],
          },
        },
      },
    })

    if (body.hits.total.value === 0) {
      return undefined
    }

    return {
      ...body.hits.hits[0]._source,
      id: body.hits.hits[0]._id,
    } as Page
  } catch (e) {
    console.error('failed to search pages in elastic', e)
    return undefined
  }
}

export const getPageById = async (id: string): Promise<Page | undefined> => {
  try {
    const { body } = await client.get({
      index: INDEX_NAME,
      id,
    })

    return {
      ...body._source,
      id: body._id,
    } as Page
  } catch (e) {
    console.error('failed to search pages in elastic', e)
    return undefined
  }
}

export const searchPages = async (
  args: {
    from?: number
    size?: number
    sort?: SortParams
    query?: string
    inFilter: InFilter
    readFilter: ReadFilter
    typeFilter?: PageType
    labelFilters: LabelFilter[]
  },
  userId: string,
  notNullField: string | null = null
): Promise<[Page[], number] | undefined> => {
  try {
    const {
      from = 0,
      size = 10,
      sort,
      query,
      readFilter,
      typeFilter,
      labelFilters,
      inFilter,
    } = args
    const sortOrder = sort?.order === SortOrder.Ascending ? 'asc' : 'desc'
    const includeLabels = labelFilters.filter(
      (filter) => filter.type === LabelFilterType.INCLUDE
    )
    const excludeLabels = labelFilters.filter(
      (filter) => filter.type === LabelFilterType.EXCLUDE
    )

    const body: SearchBody = {
      query: {
        bool: {
          filter: [
            {
              term: {
                userId,
              },
            },
          ],
          should: [],
          must_not: [],
        },
      },
      sort: [
        {
          savedAt: {
            order: sortOrder,
            format: 'strict_date_optional_time_nanos',
          },
        },
        {
          createdAt: {
            order: sortOrder,
            format: 'strict_date_optional_time_nanos',
          },
        },
      ],
      from,
      size,
    }

    // append filters
    if (query) {
      appendQuery(body, query)
    }
    if (typeFilter) {
      appendTypeFilter(body, typeFilter)
    }
    if (inFilter !== InFilter.ALL) {
      appendInFilter(body, inFilter)
    }
    if (readFilter !== ReadFilter.ALL) {
      appendReadFilter(body, readFilter)
    }
    if (notNullField) {
      appendNotNullField(body, notNullField)
    }
    if (includeLabels.length > 0) {
      appendIncludeLabelFilter(body, includeLabels)
    }
    if (excludeLabels.length > 0) {
      appendExcludeLabelFilter(body, excludeLabels)
    }

    const response = await client.search<SearchResponse<Page>, SearchBody>({
      index: INDEX_NAME,
      body,
    })

    if (response.body.hits.total.value === 0) {
      return [[], 0]
    }

    return [
      response.body.hits.hits.map((hit: { _source: Page; _id: string }) => ({
        ...hit._source,
        id: hit._id,
      })),
      response.body.hits.total.value,
    ]
  } catch (e) {
    console.error('failed to search pages in elastic', e)
    return undefined
  }
}

export const initElasticsearch = async (): Promise<void> => {
  try {
    const response = await client.info()
    console.log('elastic info: ', response)

    // check if index exists
    const { body: indexExists } = await client.indices.exists({
      index: INDEX_NAME,
    })
    if (!indexExists) {
      console.log('ingesting index...')
      await ingest()

      await client.indices.refresh({ index: INDEX_NAME })
    }
    console.log('elastic client is ready')
  } catch (e) {
    console.error('failed to init elasticsearch', e)
    throw e
  }
}
