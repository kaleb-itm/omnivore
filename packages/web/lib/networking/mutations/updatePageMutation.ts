import { gql } from 'graphql-request'
import { gqlFetcher } from '../networkHelpers'
import { State } from '../fragments/articleFragment'

export type UpdatePageInput = {
  pageId: string
  title?: string
  byline?: string | undefined
  description?: string
  savedAt?: string
  publishedAt?: string
  state?: State
}

export async function updatePageMutation(
  input: UpdatePageInput
): Promise<string | undefined> {
  const mutation = gql`
    mutation UpdatePage($input: UpdatePageInput!) {
      updatePage(input: $input) {
        ... on UpdatePageSuccess {
          updatedPage {
            id
            title
            url
            createdAt
            author
            image
            description
            savedAt
            publishedAt
          }
        }
        ... on UpdatePageError {
          errorCodes
        }
      }
    }
  `

  try {
    const data = await gqlFetcher(mutation, {
      input,
    })
    const output = data as any
    return output.updatePage
  } catch (err) {
    return undefined
  }
}
