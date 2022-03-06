import { PubsubClient } from '../datalayer/pubsub'
import { homePageURL } from '../env'
import {
  ArticleSavingRequestStatus,
  Maybe,
  SavePageInput,
  SaveResult,
} from '../generated/graphql'
import { DataModels } from '../resolvers/types'
import { generateSlug, stringToHash, validatedDate } from '../utils/helpers'
import { parseOriginalContent, parsePreparedContent } from '../utils/parser'

import normalizeUrl from 'normalize-url'
import { createPageSaveRequest } from './create_page_save_request'
import { kx } from '../datalayer/knex_config'
import { setClaims } from '../datalayer/helpers'
import { createPage, getPageByUrl, Page, updatePage } from '../elastic'

type SaveContext = {
  pubsub: PubsubClient
  models: DataModels
}

type SaverUserData = {
  userId: string
  username: string
}

// where we can use APIs to fetch their underlying content.
const FORCE_PUPPETEER_URLS = [
  // twitter status url regex
  /twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?/,
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/,
]

const createSlug = (url: string, title?: Maybe<string> | undefined) => {
  const { pathname } = new URL(url)
  const croppedPathname = decodeURIComponent(
    pathname
      .split('/')
      [pathname.split('/').length - 1].split('.')
      .slice(0, -1)
      .join('.')
  ).replace(/_/gi, ' ')

  return [generateSlug(title || croppedPathname), croppedPathname]
}

const shouldParseInBackend = (input: SavePageInput): boolean => {
  return (
    input.source !== 'puppeteer-parse' &&
    FORCE_PUPPETEER_URLS.some((regex) => regex.test(input.url))
  )
}

export const createSavingRequest = (
  ctx: SaveContext,
  userId: string,
  clientRequestId: string
) => {
  return ctx.models.articleSavingRequest.create({
    userId: userId,
    id: clientRequestId,
  })
}

export const savePage = async (
  ctx: SaveContext,
  saver: SaverUserData,
  input: SavePageInput
): Promise<SaveResult> => {
  const savingRequest = await createSavingRequest(
    ctx,
    saver.userId,
    input.clientRequestId
  )

  const [slug, croppedPathname] = createSlug(input.url, input.title)
  const parseResult = await parsePreparedContent(input.url, {
    document: input.originalContent,
    pageInfo: {
      title: input.title,
      canonicalUrl: input.url,
    },
  })

  const pageType = parseOriginalContent(input.url, input.originalContent)

  const articleToSave: Page = {
    id: '',
    slug,
    userId: saver.userId,
    originalHtml: parseResult.domContent,
    content: parseResult.parsedContent?.content || '',
    description: parseResult.parsedContent?.excerpt,
    title: parseResult.parsedContent?.title || input.title || croppedPathname,
    author: parseResult.parsedContent?.byline,
    url: normalizeUrl(parseResult.canonicalUrl || input.url, {
      stripHash: true,
      stripWWW: false,
    }),
    pageType: pageType,
    hash: stringToHash(parseResult.parsedContent?.content || input.url),
    image: parseResult.parsedContent?.previewImage,
    publishedAt: validatedDate(parseResult.parsedContent?.publishedDate),
    createdAt: new Date(),
  }

  if (parseResult.canonicalUrl && parseResult.domContent) {
    await ctx.pubsub.pageSaved(
      saver.userId,
      parseResult.canonicalUrl,
      parseResult.domContent
    )
  }

  const existingPage = await getPageByUrl(saver.userId, articleToSave.url)
  if (existingPage) {
    await ctx.pubsub.pageCreated(saver.userId, input.url, input.originalContent)

    await updatePage(existingPage.id, {
      savedAt: new Date(),
      archivedAt: undefined,
    })
    await kx.transaction(async (tx) => {
      await setClaims(tx, saver.userId)
      await ctx.models.articleSavingRequest.update(
        savingRequest.id,
        {
          articleId: existingPage.id,
          status: ArticleSavingRequestStatus.Succeeded,
        },
        tx
      )
    })
  } else if (shouldParseInBackend(input)) {
    await createPageSaveRequest(saver.userId, input.url, ctx.models)
  } else {
    await ctx.pubsub.pageCreated(saver.userId, input.url, input.originalContent)

    const pageId = await createPage(articleToSave)

    await kx.transaction(async (tx) => {
      await setClaims(tx, saver.userId)
      await ctx.models.articleSavingRequest.update(
        savingRequest.id,
        {
          articleId: pageId,
          status: ArticleSavingRequestStatus.Succeeded,
        },
        tx
      )
    })
  }

  return {
    clientRequestId: input.clientRequestId,
    url: `${homePageURL()}/${saver.username}/${slug}`,
  }
}
