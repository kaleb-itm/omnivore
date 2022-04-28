/* eslint-disable prefer-const */
import {
  ArticleSavingRequestError,
  ArticleSavingRequestErrorCode,
  ArticleSavingRequestSuccess,
  CreateArticleSavingRequestError,
  CreateArticleSavingRequestSuccess,
  MutationCreateArticleSavingRequestArgs,
  QueryArticleSavingRequestArgs,
} from '../../generated/graphql'
import {
  articleSavingRequestDataToArticleSavingRequest,
  authorized,
} from '../../utils/helpers'
import { createPageSaveRequest } from '../../services/create_page_save_request'
import { createIntercomEvent } from '../../utils/intercom'

export const createArticleSavingRequestResolver = authorized<
  CreateArticleSavingRequestSuccess,
  CreateArticleSavingRequestError,
  MutationCreateArticleSavingRequestArgs
>(async (_, { input: { url } }, { models, claims, pubsub }) => {
  await createIntercomEvent('link-save-request', claims.uid)
  const request = await createPageSaveRequest(claims.uid, url, models, pubsub)
  return {
    articleSavingRequest: request,
  }
})

export const articleSavingRequestResolver = authorized<
  ArticleSavingRequestSuccess,
  ArticleSavingRequestError,
  QueryArticleSavingRequestArgs
>(async (_, { id }, { models }) => {
  let articleSavingRequest
  let user
  try {
    articleSavingRequest = await models.articleSavingRequest.get(id)
    user = await models.user.get(articleSavingRequest.userId)
    // eslint-disable-next-line no-empty
  } catch (error) {}
  if (user && articleSavingRequest)
    return {
      articleSavingRequest: articleSavingRequestDataToArticleSavingRequest(
        user,
        articleSavingRequest
      ),
    }

  return { errorCodes: [ArticleSavingRequestErrorCode.NotFound] }
})
