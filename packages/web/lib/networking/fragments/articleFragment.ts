import { gql } from 'graphql-request'

export const articleFragment = gql`
  fragment ArticleFields on Article {
    id
    title
    url
    author
    image
    savedAt
    createdAt
    publishedAt
    contentReader
    originalArticleUrl
    readingProgressPercent
    readingProgressAnchorIndex
    slug
    isArchived
    description
    linkId
    state
  }
`

export type ContentReader = 'WEB' | 'PDF'

export type ArticleFragmentData = {
  id: string
  title: string
  url: string
  author?: string
  image?: string
  savedAt: string
  createdAt: string
  publishedAt?: string
  contentReader?: ContentReader
  originalArticleUrl: string
  readingProgressPercent: number
  readingProgressAnchorIndex: number
  slug: string
  isArchived: boolean
  description: string
  linkId?: string
  state?: string
}
