import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { ResolverContext } from '../resolvers/types'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type AddPopularReadError = {
  __typename?: 'AddPopularReadError'
  errorCodes: Array<AddPopularReadErrorCode>
}

export enum AddPopularReadErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type AddPopularReadResult = AddPopularReadError | AddPopularReadSuccess

export type AddPopularReadSuccess = {
  __typename?: 'AddPopularReadSuccess'
  pageId: Scalars['String']
}

export type ApiKey = {
  __typename?: 'ApiKey'
  createdAt: Scalars['Date']
  expiresAt: Scalars['Date']
  id: Scalars['ID']
  key?: Maybe<Scalars['String']>
  name: Scalars['String']
  scopes?: Maybe<Array<Scalars['String']>>
  usedAt?: Maybe<Scalars['Date']>
}

export type ApiKeysError = {
  __typename?: 'ApiKeysError'
  errorCodes: Array<ApiKeysErrorCode>
}

export enum ApiKeysErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type ApiKeysResult = ApiKeysError | ApiKeysSuccess

export type ApiKeysSuccess = {
  __typename?: 'ApiKeysSuccess'
  apiKeys: Array<ApiKey>
}

export type ArchiveLinkError = {
  __typename?: 'ArchiveLinkError'
  errorCodes: Array<ArchiveLinkErrorCode>
  message: Scalars['String']
}

export enum ArchiveLinkErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type ArchiveLinkInput = {
  archived: Scalars['Boolean']
  linkId: Scalars['ID']
}

export type ArchiveLinkResult = ArchiveLinkError | ArchiveLinkSuccess

export type ArchiveLinkSuccess = {
  __typename?: 'ArchiveLinkSuccess'
  linkId: Scalars['String']
  message: Scalars['String']
}

export type Article = {
  __typename?: 'Article'
  author?: Maybe<Scalars['String']>
  content: Scalars['String']
  contentReader: ContentReader
  createdAt: Scalars['Date']
  description?: Maybe<Scalars['String']>
  hasContent?: Maybe<Scalars['Boolean']>
  hash: Scalars['String']
  highlights: Array<Highlight>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  isArchived: Scalars['Boolean']
  labels?: Maybe<Array<Label>>
  language?: Maybe<Scalars['String']>
  linkId?: Maybe<Scalars['ID']>
  originalArticleUrl?: Maybe<Scalars['String']>
  originalHtml?: Maybe<Scalars['String']>
  pageType?: Maybe<PageType>
  postedByViewer?: Maybe<Scalars['Boolean']>
  publishedAt?: Maybe<Scalars['Date']>
  readAt?: Maybe<Scalars['Date']>
  readingProgressAnchorIndex: Scalars['Int']
  readingProgressPercent: Scalars['Float']
  savedAt: Scalars['Date']
  savedByViewer?: Maybe<Scalars['Boolean']>
  shareInfo?: Maybe<LinkShareInfo>
  sharedComment?: Maybe<Scalars['String']>
  siteIcon?: Maybe<Scalars['String']>
  siteName?: Maybe<Scalars['String']>
  slug: Scalars['String']
  state?: Maybe<ArticleSavingRequestStatus>
  subscription?: Maybe<Scalars['String']>
  title: Scalars['String']
  unsubHttpUrl?: Maybe<Scalars['String']>
  unsubMailTo?: Maybe<Scalars['String']>
  updatedAt: Scalars['Date']
  uploadFileId?: Maybe<Scalars['ID']>
  url: Scalars['String']
}

export type ArticleHighlightsArgs = {
  input?: InputMaybe<ArticleHighlightsInput>
}

export type ArticleEdge = {
  __typename?: 'ArticleEdge'
  cursor: Scalars['String']
  node: Article
}

export type ArticleError = {
  __typename?: 'ArticleError'
  errorCodes: Array<ArticleErrorCode>
}

export enum ArticleErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type ArticleHighlightsInput = {
  includeFriends?: InputMaybe<Scalars['Boolean']>
}

export type ArticleResult = ArticleError | ArticleSuccess

export type ArticleSavingRequest = {
  __typename?: 'ArticleSavingRequest'
  /** @deprecated article has been replaced with slug */
  article?: Maybe<Article>
  createdAt: Scalars['Date']
  errorCode?: Maybe<CreateArticleErrorCode>
  id: Scalars['ID']
  slug: Scalars['String']
  status: ArticleSavingRequestStatus
  updatedAt: Scalars['Date']
  user: User
  /** @deprecated userId has been replaced with user */
  userId: Scalars['ID']
}

export type ArticleSavingRequestError = {
  __typename?: 'ArticleSavingRequestError'
  errorCodes: Array<ArticleSavingRequestErrorCode>
}

export enum ArticleSavingRequestErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type ArticleSavingRequestResult =
  | ArticleSavingRequestError
  | ArticleSavingRequestSuccess

export enum ArticleSavingRequestStatus {
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Processing = 'PROCESSING',
  Succeeded = 'SUCCEEDED',
}

export type ArticleSavingRequestSuccess = {
  __typename?: 'ArticleSavingRequestSuccess'
  articleSavingRequest: ArticleSavingRequest
}

export type ArticleSuccess = {
  __typename?: 'ArticleSuccess'
  article: Article
}

export type ArticlesError = {
  __typename?: 'ArticlesError'
  errorCodes: Array<ArticlesErrorCode>
}

export enum ArticlesErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type ArticlesResult = ArticlesError | ArticlesSuccess

export type ArticlesSuccess = {
  __typename?: 'ArticlesSuccess'
  edges: Array<ArticleEdge>
  pageInfo: PageInfo
}

export enum ContentReader {
  Pdf = 'PDF',
  Web = 'WEB',
}

export type CreateArticleError = {
  __typename?: 'CreateArticleError'
  errorCodes: Array<CreateArticleErrorCode>
}

export enum CreateArticleErrorCode {
  ElasticError = 'ELASTIC_ERROR',
  NotAllowedToParse = 'NOT_ALLOWED_TO_PARSE',
  PayloadTooLarge = 'PAYLOAD_TOO_LARGE',
  UnableToFetch = 'UNABLE_TO_FETCH',
  UnableToParse = 'UNABLE_TO_PARSE',
  Unauthorized = 'UNAUTHORIZED',
  UploadFileMissing = 'UPLOAD_FILE_MISSING',
}

export type CreateArticleInput = {
  articleSavingRequestId?: InputMaybe<Scalars['ID']>
  preparedDocument?: InputMaybe<PreparedDocumentInput>
  skipParsing?: InputMaybe<Scalars['Boolean']>
  source?: InputMaybe<Scalars['String']>
  uploadFileId?: InputMaybe<Scalars['ID']>
  url: Scalars['String']
}

export type CreateArticleResult = CreateArticleError | CreateArticleSuccess

export type CreateArticleSavingRequestError = {
  __typename?: 'CreateArticleSavingRequestError'
  errorCodes: Array<CreateArticleSavingRequestErrorCode>
}

export enum CreateArticleSavingRequestErrorCode {
  BadData = 'BAD_DATA',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateArticleSavingRequestInput = {
  url: Scalars['String']
}

export type CreateArticleSavingRequestResult =
  | CreateArticleSavingRequestError
  | CreateArticleSavingRequestSuccess

export type CreateArticleSavingRequestSuccess = {
  __typename?: 'CreateArticleSavingRequestSuccess'
  articleSavingRequest: ArticleSavingRequest
}

export type CreateArticleSuccess = {
  __typename?: 'CreateArticleSuccess'
  created: Scalars['Boolean']
  createdArticle: Article
  user: User
}

export type CreateHighlightError = {
  __typename?: 'CreateHighlightError'
  errorCodes: Array<CreateHighlightErrorCode>
}

export enum CreateHighlightErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateHighlightInput = {
  annotation?: InputMaybe<Scalars['String']>
  articleId: Scalars['ID']
  id: Scalars['ID']
  patch: Scalars['String']
  prefix?: InputMaybe<Scalars['String']>
  quote: Scalars['String']
  sharedAt?: InputMaybe<Scalars['Date']>
  shortId: Scalars['String']
  suffix?: InputMaybe<Scalars['String']>
}

export type CreateHighlightReplyError = {
  __typename?: 'CreateHighlightReplyError'
  errorCodes: Array<CreateHighlightReplyErrorCode>
}

export enum CreateHighlightReplyErrorCode {
  EmptyAnnotation = 'EMPTY_ANNOTATION',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateHighlightReplyInput = {
  highlightId: Scalars['ID']
  text: Scalars['String']
}

export type CreateHighlightReplyResult =
  | CreateHighlightReplyError
  | CreateHighlightReplySuccess

export type CreateHighlightReplySuccess = {
  __typename?: 'CreateHighlightReplySuccess'
  highlightReply: HighlightReply
}

export type CreateHighlightResult =
  | CreateHighlightError
  | CreateHighlightSuccess

export type CreateHighlightSuccess = {
  __typename?: 'CreateHighlightSuccess'
  highlight: Highlight
}

export type CreateLabelError = {
  __typename?: 'CreateLabelError'
  errorCodes: Array<CreateLabelErrorCode>
}

export enum CreateLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  LabelAlreadyExists = 'LABEL_ALREADY_EXISTS',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateLabelInput = {
  color: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type CreateLabelResult = CreateLabelError | CreateLabelSuccess

export type CreateLabelSuccess = {
  __typename?: 'CreateLabelSuccess'
  label: Label
}

export type CreateNewsletterEmailError = {
  __typename?: 'CreateNewsletterEmailError'
  errorCodes: Array<CreateNewsletterEmailErrorCode>
}

export enum CreateNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateNewsletterEmailResult =
  | CreateNewsletterEmailError
  | CreateNewsletterEmailSuccess

export type CreateNewsletterEmailSuccess = {
  __typename?: 'CreateNewsletterEmailSuccess'
  newsletterEmail: NewsletterEmail
}

export type CreateReactionError = {
  __typename?: 'CreateReactionError'
  errorCodes: Array<CreateReactionErrorCode>
}

export enum CreateReactionErrorCode {
  BadCode = 'BAD_CODE',
  BadTarget = 'BAD_TARGET',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateReactionInput = {
  code: ReactionType
  highlightId?: InputMaybe<Scalars['ID']>
  userArticleId?: InputMaybe<Scalars['ID']>
}

export type CreateReactionResult = CreateReactionError | CreateReactionSuccess

export type CreateReactionSuccess = {
  __typename?: 'CreateReactionSuccess'
  reaction: Reaction
}

export type CreateReminderError = {
  __typename?: 'CreateReminderError'
  errorCodes: Array<CreateReminderErrorCode>
}

export enum CreateReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type CreateReminderInput = {
  archiveUntil: Scalars['Boolean']
  clientRequestId?: InputMaybe<Scalars['ID']>
  linkId?: InputMaybe<Scalars['ID']>
  remindAt: Scalars['Date']
  sendNotification: Scalars['Boolean']
}

export type CreateReminderResult = CreateReminderError | CreateReminderSuccess

export type CreateReminderSuccess = {
  __typename?: 'CreateReminderSuccess'
  reminder: Reminder
}

export type DeleteAccountError = {
  __typename?: 'DeleteAccountError'
  errorCodes: Array<DeleteAccountErrorCode>
}

export enum DeleteAccountErrorCode {
  Forbidden = 'FORBIDDEN',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND',
}

export type DeleteAccountResult = DeleteAccountError | DeleteAccountSuccess

export type DeleteAccountSuccess = {
  __typename?: 'DeleteAccountSuccess'
  userID: Scalars['ID']
}

export type DeleteHighlightError = {
  __typename?: 'DeleteHighlightError'
  errorCodes: Array<DeleteHighlightErrorCode>
}

export enum DeleteHighlightErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteHighlightReplyError = {
  __typename?: 'DeleteHighlightReplyError'
  errorCodes: Array<DeleteHighlightReplyErrorCode>
}

export enum DeleteHighlightReplyErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteHighlightReplyResult =
  | DeleteHighlightReplyError
  | DeleteHighlightReplySuccess

export type DeleteHighlightReplySuccess = {
  __typename?: 'DeleteHighlightReplySuccess'
  highlightReply: HighlightReply
}

export type DeleteHighlightResult =
  | DeleteHighlightError
  | DeleteHighlightSuccess

export type DeleteHighlightSuccess = {
  __typename?: 'DeleteHighlightSuccess'
  highlight: Highlight
}

export type DeleteIntegrationError = {
  __typename?: 'DeleteIntegrationError'
  errorCodes: Array<DeleteIntegrationErrorCode>
}

export enum DeleteIntegrationErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteIntegrationResult =
  | DeleteIntegrationError
  | DeleteIntegrationSuccess

export type DeleteIntegrationSuccess = {
  __typename?: 'DeleteIntegrationSuccess'
  integration: Integration
}

export type DeleteLabelError = {
  __typename?: 'DeleteLabelError'
  errorCodes: Array<DeleteLabelErrorCode>
}

export enum DeleteLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteLabelResult = DeleteLabelError | DeleteLabelSuccess

export type DeleteLabelSuccess = {
  __typename?: 'DeleteLabelSuccess'
  label: Label
}

export type DeleteNewsletterEmailError = {
  __typename?: 'DeleteNewsletterEmailError'
  errorCodes: Array<DeleteNewsletterEmailErrorCode>
}

export enum DeleteNewsletterEmailErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteNewsletterEmailResult =
  | DeleteNewsletterEmailError
  | DeleteNewsletterEmailSuccess

export type DeleteNewsletterEmailSuccess = {
  __typename?: 'DeleteNewsletterEmailSuccess'
  newsletterEmail: NewsletterEmail
}

export type DeleteReactionError = {
  __typename?: 'DeleteReactionError'
  errorCodes: Array<DeleteReactionErrorCode>
}

export enum DeleteReactionErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteReactionResult = DeleteReactionError | DeleteReactionSuccess

export type DeleteReactionSuccess = {
  __typename?: 'DeleteReactionSuccess'
  reaction: Reaction
}

export type DeleteReminderError = {
  __typename?: 'DeleteReminderError'
  errorCodes: Array<DeleteReminderErrorCode>
}

export enum DeleteReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteReminderResult = DeleteReminderError | DeleteReminderSuccess

export type DeleteReminderSuccess = {
  __typename?: 'DeleteReminderSuccess'
  reminder: Reminder
}

export type DeleteWebhookError = {
  __typename?: 'DeleteWebhookError'
  errorCodes: Array<DeleteWebhookErrorCode>
}

export enum DeleteWebhookErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type DeleteWebhookResult = DeleteWebhookError | DeleteWebhookSuccess

export type DeleteWebhookSuccess = {
  __typename?: 'DeleteWebhookSuccess'
  webhook: Webhook
}

export type DeviceToken = {
  __typename?: 'DeviceToken'
  createdAt: Scalars['Date']
  id: Scalars['ID']
  token: Scalars['String']
}

export type FeedArticle = {
  __typename?: 'FeedArticle'
  annotationsCount?: Maybe<Scalars['Int']>
  article: Article
  highlight?: Maybe<Highlight>
  highlightsCount?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  reactions: Array<Reaction>
  sharedAt: Scalars['Date']
  sharedBy: User
  sharedComment?: Maybe<Scalars['String']>
  sharedWithHighlights?: Maybe<Scalars['Boolean']>
}

export type FeedArticleEdge = {
  __typename?: 'FeedArticleEdge'
  cursor: Scalars['String']
  node: FeedArticle
}

export type FeedArticlesError = {
  __typename?: 'FeedArticlesError'
  errorCodes: Array<FeedArticlesErrorCode>
}

export enum FeedArticlesErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type FeedArticlesResult = FeedArticlesError | FeedArticlesSuccess

export type FeedArticlesSuccess = {
  __typename?: 'FeedArticlesSuccess'
  edges: Array<FeedArticleEdge>
  pageInfo: PageInfo
}

export type GenerateApiKeyError = {
  __typename?: 'GenerateApiKeyError'
  errorCodes: Array<GenerateApiKeyErrorCode>
}

export enum GenerateApiKeyErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type GenerateApiKeyInput = {
  expiresAt: Scalars['Date']
  name: Scalars['String']
  scopes?: InputMaybe<Array<Scalars['String']>>
}

export type GenerateApiKeyResult = GenerateApiKeyError | GenerateApiKeySuccess

export type GenerateApiKeySuccess = {
  __typename?: 'GenerateApiKeySuccess'
  apiKey: ApiKey
}

export type GetFollowersError = {
  __typename?: 'GetFollowersError'
  errorCodes: Array<GetFollowersErrorCode>
}

export enum GetFollowersErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type GetFollowersResult = GetFollowersError | GetFollowersSuccess

export type GetFollowersSuccess = {
  __typename?: 'GetFollowersSuccess'
  followers: Array<User>
}

export type GetFollowingError = {
  __typename?: 'GetFollowingError'
  errorCodes: Array<GetFollowingErrorCode>
}

export enum GetFollowingErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type GetFollowingResult = GetFollowingError | GetFollowingSuccess

export type GetFollowingSuccess = {
  __typename?: 'GetFollowingSuccess'
  following: Array<User>
}

export type GetUserPersonalizationError = {
  __typename?: 'GetUserPersonalizationError'
  errorCodes: Array<GetUserPersonalizationErrorCode>
}

export enum GetUserPersonalizationErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type GetUserPersonalizationResult =
  | GetUserPersonalizationError
  | GetUserPersonalizationSuccess

export type GetUserPersonalizationSuccess = {
  __typename?: 'GetUserPersonalizationSuccess'
  userPersonalization?: Maybe<UserPersonalization>
}

export type GoogleLoginInput = {
  email: Scalars['String']
  secret: Scalars['String']
}

export type GoogleSignupError = {
  __typename?: 'GoogleSignupError'
  errorCodes: Array<Maybe<SignupErrorCode>>
}

export type GoogleSignupInput = {
  bio?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  name: Scalars['String']
  pictureUrl: Scalars['String']
  secret: Scalars['String']
  sourceUserId: Scalars['String']
  username: Scalars['String']
}

export type GoogleSignupResult = GoogleSignupError | GoogleSignupSuccess

export type GoogleSignupSuccess = {
  __typename?: 'GoogleSignupSuccess'
  me: User
}

export type Highlight = {
  __typename?: 'Highlight'
  annotation?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  createdByMe: Scalars['Boolean']
  id: Scalars['ID']
  patch: Scalars['String']
  prefix?: Maybe<Scalars['String']>
  quote: Scalars['String']
  reactions: Array<Reaction>
  replies: Array<HighlightReply>
  sharedAt?: Maybe<Scalars['Date']>
  shortId: Scalars['String']
  suffix?: Maybe<Scalars['String']>
  updatedAt: Scalars['Date']
  user: User
}

export type HighlightReply = {
  __typename?: 'HighlightReply'
  createdAt: Scalars['Date']
  highlight: Highlight
  id: Scalars['ID']
  text: Scalars['String']
  updatedAt: Scalars['Date']
  user: User
}

export type HighlightStats = {
  __typename?: 'HighlightStats'
  highlightCount: Scalars['Int']
}

export type Integration = {
  __typename?: 'Integration'
  createdAt: Scalars['Date']
  enabled: Scalars['Boolean']
  id: Scalars['ID']
  token: Scalars['String']
  type: IntegrationType
  updatedAt: Scalars['Date']
}

export enum IntegrationType {
  Readwise = 'READWISE',
}

export type IntegrationsError = {
  __typename?: 'IntegrationsError'
  errorCodes: Array<IntegrationsErrorCode>
}

export enum IntegrationsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type IntegrationsResult = IntegrationsError | IntegrationsSuccess

export type IntegrationsSuccess = {
  __typename?: 'IntegrationsSuccess'
  integrations: Array<Integration>
}

export type Label = {
  __typename?: 'Label'
  color: Scalars['String']
  createdAt?: Maybe<Scalars['Date']>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  position?: Maybe<Scalars['Int']>
}

export type LabelsError = {
  __typename?: 'LabelsError'
  errorCodes: Array<LabelsErrorCode>
}

export enum LabelsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type LabelsResult = LabelsError | LabelsSuccess

export type LabelsSuccess = {
  __typename?: 'LabelsSuccess'
  labels: Array<Label>
}

export type Link = {
  __typename?: 'Link'
  highlightStats: HighlightStats
  id: Scalars['ID']
  page: Page
  postedByViewer: Scalars['Boolean']
  readState: ReadState
  savedAt: Scalars['Date']
  savedBy: User
  savedByViewer: Scalars['Boolean']
  shareInfo: LinkShareInfo
  shareStats: ShareStats
  slug: Scalars['String']
  updatedAt: Scalars['Date']
  url: Scalars['String']
}

export type LinkShareInfo = {
  __typename?: 'LinkShareInfo'
  description: Scalars['String']
  imageUrl: Scalars['String']
  title: Scalars['String']
}

export type LogOutError = {
  __typename?: 'LogOutError'
  errorCodes: Array<LogOutErrorCode>
}

export enum LogOutErrorCode {
  LogOutFailed = 'LOG_OUT_FAILED',
}

export type LogOutResult = LogOutError | LogOutSuccess

export type LogOutSuccess = {
  __typename?: 'LogOutSuccess'
  message?: Maybe<Scalars['String']>
}

export type LoginError = {
  __typename?: 'LoginError'
  errorCodes: Array<LoginErrorCode>
}

export enum LoginErrorCode {
  AccessDenied = 'ACCESS_DENIED',
  AuthFailed = 'AUTH_FAILED',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  WrongSource = 'WRONG_SOURCE',
}

export type LoginResult = LoginError | LoginSuccess

export type LoginSuccess = {
  __typename?: 'LoginSuccess'
  me: User
}

export type MergeHighlightError = {
  __typename?: 'MergeHighlightError'
  errorCodes: Array<MergeHighlightErrorCode>
}

export enum MergeHighlightErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type MergeHighlightInput = {
  annotation?: InputMaybe<Scalars['String']>
  articleId: Scalars['ID']
  id: Scalars['ID']
  overlapHighlightIdList: Array<Scalars['String']>
  patch: Scalars['String']
  prefix?: InputMaybe<Scalars['String']>
  quote: Scalars['String']
  shortId: Scalars['ID']
  suffix?: InputMaybe<Scalars['String']>
}

export type MergeHighlightResult = MergeHighlightError | MergeHighlightSuccess

export type MergeHighlightSuccess = {
  __typename?: 'MergeHighlightSuccess'
  highlight: Highlight
  overlapHighlightIdList: Array<Scalars['String']>
}

export type MoveLabelError = {
  __typename?: 'MoveLabelError'
  errorCodes: Array<MoveLabelErrorCode>
}

export enum MoveLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type MoveLabelInput = {
  afterLabelId?: InputMaybe<Scalars['ID']>
  labelId: Scalars['ID']
}

export type MoveLabelResult = MoveLabelError | MoveLabelSuccess

export type MoveLabelSuccess = {
  __typename?: 'MoveLabelSuccess'
  label: Label
}

export type Mutation = {
  __typename?: 'Mutation'
  addPopularRead: AddPopularReadResult
  createArticle: CreateArticleResult
  createArticleSavingRequest: CreateArticleSavingRequestResult
  createHighlight: CreateHighlightResult
  createHighlightReply: CreateHighlightReplyResult
  createLabel: CreateLabelResult
  createNewsletterEmail: CreateNewsletterEmailResult
  createReaction: CreateReactionResult
  createReminder: CreateReminderResult
  deleteAccount: DeleteAccountResult
  deleteHighlight: DeleteHighlightResult
  deleteHighlightReply: DeleteHighlightReplyResult
  deleteIntegration: DeleteIntegrationResult
  deleteLabel: DeleteLabelResult
  deleteNewsletterEmail: DeleteNewsletterEmailResult
  deleteReaction: DeleteReactionResult
  deleteReminder: DeleteReminderResult
  deleteWebhook: DeleteWebhookResult
  generateApiKey: GenerateApiKeyResult
  googleLogin: LoginResult
  googleSignup: GoogleSignupResult
  logOut: LogOutResult
  mergeHighlight: MergeHighlightResult
  moveLabel: MoveLabelResult
  reportItem: ReportItemResult
  revokeApiKey: RevokeApiKeyResult
  saveArticleReadingProgress: SaveArticleReadingProgressResult
  saveFile: SaveResult
  savePage: SaveResult
  saveUrl: SaveResult
  setBookmarkArticle: SetBookmarkArticleResult
  setDeviceToken: SetDeviceTokenResult
  setFollow: SetFollowResult
  setIntegration: SetIntegrationResult
  setLabels: SetLabelsResult
  setLabelsForHighlight: SetLabelsResult
  setLinkArchived: ArchiveLinkResult
  setShareArticle: SetShareArticleResult
  setShareHighlight: SetShareHighlightResult
  setUserPersonalization: SetUserPersonalizationResult
  setWebhook: SetWebhookResult
  subscribe: SubscribeResult
  unsubscribe: UnsubscribeResult
  updateHighlight: UpdateHighlightResult
  updateHighlightReply: UpdateHighlightReplyResult
  updateLabel: UpdateLabelResult
  updateLinkShareInfo: UpdateLinkShareInfoResult
  updatePage: UpdatePageResult
  updateReminder: UpdateReminderResult
  updateSharedComment: UpdateSharedCommentResult
  updateUser: UpdateUserResult
  updateUserProfile: UpdateUserProfileResult
  uploadFileRequest: UploadFileRequestResult
}

export type MutationAddPopularReadArgs = {
  name: Scalars['String']
}

export type MutationCreateArticleArgs = {
  input: CreateArticleInput
}

export type MutationCreateArticleSavingRequestArgs = {
  input: CreateArticleSavingRequestInput
}

export type MutationCreateHighlightArgs = {
  input: CreateHighlightInput
}

export type MutationCreateHighlightReplyArgs = {
  input: CreateHighlightReplyInput
}

export type MutationCreateLabelArgs = {
  input: CreateLabelInput
}

export type MutationCreateReactionArgs = {
  input: CreateReactionInput
}

export type MutationCreateReminderArgs = {
  input: CreateReminderInput
}

export type MutationDeleteAccountArgs = {
  userID: Scalars['ID']
}

export type MutationDeleteHighlightArgs = {
  highlightId: Scalars['ID']
}

export type MutationDeleteHighlightReplyArgs = {
  highlightReplyId: Scalars['ID']
}

export type MutationDeleteIntegrationArgs = {
  id: Scalars['ID']
}

export type MutationDeleteLabelArgs = {
  id: Scalars['ID']
}

export type MutationDeleteNewsletterEmailArgs = {
  newsletterEmailId: Scalars['ID']
}

export type MutationDeleteReactionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteReminderArgs = {
  id: Scalars['ID']
}

export type MutationDeleteWebhookArgs = {
  id: Scalars['ID']
}

export type MutationGenerateApiKeyArgs = {
  input: GenerateApiKeyInput
}

export type MutationGoogleLoginArgs = {
  input: GoogleLoginInput
}

export type MutationGoogleSignupArgs = {
  input: GoogleSignupInput
}

export type MutationMergeHighlightArgs = {
  input: MergeHighlightInput
}

export type MutationMoveLabelArgs = {
  input: MoveLabelInput
}

export type MutationReportItemArgs = {
  input: ReportItemInput
}

export type MutationRevokeApiKeyArgs = {
  id: Scalars['ID']
}

export type MutationSaveArticleReadingProgressArgs = {
  input: SaveArticleReadingProgressInput
}

export type MutationSaveFileArgs = {
  input: SaveFileInput
}

export type MutationSavePageArgs = {
  input: SavePageInput
}

export type MutationSaveUrlArgs = {
  input: SaveUrlInput
}

export type MutationSetBookmarkArticleArgs = {
  input: SetBookmarkArticleInput
}

export type MutationSetDeviceTokenArgs = {
  input: SetDeviceTokenInput
}

export type MutationSetFollowArgs = {
  input: SetFollowInput
}

export type MutationSetIntegrationArgs = {
  input: SetIntegrationInput
}

export type MutationSetLabelsArgs = {
  input: SetLabelsInput
}

export type MutationSetLabelsForHighlightArgs = {
  input: SetLabelsForHighlightInput
}

export type MutationSetLinkArchivedArgs = {
  input: ArchiveLinkInput
}

export type MutationSetShareArticleArgs = {
  input: SetShareArticleInput
}

export type MutationSetShareHighlightArgs = {
  input: SetShareHighlightInput
}

export type MutationSetUserPersonalizationArgs = {
  input: SetUserPersonalizationInput
}

export type MutationSetWebhookArgs = {
  input: SetWebhookInput
}

export type MutationSubscribeArgs = {
  name: Scalars['String']
}

export type MutationUnsubscribeArgs = {
  name: Scalars['String']
}

export type MutationUpdateHighlightArgs = {
  input: UpdateHighlightInput
}

export type MutationUpdateHighlightReplyArgs = {
  input: UpdateHighlightReplyInput
}

export type MutationUpdateLabelArgs = {
  input: UpdateLabelInput
}

export type MutationUpdateLinkShareInfoArgs = {
  input: UpdateLinkShareInfoInput
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationUpdateReminderArgs = {
  input: UpdateReminderInput
}

export type MutationUpdateSharedCommentArgs = {
  input: UpdateSharedCommentInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput
}

export type MutationUploadFileRequestArgs = {
  input: UploadFileRequestInput
}

export type NewsletterEmail = {
  __typename?: 'NewsletterEmail'
  address: Scalars['String']
  confirmationCode?: Maybe<Scalars['String']>
  id: Scalars['ID']
}

export type NewsletterEmailsError = {
  __typename?: 'NewsletterEmailsError'
  errorCodes: Array<NewsletterEmailsErrorCode>
}

export enum NewsletterEmailsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type NewsletterEmailsResult =
  | NewsletterEmailsError
  | NewsletterEmailsSuccess

export type NewsletterEmailsSuccess = {
  __typename?: 'NewsletterEmailsSuccess'
  newsletterEmails: Array<NewsletterEmail>
}

export type Page = {
  __typename?: 'Page'
  author?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  description?: Maybe<Scalars['String']>
  hash: Scalars['String']
  id: Scalars['ID']
  image: Scalars['String']
  originalHtml: Scalars['String']
  originalUrl: Scalars['String']
  publishedAt?: Maybe<Scalars['Date']>
  readableHtml: Scalars['String']
  title: Scalars['String']
  type: PageType
  updatedAt: Scalars['Date']
  url: Scalars['String']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  totalCount?: Maybe<Scalars['Int']>
}

export type PageInfoInput = {
  author?: InputMaybe<Scalars['String']>
  canonicalUrl?: InputMaybe<Scalars['String']>
  contentType?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  previewImage?: InputMaybe<Scalars['String']>
  publishedAt?: InputMaybe<Scalars['Date']>
  title?: InputMaybe<Scalars['String']>
}

export enum PageType {
  Article = 'ARTICLE',
  Book = 'BOOK',
  File = 'FILE',
  Highlights = 'HIGHLIGHTS',
  Profile = 'PROFILE',
  Unknown = 'UNKNOWN',
  Website = 'WEBSITE',
}

export type PreparedDocumentInput = {
  document: Scalars['String']
  pageInfo: PageInfoInput
}

export type Profile = {
  __typename?: 'Profile'
  bio?: Maybe<Scalars['String']>
  id: Scalars['ID']
  pictureUrl?: Maybe<Scalars['String']>
  private: Scalars['Boolean']
  username: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  apiKeys: ApiKeysResult
  article: ArticleResult
  articleSavingRequest: ArticleSavingRequestResult
  articles: ArticlesResult
  feedArticles: FeedArticlesResult
  getFollowers: GetFollowersResult
  getFollowing: GetFollowingResult
  getUserPersonalization: GetUserPersonalizationResult
  hello?: Maybe<Scalars['String']>
  integrations: IntegrationsResult
  labels: LabelsResult
  me?: Maybe<User>
  newsletterEmails: NewsletterEmailsResult
  reminder: ReminderResult
  search: SearchResult
  sendInstallInstructions: SendInstallInstructionsResult
  sharedArticle: SharedArticleResult
  subscriptions: SubscriptionsResult
  typeaheadSearch: TypeaheadSearchResult
  updatesSince: UpdatesSinceResult
  user: UserResult
  users: UsersResult
  validateUsername: Scalars['Boolean']
  webhook: WebhookResult
  webhooks: WebhooksResult
}

export type QueryArticleArgs = {
  slug: Scalars['String']
  username: Scalars['String']
}

export type QueryArticleSavingRequestArgs = {
  id: Scalars['ID']
}

export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  includePending?: InputMaybe<Scalars['Boolean']>
  query?: InputMaybe<Scalars['String']>
  sharedOnly?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<SortParams>
}

export type QueryFeedArticlesArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  sharedByUser?: InputMaybe<Scalars['ID']>
  sort?: InputMaybe<SortParams>
}

export type QueryGetFollowersArgs = {
  userId?: InputMaybe<Scalars['ID']>
}

export type QueryGetFollowingArgs = {
  userId?: InputMaybe<Scalars['ID']>
}

export type QueryReminderArgs = {
  linkId: Scalars['ID']
}

export type QuerySearchArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  query?: InputMaybe<Scalars['String']>
}

export type QuerySharedArticleArgs = {
  selectedHighlightId?: InputMaybe<Scalars['String']>
  slug: Scalars['String']
  username: Scalars['String']
}

export type QuerySubscriptionsArgs = {
  sort?: InputMaybe<SortParams>
}

export type QueryTypeaheadSearchArgs = {
  first?: InputMaybe<Scalars['Int']>
  query: Scalars['String']
}

export type QueryUpdatesSinceArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  since: Scalars['Date']
}

export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']>
  username?: InputMaybe<Scalars['String']>
}

export type QueryValidateUsernameArgs = {
  username: Scalars['String']
}

export type QueryWebhookArgs = {
  id: Scalars['ID']
}

export type Reaction = {
  __typename?: 'Reaction'
  code: ReactionType
  createdAt: Scalars['Date']
  id: Scalars['ID']
  updatedAt?: Maybe<Scalars['Date']>
  user: User
}

export enum ReactionType {
  Crying = 'CRYING',
  Heart = 'HEART',
  Hushed = 'HUSHED',
  Like = 'LIKE',
  Pout = 'POUT',
  Smile = 'SMILE',
}

export type ReadState = {
  __typename?: 'ReadState'
  progressAnchorIndex: Scalars['Int']
  progressPercent: Scalars['Float']
  reading?: Maybe<Scalars['Boolean']>
  readingTime?: Maybe<Scalars['Int']>
}

export type Reminder = {
  __typename?: 'Reminder'
  archiveUntil: Scalars['Boolean']
  id: Scalars['ID']
  remindAt: Scalars['Date']
  sendNotification: Scalars['Boolean']
}

export type ReminderError = {
  __typename?: 'ReminderError'
  errorCodes: Array<ReminderErrorCode>
}

export enum ReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type ReminderResult = ReminderError | ReminderSuccess

export type ReminderSuccess = {
  __typename?: 'ReminderSuccess'
  reminder: Reminder
}

export type ReportItemInput = {
  itemUrl: Scalars['String']
  pageId: Scalars['ID']
  reportComment: Scalars['String']
  reportTypes: Array<ReportType>
  sharedBy?: InputMaybe<Scalars['ID']>
}

export type ReportItemResult = {
  __typename?: 'ReportItemResult'
  message: Scalars['String']
}

export enum ReportType {
  Abusive = 'ABUSIVE',
  ContentDisplay = 'CONTENT_DISPLAY',
  ContentViolation = 'CONTENT_VIOLATION',
  Spam = 'SPAM',
}

export type RevokeApiKeyError = {
  __typename?: 'RevokeApiKeyError'
  errorCodes: Array<RevokeApiKeyErrorCode>
}

export enum RevokeApiKeyErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type RevokeApiKeyResult = RevokeApiKeyError | RevokeApiKeySuccess

export type RevokeApiKeySuccess = {
  __typename?: 'RevokeApiKeySuccess'
  apiKey: ApiKey
}

export type SaveArticleReadingProgressError = {
  __typename?: 'SaveArticleReadingProgressError'
  errorCodes: Array<SaveArticleReadingProgressErrorCode>
}

export enum SaveArticleReadingProgressErrorCode {
  BadData = 'BAD_DATA',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SaveArticleReadingProgressInput = {
  id: Scalars['ID']
  readingProgressAnchorIndex: Scalars['Int']
  readingProgressPercent: Scalars['Float']
}

export type SaveArticleReadingProgressResult =
  | SaveArticleReadingProgressError
  | SaveArticleReadingProgressSuccess

export type SaveArticleReadingProgressSuccess = {
  __typename?: 'SaveArticleReadingProgressSuccess'
  updatedArticle: Article
}

export type SaveError = {
  __typename?: 'SaveError'
  errorCodes: Array<SaveErrorCode>
  message?: Maybe<Scalars['String']>
}

export enum SaveErrorCode {
  Unauthorized = 'UNAUTHORIZED',
  Unknown = 'UNKNOWN',
}

export type SaveFileInput = {
  clientRequestId: Scalars['ID']
  source: Scalars['String']
  uploadFileId: Scalars['ID']
  url: Scalars['String']
}

export type SavePageInput = {
  clientRequestId: Scalars['ID']
  originalContent: Scalars['String']
  source: Scalars['String']
  title?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type SaveResult = SaveError | SaveSuccess

export type SaveSuccess = {
  __typename?: 'SaveSuccess'
  clientRequestId: Scalars['ID']
  url: Scalars['String']
}

export type SaveUrlInput = {
  clientRequestId: Scalars['ID']
  source: Scalars['String']
  url: Scalars['String']
}

export type SearchError = {
  __typename?: 'SearchError'
  errorCodes: Array<SearchErrorCode>
}

export enum SearchErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type SearchItem = {
  __typename?: 'SearchItem'
  annotation?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  contentReader: ContentReader
  createdAt: Scalars['Date']
  description?: Maybe<Scalars['String']>
  highlights?: Maybe<Array<Highlight>>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  isArchived: Scalars['Boolean']
  labels?: Maybe<Array<Label>>
  language?: Maybe<Scalars['String']>
  originalArticleUrl?: Maybe<Scalars['String']>
  ownedByViewer?: Maybe<Scalars['Boolean']>
  pageId?: Maybe<Scalars['ID']>
  pageType: PageType
  publishedAt?: Maybe<Scalars['Date']>
  quote?: Maybe<Scalars['String']>
  readAt?: Maybe<Scalars['Date']>
  readingProgressAnchorIndex: Scalars['Int']
  readingProgressPercent: Scalars['Float']
  savedAt: Scalars['Date']
  shortId?: Maybe<Scalars['String']>
  siteIcon?: Maybe<Scalars['String']>
  siteName?: Maybe<Scalars['String']>
  slug: Scalars['String']
  state?: Maybe<ArticleSavingRequestStatus>
  subscription?: Maybe<Scalars['String']>
  title: Scalars['String']
  unsubHttpUrl?: Maybe<Scalars['String']>
  unsubMailTo?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Date']>
  uploadFileId?: Maybe<Scalars['ID']>
  url: Scalars['String']
}

export type SearchItemEdge = {
  __typename?: 'SearchItemEdge'
  cursor: Scalars['String']
  node: SearchItem
}

export type SearchResult = SearchError | SearchSuccess

export type SearchSuccess = {
  __typename?: 'SearchSuccess'
  edges: Array<SearchItemEdge>
  pageInfo: PageInfo
}

export type SendInstallInstructionsError = {
  __typename?: 'SendInstallInstructionsError'
  errorCodes: Array<SendInstallInstructionsErrorCode>
}

export enum SendInstallInstructionsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SendInstallInstructionsResult =
  | SendInstallInstructionsError
  | SendInstallInstructionsSuccess

export type SendInstallInstructionsSuccess = {
  __typename?: 'SendInstallInstructionsSuccess'
  sent: Scalars['Boolean']
}

export type SetBookmarkArticleError = {
  __typename?: 'SetBookmarkArticleError'
  errorCodes: Array<SetBookmarkArticleErrorCode>
}

export enum SetBookmarkArticleErrorCode {
  BookmarkExists = 'BOOKMARK_EXISTS',
  NotFound = 'NOT_FOUND',
}

export type SetBookmarkArticleInput = {
  articleID: Scalars['ID']
  bookmark: Scalars['Boolean']
}

export type SetBookmarkArticleResult =
  | SetBookmarkArticleError
  | SetBookmarkArticleSuccess

export type SetBookmarkArticleSuccess = {
  __typename?: 'SetBookmarkArticleSuccess'
  bookmarkedArticle: Article
}

export type SetDeviceTokenError = {
  __typename?: 'SetDeviceTokenError'
  errorCodes: Array<SetDeviceTokenErrorCode>
}

export enum SetDeviceTokenErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetDeviceTokenInput = {
  id?: InputMaybe<Scalars['ID']>
  token?: InputMaybe<Scalars['String']>
}

export type SetDeviceTokenResult = SetDeviceTokenError | SetDeviceTokenSuccess

export type SetDeviceTokenSuccess = {
  __typename?: 'SetDeviceTokenSuccess'
  deviceToken: DeviceToken
}

export type SetFollowError = {
  __typename?: 'SetFollowError'
  errorCodes: Array<SetFollowErrorCode>
}

export enum SetFollowErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetFollowInput = {
  follow: Scalars['Boolean']
  userId: Scalars['ID']
}

export type SetFollowResult = SetFollowError | SetFollowSuccess

export type SetFollowSuccess = {
  __typename?: 'SetFollowSuccess'
  updatedUser: User
}

export type SetIntegrationError = {
  __typename?: 'SetIntegrationError'
  errorCodes: Array<SetIntegrationErrorCode>
}

export enum SetIntegrationErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  InvalidToken = 'INVALID_TOKEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetIntegrationInput = {
  enabled: Scalars['Boolean']
  id?: InputMaybe<Scalars['ID']>
  token: Scalars['String']
  type: IntegrationType
}

export type SetIntegrationResult = SetIntegrationError | SetIntegrationSuccess

export type SetIntegrationSuccess = {
  __typename?: 'SetIntegrationSuccess'
  integration: Integration
}

export type SetLabelsError = {
  __typename?: 'SetLabelsError'
  errorCodes: Array<SetLabelsErrorCode>
}

export enum SetLabelsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetLabelsForHighlightInput = {
  highlightId: Scalars['ID']
  labelIds: Array<Scalars['ID']>
}

export type SetLabelsInput = {
  labelIds: Array<Scalars['ID']>
  pageId: Scalars['ID']
}

export type SetLabelsResult = SetLabelsError | SetLabelsSuccess

export type SetLabelsSuccess = {
  __typename?: 'SetLabelsSuccess'
  labels: Array<Label>
}

export type SetShareArticleError = {
  __typename?: 'SetShareArticleError'
  errorCodes: Array<SetShareArticleErrorCode>
}

export enum SetShareArticleErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetShareArticleInput = {
  articleID: Scalars['ID']
  share: Scalars['Boolean']
  sharedComment?: InputMaybe<Scalars['String']>
  sharedWithHighlights?: InputMaybe<Scalars['Boolean']>
}

export type SetShareArticleResult =
  | SetShareArticleError
  | SetShareArticleSuccess

export type SetShareArticleSuccess = {
  __typename?: 'SetShareArticleSuccess'
  updatedArticle: Article
  updatedFeedArticle?: Maybe<FeedArticle>
  updatedFeedArticleId?: Maybe<Scalars['String']>
}

export type SetShareHighlightError = {
  __typename?: 'SetShareHighlightError'
  errorCodes: Array<SetShareHighlightErrorCode>
}

export enum SetShareHighlightErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetShareHighlightInput = {
  id: Scalars['ID']
  share: Scalars['Boolean']
}

export type SetShareHighlightResult =
  | SetShareHighlightError
  | SetShareHighlightSuccess

export type SetShareHighlightSuccess = {
  __typename?: 'SetShareHighlightSuccess'
  highlight: Highlight
}

export type SetUserPersonalizationError = {
  __typename?: 'SetUserPersonalizationError'
  errorCodes: Array<SetUserPersonalizationErrorCode>
}

export enum SetUserPersonalizationErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type SetUserPersonalizationInput = {
  fontFamily?: InputMaybe<Scalars['String']>
  fontSize?: InputMaybe<Scalars['Int']>
  libraryLayoutType?: InputMaybe<Scalars['String']>
  librarySortOrder?: InputMaybe<SortOrder>
  margin?: InputMaybe<Scalars['Int']>
  theme?: InputMaybe<Scalars['String']>
}

export type SetUserPersonalizationResult =
  | SetUserPersonalizationError
  | SetUserPersonalizationSuccess

export type SetUserPersonalizationSuccess = {
  __typename?: 'SetUserPersonalizationSuccess'
  updatedUserPersonalization: UserPersonalization
}

export type SetWebhookError = {
  __typename?: 'SetWebhookError'
  errorCodes: Array<SetWebhookErrorCode>
}

export enum SetWebhookErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SetWebhookInput = {
  contentType?: InputMaybe<Scalars['String']>
  enabled?: InputMaybe<Scalars['Boolean']>
  eventTypes: Array<WebhookEvent>
  id?: InputMaybe<Scalars['ID']>
  method?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type SetWebhookResult = SetWebhookError | SetWebhookSuccess

export type SetWebhookSuccess = {
  __typename?: 'SetWebhookSuccess'
  webhook: Webhook
}

export type ShareStats = {
  __typename?: 'ShareStats'
  readDuration: Scalars['Int']
  saveCount: Scalars['Int']
  viewCount: Scalars['Int']
}

export type SharedArticleError = {
  __typename?: 'SharedArticleError'
  errorCodes: Array<SharedArticleErrorCode>
}

export enum SharedArticleErrorCode {
  NotFound = 'NOT_FOUND',
}

export type SharedArticleResult = SharedArticleError | SharedArticleSuccess

export type SharedArticleSuccess = {
  __typename?: 'SharedArticleSuccess'
  article: Article
}

export enum SignupErrorCode {
  AccessDenied = 'ACCESS_DENIED',
  ExpiredToken = 'EXPIRED_TOKEN',
  GoogleAuthError = 'GOOGLE_AUTH_ERROR',
  InvalidEmail = 'INVALID_EMAIL',
  InvalidPassword = 'INVALID_PASSWORD',
  InvalidUsername = 'INVALID_USERNAME',
  Unknown = 'UNKNOWN',
  UserExists = 'USER_EXISTS',
}

export enum SortBy {
  PublishedAt = 'PUBLISHED_AT',
  SavedAt = 'SAVED_AT',
  Score = 'SCORE',
  UpdatedTime = 'UPDATED_TIME',
}

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
}

export type SortParams = {
  by: SortBy
  order?: InputMaybe<SortOrder>
}

export type SubscribeError = {
  __typename?: 'SubscribeError'
  errorCodes: Array<SubscribeErrorCode>
}

export enum SubscribeErrorCode {
  AlreadySubscribed = 'ALREADY_SUBSCRIBED',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type SubscribeResult = SubscribeError | SubscribeSuccess

export type SubscribeSuccess = {
  __typename?: 'SubscribeSuccess'
  subscriptions: Array<Subscription>
}

export type Subscription = {
  __typename?: 'Subscription'
  createdAt: Scalars['Date']
  description?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  newsletterEmail: Scalars['String']
  status: SubscriptionStatus
  unsubscribeHttpUrl?: Maybe<Scalars['String']>
  unsubscribeMailTo?: Maybe<Scalars['String']>
  updatedAt: Scalars['Date']
  url?: Maybe<Scalars['String']>
}

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Unsubscribed = 'UNSUBSCRIBED',
}

export type SubscriptionsError = {
  __typename?: 'SubscriptionsError'
  errorCodes: Array<SubscriptionsErrorCode>
}

export enum SubscriptionsErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type SubscriptionsResult = SubscriptionsError | SubscriptionsSuccess

export type SubscriptionsSuccess = {
  __typename?: 'SubscriptionsSuccess'
  subscriptions: Array<Subscription>
}

export type SyncUpdatedItemEdge = {
  __typename?: 'SyncUpdatedItemEdge'
  cursor: Scalars['String']
  itemID: Scalars['ID']
  node?: Maybe<SearchItem>
  updateReason: UpdateReason
}

export type TypeaheadSearchError = {
  __typename?: 'TypeaheadSearchError'
  errorCodes: Array<TypeaheadSearchErrorCode>
}

export enum TypeaheadSearchErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type TypeaheadSearchItem = {
  __typename?: 'TypeaheadSearchItem'
  id: Scalars['ID']
  siteName?: Maybe<Scalars['String']>
  slug: Scalars['String']
  title: Scalars['String']
}

export type TypeaheadSearchResult =
  | TypeaheadSearchError
  | TypeaheadSearchSuccess

export type TypeaheadSearchSuccess = {
  __typename?: 'TypeaheadSearchSuccess'
  items: Array<TypeaheadSearchItem>
}

export type UnsubscribeError = {
  __typename?: 'UnsubscribeError'
  errorCodes: Array<UnsubscribeErrorCode>
}

export enum UnsubscribeErrorCode {
  AlreadyUnsubscribed = 'ALREADY_UNSUBSCRIBED',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  UnsubscribeMethodNotFound = 'UNSUBSCRIBE_METHOD_NOT_FOUND',
}

export type UnsubscribeResult = UnsubscribeError | UnsubscribeSuccess

export type UnsubscribeSuccess = {
  __typename?: 'UnsubscribeSuccess'
  subscription: Subscription
}

export type UpdateHighlightError = {
  __typename?: 'UpdateHighlightError'
  errorCodes: Array<UpdateHighlightErrorCode>
}

export enum UpdateHighlightErrorCode {
  BadData = 'BAD_DATA',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdateHighlightInput = {
  annotation?: InputMaybe<Scalars['String']>
  highlightId: Scalars['ID']
  sharedAt?: InputMaybe<Scalars['Date']>
}

export type UpdateHighlightReplyError = {
  __typename?: 'UpdateHighlightReplyError'
  errorCodes: Array<UpdateHighlightReplyErrorCode>
}

export enum UpdateHighlightReplyErrorCode {
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdateHighlightReplyInput = {
  highlightReplyId: Scalars['ID']
  text: Scalars['String']
}

export type UpdateHighlightReplyResult =
  | UpdateHighlightReplyError
  | UpdateHighlightReplySuccess

export type UpdateHighlightReplySuccess = {
  __typename?: 'UpdateHighlightReplySuccess'
  highlightReply: HighlightReply
}

export type UpdateHighlightResult =
  | UpdateHighlightError
  | UpdateHighlightSuccess

export type UpdateHighlightSuccess = {
  __typename?: 'UpdateHighlightSuccess'
  highlight: Highlight
}

export type UpdateLabelError = {
  __typename?: 'UpdateLabelError'
  errorCodes: Array<UpdateLabelErrorCode>
}

export enum UpdateLabelErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdateLabelInput = {
  color: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  labelId: Scalars['ID']
  name: Scalars['String']
}

export type UpdateLabelResult = UpdateLabelError | UpdateLabelSuccess

export type UpdateLabelSuccess = {
  __typename?: 'UpdateLabelSuccess'
  label: Label
}

export type UpdateLinkShareInfoError = {
  __typename?: 'UpdateLinkShareInfoError'
  errorCodes: Array<UpdateLinkShareInfoErrorCode>
}

export enum UpdateLinkShareInfoErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdateLinkShareInfoInput = {
  description: Scalars['String']
  linkId: Scalars['ID']
  title: Scalars['String']
}

export type UpdateLinkShareInfoResult =
  | UpdateLinkShareInfoError
  | UpdateLinkShareInfoSuccess

export type UpdateLinkShareInfoSuccess = {
  __typename?: 'UpdateLinkShareInfoSuccess'
  message: Scalars['String']
}

export type UpdatePageError = {
  __typename?: 'UpdatePageError'
  errorCodes: Array<UpdatePageErrorCode>
}

export enum UpdatePageErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  UpdateFailed = 'UPDATE_FAILED',
}

export type UpdatePageInput = {
  description?: InputMaybe<Scalars['String']>
  pageId: Scalars['ID']
  title?: InputMaybe<Scalars['String']>
}

export type UpdatePageResult = UpdatePageError | UpdatePageSuccess

export type UpdatePageSuccess = {
  __typename?: 'UpdatePageSuccess'
  updatedPage: Article
}

export enum UpdateReason {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED',
}

export type UpdateReminderError = {
  __typename?: 'UpdateReminderError'
  errorCodes: Array<UpdateReminderErrorCode>
}

export enum UpdateReminderErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdateReminderInput = {
  archiveUntil: Scalars['Boolean']
  id: Scalars['ID']
  remindAt: Scalars['Date']
  sendNotification: Scalars['Boolean']
}

export type UpdateReminderResult = UpdateReminderError | UpdateReminderSuccess

export type UpdateReminderSuccess = {
  __typename?: 'UpdateReminderSuccess'
  reminder: Reminder
}

export type UpdateSharedCommentError = {
  __typename?: 'UpdateSharedCommentError'
  errorCodes: Array<UpdateSharedCommentErrorCode>
}

export enum UpdateSharedCommentErrorCode {
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdateSharedCommentInput = {
  articleID: Scalars['ID']
  sharedComment: Scalars['String']
}

export type UpdateSharedCommentResult =
  | UpdateSharedCommentError
  | UpdateSharedCommentSuccess

export type UpdateSharedCommentSuccess = {
  __typename?: 'UpdateSharedCommentSuccess'
  articleID: Scalars['ID']
  sharedComment: Scalars['String']
}

export type UpdateUserError = {
  __typename?: 'UpdateUserError'
  errorCodes: Array<UpdateUserErrorCode>
}

export enum UpdateUserErrorCode {
  BioTooLong = 'BIO_TOO_LONG',
  EmptyName = 'EMPTY_NAME',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND',
}

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type UpdateUserProfileError = {
  __typename?: 'UpdateUserProfileError'
  errorCodes: Array<UpdateUserProfileErrorCode>
}

export enum UpdateUserProfileErrorCode {
  BadData = 'BAD_DATA',
  BadUsername = 'BAD_USERNAME',
  Forbidden = 'FORBIDDEN',
  Unauthorized = 'UNAUTHORIZED',
  UsernameExists = 'USERNAME_EXISTS',
}

export type UpdateUserProfileInput = {
  bio?: InputMaybe<Scalars['String']>
  pictureUrl?: InputMaybe<Scalars['String']>
  userId: Scalars['ID']
  username?: InputMaybe<Scalars['String']>
}

export type UpdateUserProfileResult =
  | UpdateUserProfileError
  | UpdateUserProfileSuccess

export type UpdateUserProfileSuccess = {
  __typename?: 'UpdateUserProfileSuccess'
  user: User
}

export type UpdateUserResult = UpdateUserError | UpdateUserSuccess

export type UpdateUserSuccess = {
  __typename?: 'UpdateUserSuccess'
  user: User
}

export type UpdatesSinceError = {
  __typename?: 'UpdatesSinceError'
  errorCodes: Array<UpdatesSinceErrorCode>
}

export enum UpdatesSinceErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type UpdatesSinceResult = UpdatesSinceError | UpdatesSinceSuccess

export type UpdatesSinceSuccess = {
  __typename?: 'UpdatesSinceSuccess'
  edges: Array<SyncUpdatedItemEdge>
  pageInfo: PageInfo
}

export type UploadFileRequestError = {
  __typename?: 'UploadFileRequestError'
  errorCodes: Array<UploadFileRequestErrorCode>
}

export enum UploadFileRequestErrorCode {
  BadInput = 'BAD_INPUT',
  FailedCreate = 'FAILED_CREATE',
  Unauthorized = 'UNAUTHORIZED',
}

export type UploadFileRequestInput = {
  clientRequestId?: InputMaybe<Scalars['String']>
  contentType: Scalars['String']
  createPageEntry?: InputMaybe<Scalars['Boolean']>
  url: Scalars['String']
}

export type UploadFileRequestResult =
  | UploadFileRequestError
  | UploadFileRequestSuccess

export type UploadFileRequestSuccess = {
  __typename?: 'UploadFileRequestSuccess'
  createdPageId?: Maybe<Scalars['String']>
  id: Scalars['ID']
  uploadFileId?: Maybe<Scalars['ID']>
  uploadSignedUrl?: Maybe<Scalars['String']>
}

export enum UploadFileStatus {
  Completed = 'COMPLETED',
  Initialized = 'INITIALIZED',
}

export type User = {
  __typename?: 'User'
  followersCount?: Maybe<Scalars['Int']>
  friendsCount?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  /** @deprecated isFriend has been replaced with viewerIsFollowing */
  isFriend?: Maybe<Scalars['Boolean']>
  isFullUser?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
  profile: Profile
  sharedArticles: Array<FeedArticle>
  sharedArticlesCount?: Maybe<Scalars['Int']>
  sharedHighlightsCount?: Maybe<Scalars['Int']>
  sharedNotesCount?: Maybe<Scalars['Int']>
  viewerIsFollowing?: Maybe<Scalars['Boolean']>
}

export type UserError = {
  __typename?: 'UserError'
  errorCodes: Array<UserErrorCode>
}

export enum UserErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND',
}

export type UserPersonalization = {
  __typename?: 'UserPersonalization'
  fontFamily?: Maybe<Scalars['String']>
  fontSize?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['ID']>
  libraryLayoutType?: Maybe<Scalars['String']>
  librarySortOrder?: Maybe<SortOrder>
  margin?: Maybe<Scalars['Int']>
  theme?: Maybe<Scalars['String']>
}

export type UserResult = UserError | UserSuccess

export type UserSuccess = {
  __typename?: 'UserSuccess'
  user: User
}

export type UsersError = {
  __typename?: 'UsersError'
  errorCodes: Array<UsersErrorCode>
}

export enum UsersErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}

export type UsersResult = UsersError | UsersSuccess

export type UsersSuccess = {
  __typename?: 'UsersSuccess'
  users: Array<User>
}

export type Webhook = {
  __typename?: 'Webhook'
  contentType: Scalars['String']
  createdAt: Scalars['Date']
  enabled: Scalars['Boolean']
  eventTypes: Array<WebhookEvent>
  id: Scalars['ID']
  method: Scalars['String']
  updatedAt: Scalars['Date']
  url: Scalars['String']
}

export type WebhookError = {
  __typename?: 'WebhookError'
  errorCodes: Array<WebhookErrorCode>
}

export enum WebhookErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

export enum WebhookEvent {
  HighlightCreated = 'HIGHLIGHT_CREATED',
  HighlightDeleted = 'HIGHLIGHT_DELETED',
  HighlightUpdated = 'HIGHLIGHT_UPDATED',
  LabelCreated = 'LABEL_CREATED',
  LabelDeleted = 'LABEL_DELETED',
  LabelUpdated = 'LABEL_UPDATED',
  PageCreated = 'PAGE_CREATED',
  PageDeleted = 'PAGE_DELETED',
  PageUpdated = 'PAGE_UPDATED',
}

export type WebhookResult = WebhookError | WebhookSuccess

export type WebhookSuccess = {
  __typename?: 'WebhookSuccess'
  webhook: Webhook
}

export type WebhooksError = {
  __typename?: 'WebhooksError'
  errorCodes: Array<WebhooksErrorCode>
}

export enum WebhooksErrorCode {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
}

export type WebhooksResult = WebhooksError | WebhooksSuccess

export type WebhooksSuccess = {
  __typename?: 'WebhooksSuccess'
  webhooks: Array<Webhook>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddPopularReadError: ResolverTypeWrapper<AddPopularReadError>
  AddPopularReadErrorCode: AddPopularReadErrorCode
  AddPopularReadResult:
    | ResolversTypes['AddPopularReadError']
    | ResolversTypes['AddPopularReadSuccess']
  AddPopularReadSuccess: ResolverTypeWrapper<AddPopularReadSuccess>
  ApiKey: ResolverTypeWrapper<ApiKey>
  ApiKeysError: ResolverTypeWrapper<ApiKeysError>
  ApiKeysErrorCode: ApiKeysErrorCode
  ApiKeysResult:
    | ResolversTypes['ApiKeysError']
    | ResolversTypes['ApiKeysSuccess']
  ApiKeysSuccess: ResolverTypeWrapper<ApiKeysSuccess>
  ArchiveLinkError: ResolverTypeWrapper<ArchiveLinkError>
  ArchiveLinkErrorCode: ArchiveLinkErrorCode
  ArchiveLinkInput: ArchiveLinkInput
  ArchiveLinkResult:
    | ResolversTypes['ArchiveLinkError']
    | ResolversTypes['ArchiveLinkSuccess']
  ArchiveLinkSuccess: ResolverTypeWrapper<ArchiveLinkSuccess>
  Article: ResolverTypeWrapper<Article>
  ArticleEdge: ResolverTypeWrapper<ArticleEdge>
  ArticleError: ResolverTypeWrapper<ArticleError>
  ArticleErrorCode: ArticleErrorCode
  ArticleHighlightsInput: ArticleHighlightsInput
  ArticleResult:
    | ResolversTypes['ArticleError']
    | ResolversTypes['ArticleSuccess']
  ArticleSavingRequest: ResolverTypeWrapper<ArticleSavingRequest>
  ArticleSavingRequestError: ResolverTypeWrapper<ArticleSavingRequestError>
  ArticleSavingRequestErrorCode: ArticleSavingRequestErrorCode
  ArticleSavingRequestResult:
    | ResolversTypes['ArticleSavingRequestError']
    | ResolversTypes['ArticleSavingRequestSuccess']
  ArticleSavingRequestStatus: ArticleSavingRequestStatus
  ArticleSavingRequestSuccess: ResolverTypeWrapper<ArticleSavingRequestSuccess>
  ArticleSuccess: ResolverTypeWrapper<ArticleSuccess>
  ArticlesError: ResolverTypeWrapper<ArticlesError>
  ArticlesErrorCode: ArticlesErrorCode
  ArticlesResult:
    | ResolversTypes['ArticlesError']
    | ResolversTypes['ArticlesSuccess']
  ArticlesSuccess: ResolverTypeWrapper<ArticlesSuccess>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ContentReader: ContentReader
  CreateArticleError: ResolverTypeWrapper<CreateArticleError>
  CreateArticleErrorCode: CreateArticleErrorCode
  CreateArticleInput: CreateArticleInput
  CreateArticleResult:
    | ResolversTypes['CreateArticleError']
    | ResolversTypes['CreateArticleSuccess']
  CreateArticleSavingRequestError: ResolverTypeWrapper<CreateArticleSavingRequestError>
  CreateArticleSavingRequestErrorCode: CreateArticleSavingRequestErrorCode
  CreateArticleSavingRequestInput: CreateArticleSavingRequestInput
  CreateArticleSavingRequestResult:
    | ResolversTypes['CreateArticleSavingRequestError']
    | ResolversTypes['CreateArticleSavingRequestSuccess']
  CreateArticleSavingRequestSuccess: ResolverTypeWrapper<CreateArticleSavingRequestSuccess>
  CreateArticleSuccess: ResolverTypeWrapper<CreateArticleSuccess>
  CreateHighlightError: ResolverTypeWrapper<CreateHighlightError>
  CreateHighlightErrorCode: CreateHighlightErrorCode
  CreateHighlightInput: CreateHighlightInput
  CreateHighlightReplyError: ResolverTypeWrapper<CreateHighlightReplyError>
  CreateHighlightReplyErrorCode: CreateHighlightReplyErrorCode
  CreateHighlightReplyInput: CreateHighlightReplyInput
  CreateHighlightReplyResult:
    | ResolversTypes['CreateHighlightReplyError']
    | ResolversTypes['CreateHighlightReplySuccess']
  CreateHighlightReplySuccess: ResolverTypeWrapper<CreateHighlightReplySuccess>
  CreateHighlightResult:
    | ResolversTypes['CreateHighlightError']
    | ResolversTypes['CreateHighlightSuccess']
  CreateHighlightSuccess: ResolverTypeWrapper<CreateHighlightSuccess>
  CreateLabelError: ResolverTypeWrapper<CreateLabelError>
  CreateLabelErrorCode: CreateLabelErrorCode
  CreateLabelInput: CreateLabelInput
  CreateLabelResult:
    | ResolversTypes['CreateLabelError']
    | ResolversTypes['CreateLabelSuccess']
  CreateLabelSuccess: ResolverTypeWrapper<CreateLabelSuccess>
  CreateNewsletterEmailError: ResolverTypeWrapper<CreateNewsletterEmailError>
  CreateNewsletterEmailErrorCode: CreateNewsletterEmailErrorCode
  CreateNewsletterEmailResult:
    | ResolversTypes['CreateNewsletterEmailError']
    | ResolversTypes['CreateNewsletterEmailSuccess']
  CreateNewsletterEmailSuccess: ResolverTypeWrapper<CreateNewsletterEmailSuccess>
  CreateReactionError: ResolverTypeWrapper<CreateReactionError>
  CreateReactionErrorCode: CreateReactionErrorCode
  CreateReactionInput: CreateReactionInput
  CreateReactionResult:
    | ResolversTypes['CreateReactionError']
    | ResolversTypes['CreateReactionSuccess']
  CreateReactionSuccess: ResolverTypeWrapper<CreateReactionSuccess>
  CreateReminderError: ResolverTypeWrapper<CreateReminderError>
  CreateReminderErrorCode: CreateReminderErrorCode
  CreateReminderInput: CreateReminderInput
  CreateReminderResult:
    | ResolversTypes['CreateReminderError']
    | ResolversTypes['CreateReminderSuccess']
  CreateReminderSuccess: ResolverTypeWrapper<CreateReminderSuccess>
  Date: ResolverTypeWrapper<Scalars['Date']>
  DeleteAccountError: ResolverTypeWrapper<DeleteAccountError>
  DeleteAccountErrorCode: DeleteAccountErrorCode
  DeleteAccountResult:
    | ResolversTypes['DeleteAccountError']
    | ResolversTypes['DeleteAccountSuccess']
  DeleteAccountSuccess: ResolverTypeWrapper<DeleteAccountSuccess>
  DeleteHighlightError: ResolverTypeWrapper<DeleteHighlightError>
  DeleteHighlightErrorCode: DeleteHighlightErrorCode
  DeleteHighlightReplyError: ResolverTypeWrapper<DeleteHighlightReplyError>
  DeleteHighlightReplyErrorCode: DeleteHighlightReplyErrorCode
  DeleteHighlightReplyResult:
    | ResolversTypes['DeleteHighlightReplyError']
    | ResolversTypes['DeleteHighlightReplySuccess']
  DeleteHighlightReplySuccess: ResolverTypeWrapper<DeleteHighlightReplySuccess>
  DeleteHighlightResult:
    | ResolversTypes['DeleteHighlightError']
    | ResolversTypes['DeleteHighlightSuccess']
  DeleteHighlightSuccess: ResolverTypeWrapper<DeleteHighlightSuccess>
  DeleteIntegrationError: ResolverTypeWrapper<DeleteIntegrationError>
  DeleteIntegrationErrorCode: DeleteIntegrationErrorCode
  DeleteIntegrationResult:
    | ResolversTypes['DeleteIntegrationError']
    | ResolversTypes['DeleteIntegrationSuccess']
  DeleteIntegrationSuccess: ResolverTypeWrapper<DeleteIntegrationSuccess>
  DeleteLabelError: ResolverTypeWrapper<DeleteLabelError>
  DeleteLabelErrorCode: DeleteLabelErrorCode
  DeleteLabelResult:
    | ResolversTypes['DeleteLabelError']
    | ResolversTypes['DeleteLabelSuccess']
  DeleteLabelSuccess: ResolverTypeWrapper<DeleteLabelSuccess>
  DeleteNewsletterEmailError: ResolverTypeWrapper<DeleteNewsletterEmailError>
  DeleteNewsletterEmailErrorCode: DeleteNewsletterEmailErrorCode
  DeleteNewsletterEmailResult:
    | ResolversTypes['DeleteNewsletterEmailError']
    | ResolversTypes['DeleteNewsletterEmailSuccess']
  DeleteNewsletterEmailSuccess: ResolverTypeWrapper<DeleteNewsletterEmailSuccess>
  DeleteReactionError: ResolverTypeWrapper<DeleteReactionError>
  DeleteReactionErrorCode: DeleteReactionErrorCode
  DeleteReactionResult:
    | ResolversTypes['DeleteReactionError']
    | ResolversTypes['DeleteReactionSuccess']
  DeleteReactionSuccess: ResolverTypeWrapper<DeleteReactionSuccess>
  DeleteReminderError: ResolverTypeWrapper<DeleteReminderError>
  DeleteReminderErrorCode: DeleteReminderErrorCode
  DeleteReminderResult:
    | ResolversTypes['DeleteReminderError']
    | ResolversTypes['DeleteReminderSuccess']
  DeleteReminderSuccess: ResolverTypeWrapper<DeleteReminderSuccess>
  DeleteWebhookError: ResolverTypeWrapper<DeleteWebhookError>
  DeleteWebhookErrorCode: DeleteWebhookErrorCode
  DeleteWebhookResult:
    | ResolversTypes['DeleteWebhookError']
    | ResolversTypes['DeleteWebhookSuccess']
  DeleteWebhookSuccess: ResolverTypeWrapper<DeleteWebhookSuccess>
  DeviceToken: ResolverTypeWrapper<DeviceToken>
  FeedArticle: ResolverTypeWrapper<FeedArticle>
  FeedArticleEdge: ResolverTypeWrapper<FeedArticleEdge>
  FeedArticlesError: ResolverTypeWrapper<FeedArticlesError>
  FeedArticlesErrorCode: FeedArticlesErrorCode
  FeedArticlesResult:
    | ResolversTypes['FeedArticlesError']
    | ResolversTypes['FeedArticlesSuccess']
  FeedArticlesSuccess: ResolverTypeWrapper<FeedArticlesSuccess>
  Float: ResolverTypeWrapper<Scalars['Float']>
  GenerateApiKeyError: ResolverTypeWrapper<GenerateApiKeyError>
  GenerateApiKeyErrorCode: GenerateApiKeyErrorCode
  GenerateApiKeyInput: GenerateApiKeyInput
  GenerateApiKeyResult:
    | ResolversTypes['GenerateApiKeyError']
    | ResolversTypes['GenerateApiKeySuccess']
  GenerateApiKeySuccess: ResolverTypeWrapper<GenerateApiKeySuccess>
  GetFollowersError: ResolverTypeWrapper<GetFollowersError>
  GetFollowersErrorCode: GetFollowersErrorCode
  GetFollowersResult:
    | ResolversTypes['GetFollowersError']
    | ResolversTypes['GetFollowersSuccess']
  GetFollowersSuccess: ResolverTypeWrapper<GetFollowersSuccess>
  GetFollowingError: ResolverTypeWrapper<GetFollowingError>
  GetFollowingErrorCode: GetFollowingErrorCode
  GetFollowingResult:
    | ResolversTypes['GetFollowingError']
    | ResolversTypes['GetFollowingSuccess']
  GetFollowingSuccess: ResolverTypeWrapper<GetFollowingSuccess>
  GetUserPersonalizationError: ResolverTypeWrapper<GetUserPersonalizationError>
  GetUserPersonalizationErrorCode: GetUserPersonalizationErrorCode
  GetUserPersonalizationResult:
    | ResolversTypes['GetUserPersonalizationError']
    | ResolversTypes['GetUserPersonalizationSuccess']
  GetUserPersonalizationSuccess: ResolverTypeWrapper<GetUserPersonalizationSuccess>
  GoogleLoginInput: GoogleLoginInput
  GoogleSignupError: ResolverTypeWrapper<GoogleSignupError>
  GoogleSignupInput: GoogleSignupInput
  GoogleSignupResult:
    | ResolversTypes['GoogleSignupError']
    | ResolversTypes['GoogleSignupSuccess']
  GoogleSignupSuccess: ResolverTypeWrapper<GoogleSignupSuccess>
  Highlight: ResolverTypeWrapper<Highlight>
  HighlightReply: ResolverTypeWrapper<HighlightReply>
  HighlightStats: ResolverTypeWrapper<HighlightStats>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Integration: ResolverTypeWrapper<Integration>
  IntegrationType: IntegrationType
  IntegrationsError: ResolverTypeWrapper<IntegrationsError>
  IntegrationsErrorCode: IntegrationsErrorCode
  IntegrationsResult:
    | ResolversTypes['IntegrationsError']
    | ResolversTypes['IntegrationsSuccess']
  IntegrationsSuccess: ResolverTypeWrapper<IntegrationsSuccess>
  Label: ResolverTypeWrapper<Label>
  LabelsError: ResolverTypeWrapper<LabelsError>
  LabelsErrorCode: LabelsErrorCode
  LabelsResult: ResolversTypes['LabelsError'] | ResolversTypes['LabelsSuccess']
  LabelsSuccess: ResolverTypeWrapper<LabelsSuccess>
  Link: ResolverTypeWrapper<Link>
  LinkShareInfo: ResolverTypeWrapper<LinkShareInfo>
  LogOutError: ResolverTypeWrapper<LogOutError>
  LogOutErrorCode: LogOutErrorCode
  LogOutResult: ResolversTypes['LogOutError'] | ResolversTypes['LogOutSuccess']
  LogOutSuccess: ResolverTypeWrapper<LogOutSuccess>
  LoginError: ResolverTypeWrapper<LoginError>
  LoginErrorCode: LoginErrorCode
  LoginResult: ResolversTypes['LoginError'] | ResolversTypes['LoginSuccess']
  LoginSuccess: ResolverTypeWrapper<LoginSuccess>
  MergeHighlightError: ResolverTypeWrapper<MergeHighlightError>
  MergeHighlightErrorCode: MergeHighlightErrorCode
  MergeHighlightInput: MergeHighlightInput
  MergeHighlightResult:
    | ResolversTypes['MergeHighlightError']
    | ResolversTypes['MergeHighlightSuccess']
  MergeHighlightSuccess: ResolverTypeWrapper<MergeHighlightSuccess>
  MoveLabelError: ResolverTypeWrapper<MoveLabelError>
  MoveLabelErrorCode: MoveLabelErrorCode
  MoveLabelInput: MoveLabelInput
  MoveLabelResult:
    | ResolversTypes['MoveLabelError']
    | ResolversTypes['MoveLabelSuccess']
  MoveLabelSuccess: ResolverTypeWrapper<MoveLabelSuccess>
  Mutation: ResolverTypeWrapper<{}>
  NewsletterEmail: ResolverTypeWrapper<NewsletterEmail>
  NewsletterEmailsError: ResolverTypeWrapper<NewsletterEmailsError>
  NewsletterEmailsErrorCode: NewsletterEmailsErrorCode
  NewsletterEmailsResult:
    | ResolversTypes['NewsletterEmailsError']
    | ResolversTypes['NewsletterEmailsSuccess']
  NewsletterEmailsSuccess: ResolverTypeWrapper<NewsletterEmailsSuccess>
  Page: ResolverTypeWrapper<Page>
  PageInfo: ResolverTypeWrapper<PageInfo>
  PageInfoInput: PageInfoInput
  PageType: PageType
  PreparedDocumentInput: PreparedDocumentInput
  Profile: ResolverTypeWrapper<Profile>
  Query: ResolverTypeWrapper<{}>
  Reaction: ResolverTypeWrapper<Reaction>
  ReactionType: ReactionType
  ReadState: ResolverTypeWrapper<ReadState>
  Reminder: ResolverTypeWrapper<Reminder>
  ReminderError: ResolverTypeWrapper<ReminderError>
  ReminderErrorCode: ReminderErrorCode
  ReminderResult:
    | ResolversTypes['ReminderError']
    | ResolversTypes['ReminderSuccess']
  ReminderSuccess: ResolverTypeWrapper<ReminderSuccess>
  ReportItemInput: ReportItemInput
  ReportItemResult: ResolverTypeWrapper<ReportItemResult>
  ReportType: ReportType
  RevokeApiKeyError: ResolverTypeWrapper<RevokeApiKeyError>
  RevokeApiKeyErrorCode: RevokeApiKeyErrorCode
  RevokeApiKeyResult:
    | ResolversTypes['RevokeApiKeyError']
    | ResolversTypes['RevokeApiKeySuccess']
  RevokeApiKeySuccess: ResolverTypeWrapper<RevokeApiKeySuccess>
  SaveArticleReadingProgressError: ResolverTypeWrapper<SaveArticleReadingProgressError>
  SaveArticleReadingProgressErrorCode: SaveArticleReadingProgressErrorCode
  SaveArticleReadingProgressInput: SaveArticleReadingProgressInput
  SaveArticleReadingProgressResult:
    | ResolversTypes['SaveArticleReadingProgressError']
    | ResolversTypes['SaveArticleReadingProgressSuccess']
  SaveArticleReadingProgressSuccess: ResolverTypeWrapper<SaveArticleReadingProgressSuccess>
  SaveError: ResolverTypeWrapper<SaveError>
  SaveErrorCode: SaveErrorCode
  SaveFileInput: SaveFileInput
  SavePageInput: SavePageInput
  SaveResult: ResolversTypes['SaveError'] | ResolversTypes['SaveSuccess']
  SaveSuccess: ResolverTypeWrapper<SaveSuccess>
  SaveUrlInput: SaveUrlInput
  SearchError: ResolverTypeWrapper<SearchError>
  SearchErrorCode: SearchErrorCode
  SearchItem: ResolverTypeWrapper<SearchItem>
  SearchItemEdge: ResolverTypeWrapper<SearchItemEdge>
  SearchResult: ResolversTypes['SearchError'] | ResolversTypes['SearchSuccess']
  SearchSuccess: ResolverTypeWrapper<SearchSuccess>
  SendInstallInstructionsError: ResolverTypeWrapper<SendInstallInstructionsError>
  SendInstallInstructionsErrorCode: SendInstallInstructionsErrorCode
  SendInstallInstructionsResult:
    | ResolversTypes['SendInstallInstructionsError']
    | ResolversTypes['SendInstallInstructionsSuccess']
  SendInstallInstructionsSuccess: ResolverTypeWrapper<SendInstallInstructionsSuccess>
  SetBookmarkArticleError: ResolverTypeWrapper<SetBookmarkArticleError>
  SetBookmarkArticleErrorCode: SetBookmarkArticleErrorCode
  SetBookmarkArticleInput: SetBookmarkArticleInput
  SetBookmarkArticleResult:
    | ResolversTypes['SetBookmarkArticleError']
    | ResolversTypes['SetBookmarkArticleSuccess']
  SetBookmarkArticleSuccess: ResolverTypeWrapper<SetBookmarkArticleSuccess>
  SetDeviceTokenError: ResolverTypeWrapper<SetDeviceTokenError>
  SetDeviceTokenErrorCode: SetDeviceTokenErrorCode
  SetDeviceTokenInput: SetDeviceTokenInput
  SetDeviceTokenResult:
    | ResolversTypes['SetDeviceTokenError']
    | ResolversTypes['SetDeviceTokenSuccess']
  SetDeviceTokenSuccess: ResolverTypeWrapper<SetDeviceTokenSuccess>
  SetFollowError: ResolverTypeWrapper<SetFollowError>
  SetFollowErrorCode: SetFollowErrorCode
  SetFollowInput: SetFollowInput
  SetFollowResult:
    | ResolversTypes['SetFollowError']
    | ResolversTypes['SetFollowSuccess']
  SetFollowSuccess: ResolverTypeWrapper<SetFollowSuccess>
  SetIntegrationError: ResolverTypeWrapper<SetIntegrationError>
  SetIntegrationErrorCode: SetIntegrationErrorCode
  SetIntegrationInput: SetIntegrationInput
  SetIntegrationResult:
    | ResolversTypes['SetIntegrationError']
    | ResolversTypes['SetIntegrationSuccess']
  SetIntegrationSuccess: ResolverTypeWrapper<SetIntegrationSuccess>
  SetLabelsError: ResolverTypeWrapper<SetLabelsError>
  SetLabelsErrorCode: SetLabelsErrorCode
  SetLabelsForHighlightInput: SetLabelsForHighlightInput
  SetLabelsInput: SetLabelsInput
  SetLabelsResult:
    | ResolversTypes['SetLabelsError']
    | ResolversTypes['SetLabelsSuccess']
  SetLabelsSuccess: ResolverTypeWrapper<SetLabelsSuccess>
  SetShareArticleError: ResolverTypeWrapper<SetShareArticleError>
  SetShareArticleErrorCode: SetShareArticleErrorCode
  SetShareArticleInput: SetShareArticleInput
  SetShareArticleResult:
    | ResolversTypes['SetShareArticleError']
    | ResolversTypes['SetShareArticleSuccess']
  SetShareArticleSuccess: ResolverTypeWrapper<SetShareArticleSuccess>
  SetShareHighlightError: ResolverTypeWrapper<SetShareHighlightError>
  SetShareHighlightErrorCode: SetShareHighlightErrorCode
  SetShareHighlightInput: SetShareHighlightInput
  SetShareHighlightResult:
    | ResolversTypes['SetShareHighlightError']
    | ResolversTypes['SetShareHighlightSuccess']
  SetShareHighlightSuccess: ResolverTypeWrapper<SetShareHighlightSuccess>
  SetUserPersonalizationError: ResolverTypeWrapper<SetUserPersonalizationError>
  SetUserPersonalizationErrorCode: SetUserPersonalizationErrorCode
  SetUserPersonalizationInput: SetUserPersonalizationInput
  SetUserPersonalizationResult:
    | ResolversTypes['SetUserPersonalizationError']
    | ResolversTypes['SetUserPersonalizationSuccess']
  SetUserPersonalizationSuccess: ResolverTypeWrapper<SetUserPersonalizationSuccess>
  SetWebhookError: ResolverTypeWrapper<SetWebhookError>
  SetWebhookErrorCode: SetWebhookErrorCode
  SetWebhookInput: SetWebhookInput
  SetWebhookResult:
    | ResolversTypes['SetWebhookError']
    | ResolversTypes['SetWebhookSuccess']
  SetWebhookSuccess: ResolverTypeWrapper<SetWebhookSuccess>
  ShareStats: ResolverTypeWrapper<ShareStats>
  SharedArticleError: ResolverTypeWrapper<SharedArticleError>
  SharedArticleErrorCode: SharedArticleErrorCode
  SharedArticleResult:
    | ResolversTypes['SharedArticleError']
    | ResolversTypes['SharedArticleSuccess']
  SharedArticleSuccess: ResolverTypeWrapper<SharedArticleSuccess>
  SignupErrorCode: SignupErrorCode
  SortBy: SortBy
  SortOrder: SortOrder
  SortParams: SortParams
  String: ResolverTypeWrapper<Scalars['String']>
  SubscribeError: ResolverTypeWrapper<SubscribeError>
  SubscribeErrorCode: SubscribeErrorCode
  SubscribeResult:
    | ResolversTypes['SubscribeError']
    | ResolversTypes['SubscribeSuccess']
  SubscribeSuccess: ResolverTypeWrapper<SubscribeSuccess>
  Subscription: ResolverTypeWrapper<{}>
  SubscriptionStatus: SubscriptionStatus
  SubscriptionsError: ResolverTypeWrapper<SubscriptionsError>
  SubscriptionsErrorCode: SubscriptionsErrorCode
  SubscriptionsResult:
    | ResolversTypes['SubscriptionsError']
    | ResolversTypes['SubscriptionsSuccess']
  SubscriptionsSuccess: ResolverTypeWrapper<SubscriptionsSuccess>
  SyncUpdatedItemEdge: ResolverTypeWrapper<SyncUpdatedItemEdge>
  TypeaheadSearchError: ResolverTypeWrapper<TypeaheadSearchError>
  TypeaheadSearchErrorCode: TypeaheadSearchErrorCode
  TypeaheadSearchItem: ResolverTypeWrapper<TypeaheadSearchItem>
  TypeaheadSearchResult:
    | ResolversTypes['TypeaheadSearchError']
    | ResolversTypes['TypeaheadSearchSuccess']
  TypeaheadSearchSuccess: ResolverTypeWrapper<TypeaheadSearchSuccess>
  UnsubscribeError: ResolverTypeWrapper<UnsubscribeError>
  UnsubscribeErrorCode: UnsubscribeErrorCode
  UnsubscribeResult:
    | ResolversTypes['UnsubscribeError']
    | ResolversTypes['UnsubscribeSuccess']
  UnsubscribeSuccess: ResolverTypeWrapper<UnsubscribeSuccess>
  UpdateHighlightError: ResolverTypeWrapper<UpdateHighlightError>
  UpdateHighlightErrorCode: UpdateHighlightErrorCode
  UpdateHighlightInput: UpdateHighlightInput
  UpdateHighlightReplyError: ResolverTypeWrapper<UpdateHighlightReplyError>
  UpdateHighlightReplyErrorCode: UpdateHighlightReplyErrorCode
  UpdateHighlightReplyInput: UpdateHighlightReplyInput
  UpdateHighlightReplyResult:
    | ResolversTypes['UpdateHighlightReplyError']
    | ResolversTypes['UpdateHighlightReplySuccess']
  UpdateHighlightReplySuccess: ResolverTypeWrapper<UpdateHighlightReplySuccess>
  UpdateHighlightResult:
    | ResolversTypes['UpdateHighlightError']
    | ResolversTypes['UpdateHighlightSuccess']
  UpdateHighlightSuccess: ResolverTypeWrapper<UpdateHighlightSuccess>
  UpdateLabelError: ResolverTypeWrapper<UpdateLabelError>
  UpdateLabelErrorCode: UpdateLabelErrorCode
  UpdateLabelInput: UpdateLabelInput
  UpdateLabelResult:
    | ResolversTypes['UpdateLabelError']
    | ResolversTypes['UpdateLabelSuccess']
  UpdateLabelSuccess: ResolverTypeWrapper<UpdateLabelSuccess>
  UpdateLinkShareInfoError: ResolverTypeWrapper<UpdateLinkShareInfoError>
  UpdateLinkShareInfoErrorCode: UpdateLinkShareInfoErrorCode
  UpdateLinkShareInfoInput: UpdateLinkShareInfoInput
  UpdateLinkShareInfoResult:
    | ResolversTypes['UpdateLinkShareInfoError']
    | ResolversTypes['UpdateLinkShareInfoSuccess']
  UpdateLinkShareInfoSuccess: ResolverTypeWrapper<UpdateLinkShareInfoSuccess>
  UpdatePageError: ResolverTypeWrapper<UpdatePageError>
  UpdatePageErrorCode: UpdatePageErrorCode
  UpdatePageInput: UpdatePageInput
  UpdatePageResult:
    | ResolversTypes['UpdatePageError']
    | ResolversTypes['UpdatePageSuccess']
  UpdatePageSuccess: ResolverTypeWrapper<UpdatePageSuccess>
  UpdateReason: UpdateReason
  UpdateReminderError: ResolverTypeWrapper<UpdateReminderError>
  UpdateReminderErrorCode: UpdateReminderErrorCode
  UpdateReminderInput: UpdateReminderInput
  UpdateReminderResult:
    | ResolversTypes['UpdateReminderError']
    | ResolversTypes['UpdateReminderSuccess']
  UpdateReminderSuccess: ResolverTypeWrapper<UpdateReminderSuccess>
  UpdateSharedCommentError: ResolverTypeWrapper<UpdateSharedCommentError>
  UpdateSharedCommentErrorCode: UpdateSharedCommentErrorCode
  UpdateSharedCommentInput: UpdateSharedCommentInput
  UpdateSharedCommentResult:
    | ResolversTypes['UpdateSharedCommentError']
    | ResolversTypes['UpdateSharedCommentSuccess']
  UpdateSharedCommentSuccess: ResolverTypeWrapper<UpdateSharedCommentSuccess>
  UpdateUserError: ResolverTypeWrapper<UpdateUserError>
  UpdateUserErrorCode: UpdateUserErrorCode
  UpdateUserInput: UpdateUserInput
  UpdateUserProfileError: ResolverTypeWrapper<UpdateUserProfileError>
  UpdateUserProfileErrorCode: UpdateUserProfileErrorCode
  UpdateUserProfileInput: UpdateUserProfileInput
  UpdateUserProfileResult:
    | ResolversTypes['UpdateUserProfileError']
    | ResolversTypes['UpdateUserProfileSuccess']
  UpdateUserProfileSuccess: ResolverTypeWrapper<UpdateUserProfileSuccess>
  UpdateUserResult:
    | ResolversTypes['UpdateUserError']
    | ResolversTypes['UpdateUserSuccess']
  UpdateUserSuccess: ResolverTypeWrapper<UpdateUserSuccess>
  UpdatesSinceError: ResolverTypeWrapper<UpdatesSinceError>
  UpdatesSinceErrorCode: UpdatesSinceErrorCode
  UpdatesSinceResult:
    | ResolversTypes['UpdatesSinceError']
    | ResolversTypes['UpdatesSinceSuccess']
  UpdatesSinceSuccess: ResolverTypeWrapper<UpdatesSinceSuccess>
  UploadFileRequestError: ResolverTypeWrapper<UploadFileRequestError>
  UploadFileRequestErrorCode: UploadFileRequestErrorCode
  UploadFileRequestInput: UploadFileRequestInput
  UploadFileRequestResult:
    | ResolversTypes['UploadFileRequestError']
    | ResolversTypes['UploadFileRequestSuccess']
  UploadFileRequestSuccess: ResolverTypeWrapper<UploadFileRequestSuccess>
  UploadFileStatus: UploadFileStatus
  User: ResolverTypeWrapper<User>
  UserError: ResolverTypeWrapper<UserError>
  UserErrorCode: UserErrorCode
  UserPersonalization: ResolverTypeWrapper<UserPersonalization>
  UserResult: ResolversTypes['UserError'] | ResolversTypes['UserSuccess']
  UserSuccess: ResolverTypeWrapper<UserSuccess>
  UsersError: ResolverTypeWrapper<UsersError>
  UsersErrorCode: UsersErrorCode
  UsersResult: ResolversTypes['UsersError'] | ResolversTypes['UsersSuccess']
  UsersSuccess: ResolverTypeWrapper<UsersSuccess>
  Webhook: ResolverTypeWrapper<Webhook>
  WebhookError: ResolverTypeWrapper<WebhookError>
  WebhookErrorCode: WebhookErrorCode
  WebhookEvent: WebhookEvent
  WebhookResult:
    | ResolversTypes['WebhookError']
    | ResolversTypes['WebhookSuccess']
  WebhookSuccess: ResolverTypeWrapper<WebhookSuccess>
  WebhooksError: ResolverTypeWrapper<WebhooksError>
  WebhooksErrorCode: WebhooksErrorCode
  WebhooksResult:
    | ResolversTypes['WebhooksError']
    | ResolversTypes['WebhooksSuccess']
  WebhooksSuccess: ResolverTypeWrapper<WebhooksSuccess>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddPopularReadError: AddPopularReadError
  AddPopularReadResult:
    | ResolversParentTypes['AddPopularReadError']
    | ResolversParentTypes['AddPopularReadSuccess']
  AddPopularReadSuccess: AddPopularReadSuccess
  ApiKey: ApiKey
  ApiKeysError: ApiKeysError
  ApiKeysResult:
    | ResolversParentTypes['ApiKeysError']
    | ResolversParentTypes['ApiKeysSuccess']
  ApiKeysSuccess: ApiKeysSuccess
  ArchiveLinkError: ArchiveLinkError
  ArchiveLinkInput: ArchiveLinkInput
  ArchiveLinkResult:
    | ResolversParentTypes['ArchiveLinkError']
    | ResolversParentTypes['ArchiveLinkSuccess']
  ArchiveLinkSuccess: ArchiveLinkSuccess
  Article: Article
  ArticleEdge: ArticleEdge
  ArticleError: ArticleError
  ArticleHighlightsInput: ArticleHighlightsInput
  ArticleResult:
    | ResolversParentTypes['ArticleError']
    | ResolversParentTypes['ArticleSuccess']
  ArticleSavingRequest: ArticleSavingRequest
  ArticleSavingRequestError: ArticleSavingRequestError
  ArticleSavingRequestResult:
    | ResolversParentTypes['ArticleSavingRequestError']
    | ResolversParentTypes['ArticleSavingRequestSuccess']
  ArticleSavingRequestSuccess: ArticleSavingRequestSuccess
  ArticleSuccess: ArticleSuccess
  ArticlesError: ArticlesError
  ArticlesResult:
    | ResolversParentTypes['ArticlesError']
    | ResolversParentTypes['ArticlesSuccess']
  ArticlesSuccess: ArticlesSuccess
  Boolean: Scalars['Boolean']
  CreateArticleError: CreateArticleError
  CreateArticleInput: CreateArticleInput
  CreateArticleResult:
    | ResolversParentTypes['CreateArticleError']
    | ResolversParentTypes['CreateArticleSuccess']
  CreateArticleSavingRequestError: CreateArticleSavingRequestError
  CreateArticleSavingRequestInput: CreateArticleSavingRequestInput
  CreateArticleSavingRequestResult:
    | ResolversParentTypes['CreateArticleSavingRequestError']
    | ResolversParentTypes['CreateArticleSavingRequestSuccess']
  CreateArticleSavingRequestSuccess: CreateArticleSavingRequestSuccess
  CreateArticleSuccess: CreateArticleSuccess
  CreateHighlightError: CreateHighlightError
  CreateHighlightInput: CreateHighlightInput
  CreateHighlightReplyError: CreateHighlightReplyError
  CreateHighlightReplyInput: CreateHighlightReplyInput
  CreateHighlightReplyResult:
    | ResolversParentTypes['CreateHighlightReplyError']
    | ResolversParentTypes['CreateHighlightReplySuccess']
  CreateHighlightReplySuccess: CreateHighlightReplySuccess
  CreateHighlightResult:
    | ResolversParentTypes['CreateHighlightError']
    | ResolversParentTypes['CreateHighlightSuccess']
  CreateHighlightSuccess: CreateHighlightSuccess
  CreateLabelError: CreateLabelError
  CreateLabelInput: CreateLabelInput
  CreateLabelResult:
    | ResolversParentTypes['CreateLabelError']
    | ResolversParentTypes['CreateLabelSuccess']
  CreateLabelSuccess: CreateLabelSuccess
  CreateNewsletterEmailError: CreateNewsletterEmailError
  CreateNewsletterEmailResult:
    | ResolversParentTypes['CreateNewsletterEmailError']
    | ResolversParentTypes['CreateNewsletterEmailSuccess']
  CreateNewsletterEmailSuccess: CreateNewsletterEmailSuccess
  CreateReactionError: CreateReactionError
  CreateReactionInput: CreateReactionInput
  CreateReactionResult:
    | ResolversParentTypes['CreateReactionError']
    | ResolversParentTypes['CreateReactionSuccess']
  CreateReactionSuccess: CreateReactionSuccess
  CreateReminderError: CreateReminderError
  CreateReminderInput: CreateReminderInput
  CreateReminderResult:
    | ResolversParentTypes['CreateReminderError']
    | ResolversParentTypes['CreateReminderSuccess']
  CreateReminderSuccess: CreateReminderSuccess
  Date: Scalars['Date']
  DeleteAccountError: DeleteAccountError
  DeleteAccountResult:
    | ResolversParentTypes['DeleteAccountError']
    | ResolversParentTypes['DeleteAccountSuccess']
  DeleteAccountSuccess: DeleteAccountSuccess
  DeleteHighlightError: DeleteHighlightError
  DeleteHighlightReplyError: DeleteHighlightReplyError
  DeleteHighlightReplyResult:
    | ResolversParentTypes['DeleteHighlightReplyError']
    | ResolversParentTypes['DeleteHighlightReplySuccess']
  DeleteHighlightReplySuccess: DeleteHighlightReplySuccess
  DeleteHighlightResult:
    | ResolversParentTypes['DeleteHighlightError']
    | ResolversParentTypes['DeleteHighlightSuccess']
  DeleteHighlightSuccess: DeleteHighlightSuccess
  DeleteIntegrationError: DeleteIntegrationError
  DeleteIntegrationResult:
    | ResolversParentTypes['DeleteIntegrationError']
    | ResolversParentTypes['DeleteIntegrationSuccess']
  DeleteIntegrationSuccess: DeleteIntegrationSuccess
  DeleteLabelError: DeleteLabelError
  DeleteLabelResult:
    | ResolversParentTypes['DeleteLabelError']
    | ResolversParentTypes['DeleteLabelSuccess']
  DeleteLabelSuccess: DeleteLabelSuccess
  DeleteNewsletterEmailError: DeleteNewsletterEmailError
  DeleteNewsletterEmailResult:
    | ResolversParentTypes['DeleteNewsletterEmailError']
    | ResolversParentTypes['DeleteNewsletterEmailSuccess']
  DeleteNewsletterEmailSuccess: DeleteNewsletterEmailSuccess
  DeleteReactionError: DeleteReactionError
  DeleteReactionResult:
    | ResolversParentTypes['DeleteReactionError']
    | ResolversParentTypes['DeleteReactionSuccess']
  DeleteReactionSuccess: DeleteReactionSuccess
  DeleteReminderError: DeleteReminderError
  DeleteReminderResult:
    | ResolversParentTypes['DeleteReminderError']
    | ResolversParentTypes['DeleteReminderSuccess']
  DeleteReminderSuccess: DeleteReminderSuccess
  DeleteWebhookError: DeleteWebhookError
  DeleteWebhookResult:
    | ResolversParentTypes['DeleteWebhookError']
    | ResolversParentTypes['DeleteWebhookSuccess']
  DeleteWebhookSuccess: DeleteWebhookSuccess
  DeviceToken: DeviceToken
  FeedArticle: FeedArticle
  FeedArticleEdge: FeedArticleEdge
  FeedArticlesError: FeedArticlesError
  FeedArticlesResult:
    | ResolversParentTypes['FeedArticlesError']
    | ResolversParentTypes['FeedArticlesSuccess']
  FeedArticlesSuccess: FeedArticlesSuccess
  Float: Scalars['Float']
  GenerateApiKeyError: GenerateApiKeyError
  GenerateApiKeyInput: GenerateApiKeyInput
  GenerateApiKeyResult:
    | ResolversParentTypes['GenerateApiKeyError']
    | ResolversParentTypes['GenerateApiKeySuccess']
  GenerateApiKeySuccess: GenerateApiKeySuccess
  GetFollowersError: GetFollowersError
  GetFollowersResult:
    | ResolversParentTypes['GetFollowersError']
    | ResolversParentTypes['GetFollowersSuccess']
  GetFollowersSuccess: GetFollowersSuccess
  GetFollowingError: GetFollowingError
  GetFollowingResult:
    | ResolversParentTypes['GetFollowingError']
    | ResolversParentTypes['GetFollowingSuccess']
  GetFollowingSuccess: GetFollowingSuccess
  GetUserPersonalizationError: GetUserPersonalizationError
  GetUserPersonalizationResult:
    | ResolversParentTypes['GetUserPersonalizationError']
    | ResolversParentTypes['GetUserPersonalizationSuccess']
  GetUserPersonalizationSuccess: GetUserPersonalizationSuccess
  GoogleLoginInput: GoogleLoginInput
  GoogleSignupError: GoogleSignupError
  GoogleSignupInput: GoogleSignupInput
  GoogleSignupResult:
    | ResolversParentTypes['GoogleSignupError']
    | ResolversParentTypes['GoogleSignupSuccess']
  GoogleSignupSuccess: GoogleSignupSuccess
  Highlight: Highlight
  HighlightReply: HighlightReply
  HighlightStats: HighlightStats
  ID: Scalars['ID']
  Int: Scalars['Int']
  Integration: Integration
  IntegrationsError: IntegrationsError
  IntegrationsResult:
    | ResolversParentTypes['IntegrationsError']
    | ResolversParentTypes['IntegrationsSuccess']
  IntegrationsSuccess: IntegrationsSuccess
  Label: Label
  LabelsError: LabelsError
  LabelsResult:
    | ResolversParentTypes['LabelsError']
    | ResolversParentTypes['LabelsSuccess']
  LabelsSuccess: LabelsSuccess
  Link: Link
  LinkShareInfo: LinkShareInfo
  LogOutError: LogOutError
  LogOutResult:
    | ResolversParentTypes['LogOutError']
    | ResolversParentTypes['LogOutSuccess']
  LogOutSuccess: LogOutSuccess
  LoginError: LoginError
  LoginResult:
    | ResolversParentTypes['LoginError']
    | ResolversParentTypes['LoginSuccess']
  LoginSuccess: LoginSuccess
  MergeHighlightError: MergeHighlightError
  MergeHighlightInput: MergeHighlightInput
  MergeHighlightResult:
    | ResolversParentTypes['MergeHighlightError']
    | ResolversParentTypes['MergeHighlightSuccess']
  MergeHighlightSuccess: MergeHighlightSuccess
  MoveLabelError: MoveLabelError
  MoveLabelInput: MoveLabelInput
  MoveLabelResult:
    | ResolversParentTypes['MoveLabelError']
    | ResolversParentTypes['MoveLabelSuccess']
  MoveLabelSuccess: MoveLabelSuccess
  Mutation: {}
  NewsletterEmail: NewsletterEmail
  NewsletterEmailsError: NewsletterEmailsError
  NewsletterEmailsResult:
    | ResolversParentTypes['NewsletterEmailsError']
    | ResolversParentTypes['NewsletterEmailsSuccess']
  NewsletterEmailsSuccess: NewsletterEmailsSuccess
  Page: Page
  PageInfo: PageInfo
  PageInfoInput: PageInfoInput
  PreparedDocumentInput: PreparedDocumentInput
  Profile: Profile
  Query: {}
  Reaction: Reaction
  ReadState: ReadState
  Reminder: Reminder
  ReminderError: ReminderError
  ReminderResult:
    | ResolversParentTypes['ReminderError']
    | ResolversParentTypes['ReminderSuccess']
  ReminderSuccess: ReminderSuccess
  ReportItemInput: ReportItemInput
  ReportItemResult: ReportItemResult
  RevokeApiKeyError: RevokeApiKeyError
  RevokeApiKeyResult:
    | ResolversParentTypes['RevokeApiKeyError']
    | ResolversParentTypes['RevokeApiKeySuccess']
  RevokeApiKeySuccess: RevokeApiKeySuccess
  SaveArticleReadingProgressError: SaveArticleReadingProgressError
  SaveArticleReadingProgressInput: SaveArticleReadingProgressInput
  SaveArticleReadingProgressResult:
    | ResolversParentTypes['SaveArticleReadingProgressError']
    | ResolversParentTypes['SaveArticleReadingProgressSuccess']
  SaveArticleReadingProgressSuccess: SaveArticleReadingProgressSuccess
  SaveError: SaveError
  SaveFileInput: SaveFileInput
  SavePageInput: SavePageInput
  SaveResult:
    | ResolversParentTypes['SaveError']
    | ResolversParentTypes['SaveSuccess']
  SaveSuccess: SaveSuccess
  SaveUrlInput: SaveUrlInput
  SearchError: SearchError
  SearchItem: SearchItem
  SearchItemEdge: SearchItemEdge
  SearchResult:
    | ResolversParentTypes['SearchError']
    | ResolversParentTypes['SearchSuccess']
  SearchSuccess: SearchSuccess
  SendInstallInstructionsError: SendInstallInstructionsError
  SendInstallInstructionsResult:
    | ResolversParentTypes['SendInstallInstructionsError']
    | ResolversParentTypes['SendInstallInstructionsSuccess']
  SendInstallInstructionsSuccess: SendInstallInstructionsSuccess
  SetBookmarkArticleError: SetBookmarkArticleError
  SetBookmarkArticleInput: SetBookmarkArticleInput
  SetBookmarkArticleResult:
    | ResolversParentTypes['SetBookmarkArticleError']
    | ResolversParentTypes['SetBookmarkArticleSuccess']
  SetBookmarkArticleSuccess: SetBookmarkArticleSuccess
  SetDeviceTokenError: SetDeviceTokenError
  SetDeviceTokenInput: SetDeviceTokenInput
  SetDeviceTokenResult:
    | ResolversParentTypes['SetDeviceTokenError']
    | ResolversParentTypes['SetDeviceTokenSuccess']
  SetDeviceTokenSuccess: SetDeviceTokenSuccess
  SetFollowError: SetFollowError
  SetFollowInput: SetFollowInput
  SetFollowResult:
    | ResolversParentTypes['SetFollowError']
    | ResolversParentTypes['SetFollowSuccess']
  SetFollowSuccess: SetFollowSuccess
  SetIntegrationError: SetIntegrationError
  SetIntegrationInput: SetIntegrationInput
  SetIntegrationResult:
    | ResolversParentTypes['SetIntegrationError']
    | ResolversParentTypes['SetIntegrationSuccess']
  SetIntegrationSuccess: SetIntegrationSuccess
  SetLabelsError: SetLabelsError
  SetLabelsForHighlightInput: SetLabelsForHighlightInput
  SetLabelsInput: SetLabelsInput
  SetLabelsResult:
    | ResolversParentTypes['SetLabelsError']
    | ResolversParentTypes['SetLabelsSuccess']
  SetLabelsSuccess: SetLabelsSuccess
  SetShareArticleError: SetShareArticleError
  SetShareArticleInput: SetShareArticleInput
  SetShareArticleResult:
    | ResolversParentTypes['SetShareArticleError']
    | ResolversParentTypes['SetShareArticleSuccess']
  SetShareArticleSuccess: SetShareArticleSuccess
  SetShareHighlightError: SetShareHighlightError
  SetShareHighlightInput: SetShareHighlightInput
  SetShareHighlightResult:
    | ResolversParentTypes['SetShareHighlightError']
    | ResolversParentTypes['SetShareHighlightSuccess']
  SetShareHighlightSuccess: SetShareHighlightSuccess
  SetUserPersonalizationError: SetUserPersonalizationError
  SetUserPersonalizationInput: SetUserPersonalizationInput
  SetUserPersonalizationResult:
    | ResolversParentTypes['SetUserPersonalizationError']
    | ResolversParentTypes['SetUserPersonalizationSuccess']
  SetUserPersonalizationSuccess: SetUserPersonalizationSuccess
  SetWebhookError: SetWebhookError
  SetWebhookInput: SetWebhookInput
  SetWebhookResult:
    | ResolversParentTypes['SetWebhookError']
    | ResolversParentTypes['SetWebhookSuccess']
  SetWebhookSuccess: SetWebhookSuccess
  ShareStats: ShareStats
  SharedArticleError: SharedArticleError
  SharedArticleResult:
    | ResolversParentTypes['SharedArticleError']
    | ResolversParentTypes['SharedArticleSuccess']
  SharedArticleSuccess: SharedArticleSuccess
  SortParams: SortParams
  String: Scalars['String']
  SubscribeError: SubscribeError
  SubscribeResult:
    | ResolversParentTypes['SubscribeError']
    | ResolversParentTypes['SubscribeSuccess']
  SubscribeSuccess: SubscribeSuccess
  Subscription: {}
  SubscriptionsError: SubscriptionsError
  SubscriptionsResult:
    | ResolversParentTypes['SubscriptionsError']
    | ResolversParentTypes['SubscriptionsSuccess']
  SubscriptionsSuccess: SubscriptionsSuccess
  SyncUpdatedItemEdge: SyncUpdatedItemEdge
  TypeaheadSearchError: TypeaheadSearchError
  TypeaheadSearchItem: TypeaheadSearchItem
  TypeaheadSearchResult:
    | ResolversParentTypes['TypeaheadSearchError']
    | ResolversParentTypes['TypeaheadSearchSuccess']
  TypeaheadSearchSuccess: TypeaheadSearchSuccess
  UnsubscribeError: UnsubscribeError
  UnsubscribeResult:
    | ResolversParentTypes['UnsubscribeError']
    | ResolversParentTypes['UnsubscribeSuccess']
  UnsubscribeSuccess: UnsubscribeSuccess
  UpdateHighlightError: UpdateHighlightError
  UpdateHighlightInput: UpdateHighlightInput
  UpdateHighlightReplyError: UpdateHighlightReplyError
  UpdateHighlightReplyInput: UpdateHighlightReplyInput
  UpdateHighlightReplyResult:
    | ResolversParentTypes['UpdateHighlightReplyError']
    | ResolversParentTypes['UpdateHighlightReplySuccess']
  UpdateHighlightReplySuccess: UpdateHighlightReplySuccess
  UpdateHighlightResult:
    | ResolversParentTypes['UpdateHighlightError']
    | ResolversParentTypes['UpdateHighlightSuccess']
  UpdateHighlightSuccess: UpdateHighlightSuccess
  UpdateLabelError: UpdateLabelError
  UpdateLabelInput: UpdateLabelInput
  UpdateLabelResult:
    | ResolversParentTypes['UpdateLabelError']
    | ResolversParentTypes['UpdateLabelSuccess']
  UpdateLabelSuccess: UpdateLabelSuccess
  UpdateLinkShareInfoError: UpdateLinkShareInfoError
  UpdateLinkShareInfoInput: UpdateLinkShareInfoInput
  UpdateLinkShareInfoResult:
    | ResolversParentTypes['UpdateLinkShareInfoError']
    | ResolversParentTypes['UpdateLinkShareInfoSuccess']
  UpdateLinkShareInfoSuccess: UpdateLinkShareInfoSuccess
  UpdatePageError: UpdatePageError
  UpdatePageInput: UpdatePageInput
  UpdatePageResult:
    | ResolversParentTypes['UpdatePageError']
    | ResolversParentTypes['UpdatePageSuccess']
  UpdatePageSuccess: UpdatePageSuccess
  UpdateReminderError: UpdateReminderError
  UpdateReminderInput: UpdateReminderInput
  UpdateReminderResult:
    | ResolversParentTypes['UpdateReminderError']
    | ResolversParentTypes['UpdateReminderSuccess']
  UpdateReminderSuccess: UpdateReminderSuccess
  UpdateSharedCommentError: UpdateSharedCommentError
  UpdateSharedCommentInput: UpdateSharedCommentInput
  UpdateSharedCommentResult:
    | ResolversParentTypes['UpdateSharedCommentError']
    | ResolversParentTypes['UpdateSharedCommentSuccess']
  UpdateSharedCommentSuccess: UpdateSharedCommentSuccess
  UpdateUserError: UpdateUserError
  UpdateUserInput: UpdateUserInput
  UpdateUserProfileError: UpdateUserProfileError
  UpdateUserProfileInput: UpdateUserProfileInput
  UpdateUserProfileResult:
    | ResolversParentTypes['UpdateUserProfileError']
    | ResolversParentTypes['UpdateUserProfileSuccess']
  UpdateUserProfileSuccess: UpdateUserProfileSuccess
  UpdateUserResult:
    | ResolversParentTypes['UpdateUserError']
    | ResolversParentTypes['UpdateUserSuccess']
  UpdateUserSuccess: UpdateUserSuccess
  UpdatesSinceError: UpdatesSinceError
  UpdatesSinceResult:
    | ResolversParentTypes['UpdatesSinceError']
    | ResolversParentTypes['UpdatesSinceSuccess']
  UpdatesSinceSuccess: UpdatesSinceSuccess
  UploadFileRequestError: UploadFileRequestError
  UploadFileRequestInput: UploadFileRequestInput
  UploadFileRequestResult:
    | ResolversParentTypes['UploadFileRequestError']
    | ResolversParentTypes['UploadFileRequestSuccess']
  UploadFileRequestSuccess: UploadFileRequestSuccess
  User: User
  UserError: UserError
  UserPersonalization: UserPersonalization
  UserResult:
    | ResolversParentTypes['UserError']
    | ResolversParentTypes['UserSuccess']
  UserSuccess: UserSuccess
  UsersError: UsersError
  UsersResult:
    | ResolversParentTypes['UsersError']
    | ResolversParentTypes['UsersSuccess']
  UsersSuccess: UsersSuccess
  Webhook: Webhook
  WebhookError: WebhookError
  WebhookResult:
    | ResolversParentTypes['WebhookError']
    | ResolversParentTypes['WebhookSuccess']
  WebhookSuccess: WebhookSuccess
  WebhooksError: WebhooksError
  WebhooksResult:
    | ResolversParentTypes['WebhooksError']
    | ResolversParentTypes['WebhooksSuccess']
  WebhooksSuccess: WebhooksSuccess
}

export type SanitizeDirectiveArgs = {
  allowedTags?: Maybe<Array<Maybe<Scalars['String']>>>
  maxLength?: Maybe<Scalars['Int']>
  pattern?: Maybe<Scalars['String']>
}

export type SanitizeDirectiveResolver<
  Result,
  Parent,
  ContextType = ResolverContext,
  Args = SanitizeDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AddPopularReadErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['AddPopularReadError'] = ResolversParentTypes['AddPopularReadError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['AddPopularReadErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AddPopularReadResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['AddPopularReadResult'] = ResolversParentTypes['AddPopularReadResult']
> = {
  __resolveType: TypeResolveFn<
    'AddPopularReadError' | 'AddPopularReadSuccess',
    ParentType,
    ContextType
  >
}

export type AddPopularReadSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['AddPopularReadSuccess'] = ResolversParentTypes['AddPopularReadSuccess']
> = {
  pageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ApiKeyResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ApiKey'] = ResolversParentTypes['ApiKey']
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  expiresAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  scopes?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >
  usedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ApiKeysErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ApiKeysError'] = ResolversParentTypes['ApiKeysError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['ApiKeysErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ApiKeysResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ApiKeysResult'] = ResolversParentTypes['ApiKeysResult']
> = {
  __resolveType: TypeResolveFn<
    'ApiKeysError' | 'ApiKeysSuccess',
    ParentType,
    ContextType
  >
}

export type ApiKeysSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ApiKeysSuccess'] = ResolversParentTypes['ApiKeysSuccess']
> = {
  apiKeys?: Resolver<Array<ResolversTypes['ApiKey']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArchiveLinkErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArchiveLinkError'] = ResolversParentTypes['ArchiveLinkError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['ArchiveLinkErrorCode']>,
    ParentType,
    ContextType
  >
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArchiveLinkResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArchiveLinkResult'] = ResolversParentTypes['ArchiveLinkResult']
> = {
  __resolveType: TypeResolveFn<
    'ArchiveLinkError' | 'ArchiveLinkSuccess',
    ParentType,
    ContextType
  >
}

export type ArchiveLinkSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArchiveLinkSuccess'] = ResolversParentTypes['ArchiveLinkSuccess']
> = {
  linkId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']
> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  contentReader?: Resolver<
    ResolversTypes['ContentReader'],
    ParentType,
    ContextType
  >
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  hasContent?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  highlights?: Resolver<
    Array<ResolversTypes['Highlight']>,
    ParentType,
    ContextType,
    Partial<ArticleHighlightsArgs>
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isArchived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  labels?: Resolver<
    Maybe<Array<ResolversTypes['Label']>>,
    ParentType,
    ContextType
  >
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  linkId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  originalArticleUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  originalHtml?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  pageType?: Resolver<
    Maybe<ResolversTypes['PageType']>,
    ParentType,
    ContextType
  >
  postedByViewer?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  readAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  readingProgressAnchorIndex?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >
  readingProgressPercent?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >
  savedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  savedByViewer?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  shareInfo?: Resolver<
    Maybe<ResolversTypes['LinkShareInfo']>,
    ParentType,
    ContextType
  >
  sharedComment?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  siteIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  state?: Resolver<
    Maybe<ResolversTypes['ArticleSavingRequestStatus']>,
    ParentType,
    ContextType
  >
  subscription?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  unsubHttpUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  unsubMailTo?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  uploadFileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleEdge'] = ResolversParentTypes['ArticleEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleError'] = ResolversParentTypes['ArticleError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['ArticleErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleResult'] = ResolversParentTypes['ArticleResult']
> = {
  __resolveType: TypeResolveFn<
    'ArticleError' | 'ArticleSuccess',
    ParentType,
    ContextType
  >
}

export type ArticleSavingRequestResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleSavingRequest'] = ResolversParentTypes['ArticleSavingRequest']
> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  errorCode?: Resolver<
    Maybe<ResolversTypes['CreateArticleErrorCode']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<
    ResolversTypes['ArticleSavingRequestStatus'],
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleSavingRequestErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleSavingRequestError'] = ResolversParentTypes['ArticleSavingRequestError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['ArticleSavingRequestErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleSavingRequestResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleSavingRequestResult'] = ResolversParentTypes['ArticleSavingRequestResult']
> = {
  __resolveType: TypeResolveFn<
    'ArticleSavingRequestError' | 'ArticleSavingRequestSuccess',
    ParentType,
    ContextType
  >
}

export type ArticleSavingRequestSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleSavingRequestSuccess'] = ResolversParentTypes['ArticleSavingRequestSuccess']
> = {
  articleSavingRequest?: Resolver<
    ResolversTypes['ArticleSavingRequest'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticleSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticleSuccess'] = ResolversParentTypes['ArticleSuccess']
> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticlesErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticlesError'] = ResolversParentTypes['ArticlesError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['ArticlesErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ArticlesResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticlesResult'] = ResolversParentTypes['ArticlesResult']
> = {
  __resolveType: TypeResolveFn<
    'ArticlesError' | 'ArticlesSuccess',
    ParentType,
    ContextType
  >
}

export type ArticlesSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ArticlesSuccess'] = ResolversParentTypes['ArticlesSuccess']
> = {
  edges?: Resolver<
    Array<ResolversTypes['ArticleEdge']>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateArticleErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateArticleError'] = ResolversParentTypes['CreateArticleError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateArticleErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateArticleResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateArticleResult'] = ResolversParentTypes['CreateArticleResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateArticleError' | 'CreateArticleSuccess',
    ParentType,
    ContextType
  >
}

export type CreateArticleSavingRequestErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateArticleSavingRequestError'] = ResolversParentTypes['CreateArticleSavingRequestError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateArticleSavingRequestErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateArticleSavingRequestResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateArticleSavingRequestResult'] = ResolversParentTypes['CreateArticleSavingRequestResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateArticleSavingRequestError' | 'CreateArticleSavingRequestSuccess',
    ParentType,
    ContextType
  >
}

export type CreateArticleSavingRequestSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateArticleSavingRequestSuccess'] = ResolversParentTypes['CreateArticleSavingRequestSuccess']
> = {
  articleSavingRequest?: Resolver<
    ResolversTypes['ArticleSavingRequest'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateArticleSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateArticleSuccess'] = ResolversParentTypes['CreateArticleSuccess']
> = {
  created?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateHighlightErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateHighlightError'] = ResolversParentTypes['CreateHighlightError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateHighlightErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateHighlightReplyErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateHighlightReplyError'] = ResolversParentTypes['CreateHighlightReplyError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateHighlightReplyErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateHighlightReplyResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateHighlightReplyResult'] = ResolversParentTypes['CreateHighlightReplyResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateHighlightReplyError' | 'CreateHighlightReplySuccess',
    ParentType,
    ContextType
  >
}

export type CreateHighlightReplySuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateHighlightReplySuccess'] = ResolversParentTypes['CreateHighlightReplySuccess']
> = {
  highlightReply?: Resolver<
    ResolversTypes['HighlightReply'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateHighlightResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateHighlightResult'] = ResolversParentTypes['CreateHighlightResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateHighlightError' | 'CreateHighlightSuccess',
    ParentType,
    ContextType
  >
}

export type CreateHighlightSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateHighlightSuccess'] = ResolversParentTypes['CreateHighlightSuccess']
> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateLabelErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateLabelError'] = ResolversParentTypes['CreateLabelError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateLabelErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateLabelResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateLabelResult'] = ResolversParentTypes['CreateLabelResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateLabelError' | 'CreateLabelSuccess',
    ParentType,
    ContextType
  >
}

export type CreateLabelSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateLabelSuccess'] = ResolversParentTypes['CreateLabelSuccess']
> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateNewsletterEmailErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateNewsletterEmailError'] = ResolversParentTypes['CreateNewsletterEmailError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateNewsletterEmailErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateNewsletterEmailResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateNewsletterEmailResult'] = ResolversParentTypes['CreateNewsletterEmailResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateNewsletterEmailError' | 'CreateNewsletterEmailSuccess',
    ParentType,
    ContextType
  >
}

export type CreateNewsletterEmailSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateNewsletterEmailSuccess'] = ResolversParentTypes['CreateNewsletterEmailSuccess']
> = {
  newsletterEmail?: Resolver<
    ResolversTypes['NewsletterEmail'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateReactionErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateReactionError'] = ResolversParentTypes['CreateReactionError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateReactionErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateReactionResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateReactionResult'] = ResolversParentTypes['CreateReactionResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateReactionError' | 'CreateReactionSuccess',
    ParentType,
    ContextType
  >
}

export type CreateReactionSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateReactionSuccess'] = ResolversParentTypes['CreateReactionSuccess']
> = {
  reaction?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateReminderErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateReminderError'] = ResolversParentTypes['CreateReminderError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['CreateReminderErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateReminderResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateReminderResult'] = ResolversParentTypes['CreateReminderResult']
> = {
  __resolveType: TypeResolveFn<
    'CreateReminderError' | 'CreateReminderSuccess',
    ParentType,
    ContextType
  >
}

export type CreateReminderSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['CreateReminderSuccess'] = ResolversParentTypes['CreateReminderSuccess']
> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DeleteAccountErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteAccountError'] = ResolversParentTypes['DeleteAccountError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteAccountErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteAccountResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteAccountResult'] = ResolversParentTypes['DeleteAccountResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteAccountError' | 'DeleteAccountSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteAccountSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteAccountSuccess'] = ResolversParentTypes['DeleteAccountSuccess']
> = {
  userID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteHighlightErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteHighlightError'] = ResolversParentTypes['DeleteHighlightError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteHighlightErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteHighlightReplyErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteHighlightReplyError'] = ResolversParentTypes['DeleteHighlightReplyError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteHighlightReplyErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteHighlightReplyResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteHighlightReplyResult'] = ResolversParentTypes['DeleteHighlightReplyResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteHighlightReplyError' | 'DeleteHighlightReplySuccess',
    ParentType,
    ContextType
  >
}

export type DeleteHighlightReplySuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteHighlightReplySuccess'] = ResolversParentTypes['DeleteHighlightReplySuccess']
> = {
  highlightReply?: Resolver<
    ResolversTypes['HighlightReply'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteHighlightResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteHighlightResult'] = ResolversParentTypes['DeleteHighlightResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteHighlightError' | 'DeleteHighlightSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteHighlightSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteHighlightSuccess'] = ResolversParentTypes['DeleteHighlightSuccess']
> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteIntegrationErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteIntegrationError'] = ResolversParentTypes['DeleteIntegrationError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteIntegrationErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteIntegrationResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteIntegrationResult'] = ResolversParentTypes['DeleteIntegrationResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteIntegrationError' | 'DeleteIntegrationSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteIntegrationSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteIntegrationSuccess'] = ResolversParentTypes['DeleteIntegrationSuccess']
> = {
  integration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteLabelErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteLabelError'] = ResolversParentTypes['DeleteLabelError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteLabelErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteLabelResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteLabelResult'] = ResolversParentTypes['DeleteLabelResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteLabelError' | 'DeleteLabelSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteLabelSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteLabelSuccess'] = ResolversParentTypes['DeleteLabelSuccess']
> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteNewsletterEmailErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteNewsletterEmailError'] = ResolversParentTypes['DeleteNewsletterEmailError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteNewsletterEmailErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteNewsletterEmailResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteNewsletterEmailResult'] = ResolversParentTypes['DeleteNewsletterEmailResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteNewsletterEmailError' | 'DeleteNewsletterEmailSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteNewsletterEmailSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteNewsletterEmailSuccess'] = ResolversParentTypes['DeleteNewsletterEmailSuccess']
> = {
  newsletterEmail?: Resolver<
    ResolversTypes['NewsletterEmail'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteReactionErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteReactionError'] = ResolversParentTypes['DeleteReactionError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteReactionErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteReactionResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteReactionResult'] = ResolversParentTypes['DeleteReactionResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteReactionError' | 'DeleteReactionSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteReactionSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteReactionSuccess'] = ResolversParentTypes['DeleteReactionSuccess']
> = {
  reaction?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteReminderErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteReminderError'] = ResolversParentTypes['DeleteReminderError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteReminderErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteReminderResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteReminderResult'] = ResolversParentTypes['DeleteReminderResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteReminderError' | 'DeleteReminderSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteReminderSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteReminderSuccess'] = ResolversParentTypes['DeleteReminderSuccess']
> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteWebhookErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteWebhookError'] = ResolversParentTypes['DeleteWebhookError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['DeleteWebhookErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteWebhookResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteWebhookResult'] = ResolversParentTypes['DeleteWebhookResult']
> = {
  __resolveType: TypeResolveFn<
    'DeleteWebhookError' | 'DeleteWebhookSuccess',
    ParentType,
    ContextType
  >
}

export type DeleteWebhookSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeleteWebhookSuccess'] = ResolversParentTypes['DeleteWebhookSuccess']
> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeviceTokenResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['DeviceToken'] = ResolversParentTypes['DeviceToken']
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FeedArticleResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['FeedArticle'] = ResolversParentTypes['FeedArticle']
> = {
  annotationsCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  highlight?: Resolver<
    Maybe<ResolversTypes['Highlight']>,
    ParentType,
    ContextType
  >
  highlightsCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  reactions?: Resolver<
    Array<ResolversTypes['Reaction']>,
    ParentType,
    ContextType
  >
  sharedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  sharedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  sharedComment?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  sharedWithHighlights?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FeedArticleEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['FeedArticleEdge'] = ResolversParentTypes['FeedArticleEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['FeedArticle'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FeedArticlesErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['FeedArticlesError'] = ResolversParentTypes['FeedArticlesError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['FeedArticlesErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FeedArticlesResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['FeedArticlesResult'] = ResolversParentTypes['FeedArticlesResult']
> = {
  __resolveType: TypeResolveFn<
    'FeedArticlesError' | 'FeedArticlesSuccess',
    ParentType,
    ContextType
  >
}

export type FeedArticlesSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['FeedArticlesSuccess'] = ResolversParentTypes['FeedArticlesSuccess']
> = {
  edges?: Resolver<
    Array<ResolversTypes['FeedArticleEdge']>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GenerateApiKeyErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GenerateApiKeyError'] = ResolversParentTypes['GenerateApiKeyError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['GenerateApiKeyErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GenerateApiKeyResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GenerateApiKeyResult'] = ResolversParentTypes['GenerateApiKeyResult']
> = {
  __resolveType: TypeResolveFn<
    'GenerateApiKeyError' | 'GenerateApiKeySuccess',
    ParentType,
    ContextType
  >
}

export type GenerateApiKeySuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GenerateApiKeySuccess'] = ResolversParentTypes['GenerateApiKeySuccess']
> = {
  apiKey?: Resolver<ResolversTypes['ApiKey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetFollowersErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetFollowersError'] = ResolversParentTypes['GetFollowersError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['GetFollowersErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetFollowersResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetFollowersResult'] = ResolversParentTypes['GetFollowersResult']
> = {
  __resolveType: TypeResolveFn<
    'GetFollowersError' | 'GetFollowersSuccess',
    ParentType,
    ContextType
  >
}

export type GetFollowersSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetFollowersSuccess'] = ResolversParentTypes['GetFollowersSuccess']
> = {
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetFollowingErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetFollowingError'] = ResolversParentTypes['GetFollowingError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['GetFollowingErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetFollowingResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetFollowingResult'] = ResolversParentTypes['GetFollowingResult']
> = {
  __resolveType: TypeResolveFn<
    'GetFollowingError' | 'GetFollowingSuccess',
    ParentType,
    ContextType
  >
}

export type GetFollowingSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetFollowingSuccess'] = ResolversParentTypes['GetFollowingSuccess']
> = {
  following?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetUserPersonalizationErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetUserPersonalizationError'] = ResolversParentTypes['GetUserPersonalizationError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['GetUserPersonalizationErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetUserPersonalizationResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetUserPersonalizationResult'] = ResolversParentTypes['GetUserPersonalizationResult']
> = {
  __resolveType: TypeResolveFn<
    'GetUserPersonalizationError' | 'GetUserPersonalizationSuccess',
    ParentType,
    ContextType
  >
}

export type GetUserPersonalizationSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GetUserPersonalizationSuccess'] = ResolversParentTypes['GetUserPersonalizationSuccess']
> = {
  userPersonalization?: Resolver<
    Maybe<ResolversTypes['UserPersonalization']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GoogleSignupErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GoogleSignupError'] = ResolversParentTypes['GoogleSignupError']
> = {
  errorCodes?: Resolver<
    Array<Maybe<ResolversTypes['SignupErrorCode']>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GoogleSignupResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GoogleSignupResult'] = ResolversParentTypes['GoogleSignupResult']
> = {
  __resolveType: TypeResolveFn<
    'GoogleSignupError' | 'GoogleSignupSuccess',
    ParentType,
    ContextType
  >
}

export type GoogleSignupSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['GoogleSignupSuccess'] = ResolversParentTypes['GoogleSignupSuccess']
> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HighlightResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Highlight'] = ResolversParentTypes['Highlight']
> = {
  annotation?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  createdByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  patch?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  quote?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  reactions?: Resolver<
    Array<ResolversTypes['Reaction']>,
    ParentType,
    ContextType
  >
  replies?: Resolver<
    Array<ResolversTypes['HighlightReply']>,
    ParentType,
    ContextType
  >
  sharedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  shortId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  suffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HighlightReplyResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['HighlightReply'] = ResolversParentTypes['HighlightReply']
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HighlightStatsResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['HighlightStats'] = ResolversParentTypes['HighlightStats']
> = {
  highlightCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type IntegrationResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Integration'] = ResolversParentTypes['Integration']
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['IntegrationType'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type IntegrationsErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['IntegrationsError'] = ResolversParentTypes['IntegrationsError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['IntegrationsErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type IntegrationsResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['IntegrationsResult'] = ResolversParentTypes['IntegrationsResult']
> = {
  __resolveType: TypeResolveFn<
    'IntegrationsError' | 'IntegrationsSuccess',
    ParentType,
    ContextType
  >
}

export type IntegrationsSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['IntegrationsSuccess'] = ResolversParentTypes['IntegrationsSuccess']
> = {
  integrations?: Resolver<
    Array<ResolversTypes['Integration']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LabelResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']
> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LabelsErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LabelsError'] = ResolversParentTypes['LabelsError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['LabelsErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LabelsResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LabelsResult'] = ResolversParentTypes['LabelsResult']
> = {
  __resolveType: TypeResolveFn<
    'LabelsError' | 'LabelsSuccess',
    ParentType,
    ContextType
  >
}

export type LabelsSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LabelsSuccess'] = ResolversParentTypes['LabelsSuccess']
> = {
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LinkResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']
> = {
  highlightStats?: Resolver<
    ResolversTypes['HighlightStats'],
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>
  postedByViewer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  readState?: Resolver<ResolversTypes['ReadState'], ParentType, ContextType>
  savedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  savedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  savedByViewer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  shareInfo?: Resolver<ResolversTypes['LinkShareInfo'], ParentType, ContextType>
  shareStats?: Resolver<ResolversTypes['ShareStats'], ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LinkShareInfoResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LinkShareInfo'] = ResolversParentTypes['LinkShareInfo']
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LogOutErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LogOutError'] = ResolversParentTypes['LogOutError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['LogOutErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LogOutResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LogOutResult'] = ResolversParentTypes['LogOutResult']
> = {
  __resolveType: TypeResolveFn<
    'LogOutError' | 'LogOutSuccess',
    ParentType,
    ContextType
  >
}

export type LogOutSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LogOutSuccess'] = ResolversParentTypes['LogOutSuccess']
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LoginErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['LoginErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LoginResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = {
  __resolveType: TypeResolveFn<
    'LoginError' | 'LoginSuccess',
    ParentType,
    ContextType
  >
}

export type LoginSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['LoginSuccess'] = ResolversParentTypes['LoginSuccess']
> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MergeHighlightErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['MergeHighlightError'] = ResolversParentTypes['MergeHighlightError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['MergeHighlightErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MergeHighlightResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['MergeHighlightResult'] = ResolversParentTypes['MergeHighlightResult']
> = {
  __resolveType: TypeResolveFn<
    'MergeHighlightError' | 'MergeHighlightSuccess',
    ParentType,
    ContextType
  >
}

export type MergeHighlightSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['MergeHighlightSuccess'] = ResolversParentTypes['MergeHighlightSuccess']
> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>
  overlapHighlightIdList?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MoveLabelErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['MoveLabelError'] = ResolversParentTypes['MoveLabelError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['MoveLabelErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MoveLabelResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['MoveLabelResult'] = ResolversParentTypes['MoveLabelResult']
> = {
  __resolveType: TypeResolveFn<
    'MoveLabelError' | 'MoveLabelSuccess',
    ParentType,
    ContextType
  >
}

export type MoveLabelSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['MoveLabelSuccess'] = ResolversParentTypes['MoveLabelSuccess']
> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addPopularRead?: Resolver<
    ResolversTypes['AddPopularReadResult'],
    ParentType,
    ContextType,
    RequireFields<MutationAddPopularReadArgs, 'name'>
  >
  createArticle?: Resolver<
    ResolversTypes['CreateArticleResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateArticleArgs, 'input'>
  >
  createArticleSavingRequest?: Resolver<
    ResolversTypes['CreateArticleSavingRequestResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateArticleSavingRequestArgs, 'input'>
  >
  createHighlight?: Resolver<
    ResolversTypes['CreateHighlightResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateHighlightArgs, 'input'>
  >
  createHighlightReply?: Resolver<
    ResolversTypes['CreateHighlightReplyResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateHighlightReplyArgs, 'input'>
  >
  createLabel?: Resolver<
    ResolversTypes['CreateLabelResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLabelArgs, 'input'>
  >
  createNewsletterEmail?: Resolver<
    ResolversTypes['CreateNewsletterEmailResult'],
    ParentType,
    ContextType
  >
  createReaction?: Resolver<
    ResolversTypes['CreateReactionResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReactionArgs, 'input'>
  >
  createReminder?: Resolver<
    ResolversTypes['CreateReminderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReminderArgs, 'input'>
  >
  deleteAccount?: Resolver<
    ResolversTypes['DeleteAccountResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAccountArgs, 'userID'>
  >
  deleteHighlight?: Resolver<
    ResolversTypes['DeleteHighlightResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteHighlightArgs, 'highlightId'>
  >
  deleteHighlightReply?: Resolver<
    ResolversTypes['DeleteHighlightReplyResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteHighlightReplyArgs, 'highlightReplyId'>
  >
  deleteIntegration?: Resolver<
    ResolversTypes['DeleteIntegrationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteIntegrationArgs, 'id'>
  >
  deleteLabel?: Resolver<
    ResolversTypes['DeleteLabelResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLabelArgs, 'id'>
  >
  deleteNewsletterEmail?: Resolver<
    ResolversTypes['DeleteNewsletterEmailResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteNewsletterEmailArgs, 'newsletterEmailId'>
  >
  deleteReaction?: Resolver<
    ResolversTypes['DeleteReactionResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteReactionArgs, 'id'>
  >
  deleteReminder?: Resolver<
    ResolversTypes['DeleteReminderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteReminderArgs, 'id'>
  >
  deleteWebhook?: Resolver<
    ResolversTypes['DeleteWebhookResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteWebhookArgs, 'id'>
  >
  generateApiKey?: Resolver<
    ResolversTypes['GenerateApiKeyResult'],
    ParentType,
    ContextType,
    RequireFields<MutationGenerateApiKeyArgs, 'input'>
  >
  googleLogin?: Resolver<
    ResolversTypes['LoginResult'],
    ParentType,
    ContextType,
    RequireFields<MutationGoogleLoginArgs, 'input'>
  >
  googleSignup?: Resolver<
    ResolversTypes['GoogleSignupResult'],
    ParentType,
    ContextType,
    RequireFields<MutationGoogleSignupArgs, 'input'>
  >
  logOut?: Resolver<ResolversTypes['LogOutResult'], ParentType, ContextType>
  mergeHighlight?: Resolver<
    ResolversTypes['MergeHighlightResult'],
    ParentType,
    ContextType,
    RequireFields<MutationMergeHighlightArgs, 'input'>
  >
  moveLabel?: Resolver<
    ResolversTypes['MoveLabelResult'],
    ParentType,
    ContextType,
    RequireFields<MutationMoveLabelArgs, 'input'>
  >
  reportItem?: Resolver<
    ResolversTypes['ReportItemResult'],
    ParentType,
    ContextType,
    RequireFields<MutationReportItemArgs, 'input'>
  >
  revokeApiKey?: Resolver<
    ResolversTypes['RevokeApiKeyResult'],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeApiKeyArgs, 'id'>
  >
  saveArticleReadingProgress?: Resolver<
    ResolversTypes['SaveArticleReadingProgressResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSaveArticleReadingProgressArgs, 'input'>
  >
  saveFile?: Resolver<
    ResolversTypes['SaveResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSaveFileArgs, 'input'>
  >
  savePage?: Resolver<
    ResolversTypes['SaveResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSavePageArgs, 'input'>
  >
  saveUrl?: Resolver<
    ResolversTypes['SaveResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSaveUrlArgs, 'input'>
  >
  setBookmarkArticle?: Resolver<
    ResolversTypes['SetBookmarkArticleResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetBookmarkArticleArgs, 'input'>
  >
  setDeviceToken?: Resolver<
    ResolversTypes['SetDeviceTokenResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetDeviceTokenArgs, 'input'>
  >
  setFollow?: Resolver<
    ResolversTypes['SetFollowResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetFollowArgs, 'input'>
  >
  setIntegration?: Resolver<
    ResolversTypes['SetIntegrationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetIntegrationArgs, 'input'>
  >
  setLabels?: Resolver<
    ResolversTypes['SetLabelsResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetLabelsArgs, 'input'>
  >
  setLabelsForHighlight?: Resolver<
    ResolversTypes['SetLabelsResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetLabelsForHighlightArgs, 'input'>
  >
  setLinkArchived?: Resolver<
    ResolversTypes['ArchiveLinkResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetLinkArchivedArgs, 'input'>
  >
  setShareArticle?: Resolver<
    ResolversTypes['SetShareArticleResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetShareArticleArgs, 'input'>
  >
  setShareHighlight?: Resolver<
    ResolversTypes['SetShareHighlightResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetShareHighlightArgs, 'input'>
  >
  setUserPersonalization?: Resolver<
    ResolversTypes['SetUserPersonalizationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetUserPersonalizationArgs, 'input'>
  >
  setWebhook?: Resolver<
    ResolversTypes['SetWebhookResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSetWebhookArgs, 'input'>
  >
  subscribe?: Resolver<
    ResolversTypes['SubscribeResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeArgs, 'name'>
  >
  unsubscribe?: Resolver<
    ResolversTypes['UnsubscribeResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUnsubscribeArgs, 'name'>
  >
  updateHighlight?: Resolver<
    ResolversTypes['UpdateHighlightResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHighlightArgs, 'input'>
  >
  updateHighlightReply?: Resolver<
    ResolversTypes['UpdateHighlightReplyResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHighlightReplyArgs, 'input'>
  >
  updateLabel?: Resolver<
    ResolversTypes['UpdateLabelResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLabelArgs, 'input'>
  >
  updateLinkShareInfo?: Resolver<
    ResolversTypes['UpdateLinkShareInfoResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLinkShareInfoArgs, 'input'>
  >
  updatePage?: Resolver<
    ResolversTypes['UpdatePageResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePageArgs, 'input'>
  >
  updateReminder?: Resolver<
    ResolversTypes['UpdateReminderResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateReminderArgs, 'input'>
  >
  updateSharedComment?: Resolver<
    ResolversTypes['UpdateSharedCommentResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSharedCommentArgs, 'input'>
  >
  updateUser?: Resolver<
    ResolversTypes['UpdateUserResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >
  updateUserProfile?: Resolver<
    ResolversTypes['UpdateUserProfileResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserProfileArgs, 'input'>
  >
  uploadFileRequest?: Resolver<
    ResolversTypes['UploadFileRequestResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileRequestArgs, 'input'>
  >
}

export type NewsletterEmailResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['NewsletterEmail'] = ResolversParentTypes['NewsletterEmail']
> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  confirmationCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NewsletterEmailsErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['NewsletterEmailsError'] = ResolversParentTypes['NewsletterEmailsError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['NewsletterEmailsErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NewsletterEmailsResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['NewsletterEmailsResult'] = ResolversParentTypes['NewsletterEmailsResult']
> = {
  __resolveType: TypeResolveFn<
    'NewsletterEmailsError' | 'NewsletterEmailsSuccess',
    ParentType,
    ContextType
  >
}

export type NewsletterEmailsSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['NewsletterEmailsSuccess'] = ResolversParentTypes['NewsletterEmailsSuccess']
> = {
  newsletterEmails?: Resolver<
    Array<ResolversTypes['NewsletterEmail']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PageResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']
> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  originalHtml?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  originalUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  readableHtml?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['PageType'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PageInfoResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProfileResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']
> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  pictureUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  apiKeys?: Resolver<ResolversTypes['ApiKeysResult'], ParentType, ContextType>
  article?: Resolver<
    ResolversTypes['ArticleResult'],
    ParentType,
    ContextType,
    RequireFields<QueryArticleArgs, 'slug' | 'username'>
  >
  articleSavingRequest?: Resolver<
    ResolversTypes['ArticleSavingRequestResult'],
    ParentType,
    ContextType,
    RequireFields<QueryArticleSavingRequestArgs, 'id'>
  >
  articles?: Resolver<
    ResolversTypes['ArticlesResult'],
    ParentType,
    ContextType,
    Partial<QueryArticlesArgs>
  >
  feedArticles?: Resolver<
    ResolversTypes['FeedArticlesResult'],
    ParentType,
    ContextType,
    Partial<QueryFeedArticlesArgs>
  >
  getFollowers?: Resolver<
    ResolversTypes['GetFollowersResult'],
    ParentType,
    ContextType,
    Partial<QueryGetFollowersArgs>
  >
  getFollowing?: Resolver<
    ResolversTypes['GetFollowingResult'],
    ParentType,
    ContextType,
    Partial<QueryGetFollowingArgs>
  >
  getUserPersonalization?: Resolver<
    ResolversTypes['GetUserPersonalizationResult'],
    ParentType,
    ContextType
  >
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  integrations?: Resolver<
    ResolversTypes['IntegrationsResult'],
    ParentType,
    ContextType
  >
  labels?: Resolver<ResolversTypes['LabelsResult'], ParentType, ContextType>
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  newsletterEmails?: Resolver<
    ResolversTypes['NewsletterEmailsResult'],
    ParentType,
    ContextType
  >
  reminder?: Resolver<
    ResolversTypes['ReminderResult'],
    ParentType,
    ContextType,
    RequireFields<QueryReminderArgs, 'linkId'>
  >
  search?: Resolver<
    ResolversTypes['SearchResult'],
    ParentType,
    ContextType,
    Partial<QuerySearchArgs>
  >
  sendInstallInstructions?: Resolver<
    ResolversTypes['SendInstallInstructionsResult'],
    ParentType,
    ContextType
  >
  sharedArticle?: Resolver<
    ResolversTypes['SharedArticleResult'],
    ParentType,
    ContextType,
    RequireFields<QuerySharedArticleArgs, 'slug' | 'username'>
  >
  subscriptions?: Resolver<
    ResolversTypes['SubscriptionsResult'],
    ParentType,
    ContextType,
    Partial<QuerySubscriptionsArgs>
  >
  typeaheadSearch?: Resolver<
    ResolversTypes['TypeaheadSearchResult'],
    ParentType,
    ContextType,
    RequireFields<QueryTypeaheadSearchArgs, 'query'>
  >
  updatesSince?: Resolver<
    ResolversTypes['UpdatesSinceResult'],
    ParentType,
    ContextType,
    RequireFields<QueryUpdatesSinceArgs, 'since'>
  >
  user?: Resolver<
    ResolversTypes['UserResult'],
    ParentType,
    ContextType,
    Partial<QueryUserArgs>
  >
  users?: Resolver<ResolversTypes['UsersResult'], ParentType, ContextType>
  validateUsername?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryValidateUsernameArgs, 'username'>
  >
  webhook?: Resolver<
    ResolversTypes['WebhookResult'],
    ParentType,
    ContextType,
    RequireFields<QueryWebhookArgs, 'id'>
  >
  webhooks?: Resolver<ResolversTypes['WebhooksResult'], ParentType, ContextType>
}

export type ReactionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']
> = {
  code?: Resolver<ResolversTypes['ReactionType'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReadStateResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ReadState'] = ResolversParentTypes['ReadState']
> = {
  progressAnchorIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  progressPercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  reading?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  readingTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReminderResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Reminder'] = ResolversParentTypes['Reminder']
> = {
  archiveUntil?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  remindAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  sendNotification?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReminderErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ReminderError'] = ResolversParentTypes['ReminderError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['ReminderErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReminderResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ReminderResult'] = ResolversParentTypes['ReminderResult']
> = {
  __resolveType: TypeResolveFn<
    'ReminderError' | 'ReminderSuccess',
    ParentType,
    ContextType
  >
}

export type ReminderSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ReminderSuccess'] = ResolversParentTypes['ReminderSuccess']
> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReportItemResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ReportItemResult'] = ResolversParentTypes['ReportItemResult']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RevokeApiKeyErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['RevokeApiKeyError'] = ResolversParentTypes['RevokeApiKeyError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['RevokeApiKeyErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RevokeApiKeyResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['RevokeApiKeyResult'] = ResolversParentTypes['RevokeApiKeyResult']
> = {
  __resolveType: TypeResolveFn<
    'RevokeApiKeyError' | 'RevokeApiKeySuccess',
    ParentType,
    ContextType
  >
}

export type RevokeApiKeySuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['RevokeApiKeySuccess'] = ResolversParentTypes['RevokeApiKeySuccess']
> = {
  apiKey?: Resolver<ResolversTypes['ApiKey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SaveArticleReadingProgressErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SaveArticleReadingProgressError'] = ResolversParentTypes['SaveArticleReadingProgressError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SaveArticleReadingProgressErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SaveArticleReadingProgressResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SaveArticleReadingProgressResult'] = ResolversParentTypes['SaveArticleReadingProgressResult']
> = {
  __resolveType: TypeResolveFn<
    'SaveArticleReadingProgressError' | 'SaveArticleReadingProgressSuccess',
    ParentType,
    ContextType
  >
}

export type SaveArticleReadingProgressSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SaveArticleReadingProgressSuccess'] = ResolversParentTypes['SaveArticleReadingProgressSuccess']
> = {
  updatedArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SaveErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SaveError'] = ResolversParentTypes['SaveError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SaveErrorCode']>,
    ParentType,
    ContextType
  >
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SaveResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SaveResult'] = ResolversParentTypes['SaveResult']
> = {
  __resolveType: TypeResolveFn<
    'SaveError' | 'SaveSuccess',
    ParentType,
    ContextType
  >
}

export type SaveSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SaveSuccess'] = ResolversParentTypes['SaveSuccess']
> = {
  clientRequestId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SearchErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SearchError'] = ResolversParentTypes['SearchError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SearchErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SearchItemResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SearchItem'] = ResolversParentTypes['SearchItem']
> = {
  annotation?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  contentReader?: Resolver<
    ResolversTypes['ContentReader'],
    ParentType,
    ContextType
  >
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  highlights?: Resolver<
    Maybe<Array<ResolversTypes['Highlight']>>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isArchived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  labels?: Resolver<
    Maybe<Array<ResolversTypes['Label']>>,
    ParentType,
    ContextType
  >
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  originalArticleUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  ownedByViewer?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  pageId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  pageType?: Resolver<ResolversTypes['PageType'], ParentType, ContextType>
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  quote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  readAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  readingProgressAnchorIndex?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >
  readingProgressPercent?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >
  savedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  shortId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  siteIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  state?: Resolver<
    Maybe<ResolversTypes['ArticleSavingRequestStatus']>,
    ParentType,
    ContextType
  >
  subscription?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  unsubHttpUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  unsubMailTo?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  uploadFileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SearchItemEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SearchItemEdge'] = ResolversParentTypes['SearchItemEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  node?: Resolver<ResolversTypes['SearchItem'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SearchResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']
> = {
  __resolveType: TypeResolveFn<
    'SearchError' | 'SearchSuccess',
    ParentType,
    ContextType
  >
}

export type SearchSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SearchSuccess'] = ResolversParentTypes['SearchSuccess']
> = {
  edges?: Resolver<
    Array<ResolversTypes['SearchItemEdge']>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SendInstallInstructionsErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SendInstallInstructionsError'] = ResolversParentTypes['SendInstallInstructionsError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SendInstallInstructionsErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SendInstallInstructionsResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SendInstallInstructionsResult'] = ResolversParentTypes['SendInstallInstructionsResult']
> = {
  __resolveType: TypeResolveFn<
    'SendInstallInstructionsError' | 'SendInstallInstructionsSuccess',
    ParentType,
    ContextType
  >
}

export type SendInstallInstructionsSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SendInstallInstructionsSuccess'] = ResolversParentTypes['SendInstallInstructionsSuccess']
> = {
  sent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetBookmarkArticleErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetBookmarkArticleError'] = ResolversParentTypes['SetBookmarkArticleError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetBookmarkArticleErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetBookmarkArticleResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetBookmarkArticleResult'] = ResolversParentTypes['SetBookmarkArticleResult']
> = {
  __resolveType: TypeResolveFn<
    'SetBookmarkArticleError' | 'SetBookmarkArticleSuccess',
    ParentType,
    ContextType
  >
}

export type SetBookmarkArticleSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetBookmarkArticleSuccess'] = ResolversParentTypes['SetBookmarkArticleSuccess']
> = {
  bookmarkedArticle?: Resolver<
    ResolversTypes['Article'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetDeviceTokenErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetDeviceTokenError'] = ResolversParentTypes['SetDeviceTokenError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetDeviceTokenErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetDeviceTokenResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetDeviceTokenResult'] = ResolversParentTypes['SetDeviceTokenResult']
> = {
  __resolveType: TypeResolveFn<
    'SetDeviceTokenError' | 'SetDeviceTokenSuccess',
    ParentType,
    ContextType
  >
}

export type SetDeviceTokenSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetDeviceTokenSuccess'] = ResolversParentTypes['SetDeviceTokenSuccess']
> = {
  deviceToken?: Resolver<ResolversTypes['DeviceToken'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetFollowErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetFollowError'] = ResolversParentTypes['SetFollowError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetFollowErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetFollowResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetFollowResult'] = ResolversParentTypes['SetFollowResult']
> = {
  __resolveType: TypeResolveFn<
    'SetFollowError' | 'SetFollowSuccess',
    ParentType,
    ContextType
  >
}

export type SetFollowSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetFollowSuccess'] = ResolversParentTypes['SetFollowSuccess']
> = {
  updatedUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetIntegrationErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetIntegrationError'] = ResolversParentTypes['SetIntegrationError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetIntegrationErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetIntegrationResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetIntegrationResult'] = ResolversParentTypes['SetIntegrationResult']
> = {
  __resolveType: TypeResolveFn<
    'SetIntegrationError' | 'SetIntegrationSuccess',
    ParentType,
    ContextType
  >
}

export type SetIntegrationSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetIntegrationSuccess'] = ResolversParentTypes['SetIntegrationSuccess']
> = {
  integration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetLabelsErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetLabelsError'] = ResolversParentTypes['SetLabelsError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetLabelsErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetLabelsResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetLabelsResult'] = ResolversParentTypes['SetLabelsResult']
> = {
  __resolveType: TypeResolveFn<
    'SetLabelsError' | 'SetLabelsSuccess',
    ParentType,
    ContextType
  >
}

export type SetLabelsSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetLabelsSuccess'] = ResolversParentTypes['SetLabelsSuccess']
> = {
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetShareArticleErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetShareArticleError'] = ResolversParentTypes['SetShareArticleError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetShareArticleErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetShareArticleResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetShareArticleResult'] = ResolversParentTypes['SetShareArticleResult']
> = {
  __resolveType: TypeResolveFn<
    'SetShareArticleError' | 'SetShareArticleSuccess',
    ParentType,
    ContextType
  >
}

export type SetShareArticleSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetShareArticleSuccess'] = ResolversParentTypes['SetShareArticleSuccess']
> = {
  updatedArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  updatedFeedArticle?: Resolver<
    Maybe<ResolversTypes['FeedArticle']>,
    ParentType,
    ContextType
  >
  updatedFeedArticleId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetShareHighlightErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetShareHighlightError'] = ResolversParentTypes['SetShareHighlightError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetShareHighlightErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetShareHighlightResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetShareHighlightResult'] = ResolversParentTypes['SetShareHighlightResult']
> = {
  __resolveType: TypeResolveFn<
    'SetShareHighlightError' | 'SetShareHighlightSuccess',
    ParentType,
    ContextType
  >
}

export type SetShareHighlightSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetShareHighlightSuccess'] = ResolversParentTypes['SetShareHighlightSuccess']
> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetUserPersonalizationErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetUserPersonalizationError'] = ResolversParentTypes['SetUserPersonalizationError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetUserPersonalizationErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetUserPersonalizationResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetUserPersonalizationResult'] = ResolversParentTypes['SetUserPersonalizationResult']
> = {
  __resolveType: TypeResolveFn<
    'SetUserPersonalizationError' | 'SetUserPersonalizationSuccess',
    ParentType,
    ContextType
  >
}

export type SetUserPersonalizationSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetUserPersonalizationSuccess'] = ResolversParentTypes['SetUserPersonalizationSuccess']
> = {
  updatedUserPersonalization?: Resolver<
    ResolversTypes['UserPersonalization'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetWebhookErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetWebhookError'] = ResolversParentTypes['SetWebhookError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SetWebhookErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SetWebhookResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetWebhookResult'] = ResolversParentTypes['SetWebhookResult']
> = {
  __resolveType: TypeResolveFn<
    'SetWebhookError' | 'SetWebhookSuccess',
    ParentType,
    ContextType
  >
}

export type SetWebhookSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SetWebhookSuccess'] = ResolversParentTypes['SetWebhookSuccess']
> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ShareStatsResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['ShareStats'] = ResolversParentTypes['ShareStats']
> = {
  readDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  saveCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SharedArticleErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SharedArticleError'] = ResolversParentTypes['SharedArticleError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SharedArticleErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SharedArticleResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SharedArticleResult'] = ResolversParentTypes['SharedArticleResult']
> = {
  __resolveType: TypeResolveFn<
    'SharedArticleError' | 'SharedArticleSuccess',
    ParentType,
    ContextType
  >
}

export type SharedArticleSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SharedArticleSuccess'] = ResolversParentTypes['SharedArticleSuccess']
> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscribeErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SubscribeError'] = ResolversParentTypes['SubscribeError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SubscribeErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscribeResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SubscribeResult'] = ResolversParentTypes['SubscribeResult']
> = {
  __resolveType: TypeResolveFn<
    'SubscribeError' | 'SubscribeSuccess',
    ParentType,
    ContextType
  >
}

export type SubscribeSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SubscribeSuccess'] = ResolversParentTypes['SubscribeSuccess']
> = {
  subscriptions?: Resolver<
    Array<ResolversTypes['Subscription']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  createdAt?: SubscriptionResolver<
    ResolversTypes['Date'],
    'createdAt',
    ParentType,
    ContextType
  >
  description?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'description',
    ParentType,
    ContextType
  >
  icon?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'icon',
    ParentType,
    ContextType
  >
  id?: SubscriptionResolver<ResolversTypes['ID'], 'id', ParentType, ContextType>
  name?: SubscriptionResolver<
    ResolversTypes['String'],
    'name',
    ParentType,
    ContextType
  >
  newsletterEmail?: SubscriptionResolver<
    ResolversTypes['String'],
    'newsletterEmail',
    ParentType,
    ContextType
  >
  status?: SubscriptionResolver<
    ResolversTypes['SubscriptionStatus'],
    'status',
    ParentType,
    ContextType
  >
  unsubscribeHttpUrl?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'unsubscribeHttpUrl',
    ParentType,
    ContextType
  >
  unsubscribeMailTo?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'unsubscribeMailTo',
    ParentType,
    ContextType
  >
  updatedAt?: SubscriptionResolver<
    ResolversTypes['Date'],
    'updatedAt',
    ParentType,
    ContextType
  >
  url?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'url',
    ParentType,
    ContextType
  >
}

export type SubscriptionsErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SubscriptionsError'] = ResolversParentTypes['SubscriptionsError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['SubscriptionsErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionsResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SubscriptionsResult'] = ResolversParentTypes['SubscriptionsResult']
> = {
  __resolveType: TypeResolveFn<
    'SubscriptionsError' | 'SubscriptionsSuccess',
    ParentType,
    ContextType
  >
}

export type SubscriptionsSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SubscriptionsSuccess'] = ResolversParentTypes['SubscriptionsSuccess']
> = {
  subscriptions?: Resolver<
    Array<ResolversTypes['Subscription']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SyncUpdatedItemEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['SyncUpdatedItemEdge'] = ResolversParentTypes['SyncUpdatedItemEdge']
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  itemID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  node?: Resolver<Maybe<ResolversTypes['SearchItem']>, ParentType, ContextType>
  updateReason?: Resolver<
    ResolversTypes['UpdateReason'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TypeaheadSearchErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['TypeaheadSearchError'] = ResolversParentTypes['TypeaheadSearchError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['TypeaheadSearchErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TypeaheadSearchItemResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['TypeaheadSearchItem'] = ResolversParentTypes['TypeaheadSearchItem']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TypeaheadSearchResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['TypeaheadSearchResult'] = ResolversParentTypes['TypeaheadSearchResult']
> = {
  __resolveType: TypeResolveFn<
    'TypeaheadSearchError' | 'TypeaheadSearchSuccess',
    ParentType,
    ContextType
  >
}

export type TypeaheadSearchSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['TypeaheadSearchSuccess'] = ResolversParentTypes['TypeaheadSearchSuccess']
> = {
  items?: Resolver<
    Array<ResolversTypes['TypeaheadSearchItem']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UnsubscribeErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UnsubscribeError'] = ResolversParentTypes['UnsubscribeError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UnsubscribeErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UnsubscribeResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UnsubscribeResult'] = ResolversParentTypes['UnsubscribeResult']
> = {
  __resolveType: TypeResolveFn<
    'UnsubscribeError' | 'UnsubscribeSuccess',
    ParentType,
    ContextType
  >
}

export type UnsubscribeSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UnsubscribeSuccess'] = ResolversParentTypes['UnsubscribeSuccess']
> = {
  subscription?: Resolver<
    ResolversTypes['Subscription'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateHighlightErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateHighlightError'] = ResolversParentTypes['UpdateHighlightError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateHighlightErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateHighlightReplyErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateHighlightReplyError'] = ResolversParentTypes['UpdateHighlightReplyError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateHighlightReplyErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateHighlightReplyResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateHighlightReplyResult'] = ResolversParentTypes['UpdateHighlightReplyResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateHighlightReplyError' | 'UpdateHighlightReplySuccess',
    ParentType,
    ContextType
  >
}

export type UpdateHighlightReplySuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateHighlightReplySuccess'] = ResolversParentTypes['UpdateHighlightReplySuccess']
> = {
  highlightReply?: Resolver<
    ResolversTypes['HighlightReply'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateHighlightResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateHighlightResult'] = ResolversParentTypes['UpdateHighlightResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateHighlightError' | 'UpdateHighlightSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateHighlightSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateHighlightSuccess'] = ResolversParentTypes['UpdateHighlightSuccess']
> = {
  highlight?: Resolver<ResolversTypes['Highlight'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateLabelErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateLabelError'] = ResolversParentTypes['UpdateLabelError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateLabelErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateLabelResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateLabelResult'] = ResolversParentTypes['UpdateLabelResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateLabelError' | 'UpdateLabelSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateLabelSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateLabelSuccess'] = ResolversParentTypes['UpdateLabelSuccess']
> = {
  label?: Resolver<ResolversTypes['Label'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateLinkShareInfoErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateLinkShareInfoError'] = ResolversParentTypes['UpdateLinkShareInfoError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateLinkShareInfoErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateLinkShareInfoResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateLinkShareInfoResult'] = ResolversParentTypes['UpdateLinkShareInfoResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateLinkShareInfoError' | 'UpdateLinkShareInfoSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateLinkShareInfoSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateLinkShareInfoSuccess'] = ResolversParentTypes['UpdateLinkShareInfoSuccess']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdatePageErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdatePageError'] = ResolversParentTypes['UpdatePageError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdatePageErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdatePageResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdatePageResult'] = ResolversParentTypes['UpdatePageResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdatePageError' | 'UpdatePageSuccess',
    ParentType,
    ContextType
  >
}

export type UpdatePageSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdatePageSuccess'] = ResolversParentTypes['UpdatePageSuccess']
> = {
  updatedPage?: Resolver<ResolversTypes['Article'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateReminderErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateReminderError'] = ResolversParentTypes['UpdateReminderError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateReminderErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateReminderResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateReminderResult'] = ResolversParentTypes['UpdateReminderResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateReminderError' | 'UpdateReminderSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateReminderSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateReminderSuccess'] = ResolversParentTypes['UpdateReminderSuccess']
> = {
  reminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateSharedCommentErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateSharedCommentError'] = ResolversParentTypes['UpdateSharedCommentError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateSharedCommentErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateSharedCommentResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateSharedCommentResult'] = ResolversParentTypes['UpdateSharedCommentResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateSharedCommentError' | 'UpdateSharedCommentSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateSharedCommentSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateSharedCommentSuccess'] = ResolversParentTypes['UpdateSharedCommentSuccess']
> = {
  articleID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  sharedComment?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateUserErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateUserError'] = ResolversParentTypes['UpdateUserError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateUserErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateUserProfileErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateUserProfileError'] = ResolversParentTypes['UpdateUserProfileError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdateUserProfileErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateUserProfileResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateUserProfileResult'] = ResolversParentTypes['UpdateUserProfileResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateUserProfileError' | 'UpdateUserProfileSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateUserProfileSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateUserProfileSuccess'] = ResolversParentTypes['UpdateUserProfileSuccess']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateUserResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateUserResult'] = ResolversParentTypes['UpdateUserResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdateUserError' | 'UpdateUserSuccess',
    ParentType,
    ContextType
  >
}

export type UpdateUserSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdateUserSuccess'] = ResolversParentTypes['UpdateUserSuccess']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdatesSinceErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdatesSinceError'] = ResolversParentTypes['UpdatesSinceError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UpdatesSinceErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdatesSinceResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdatesSinceResult'] = ResolversParentTypes['UpdatesSinceResult']
> = {
  __resolveType: TypeResolveFn<
    'UpdatesSinceError' | 'UpdatesSinceSuccess',
    ParentType,
    ContextType
  >
}

export type UpdatesSinceSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UpdatesSinceSuccess'] = ResolversParentTypes['UpdatesSinceSuccess']
> = {
  edges?: Resolver<
    Array<ResolversTypes['SyncUpdatedItemEdge']>,
    ParentType,
    ContextType
  >
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UploadFileRequestErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UploadFileRequestError'] = ResolversParentTypes['UploadFileRequestError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UploadFileRequestErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UploadFileRequestResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UploadFileRequestResult'] = ResolversParentTypes['UploadFileRequestResult']
> = {
  __resolveType: TypeResolveFn<
    'UploadFileRequestError' | 'UploadFileRequestSuccess',
    ParentType,
    ContextType
  >
}

export type UploadFileRequestSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UploadFileRequestSuccess'] = ResolversParentTypes['UploadFileRequestSuccess']
> = {
  createdPageId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  uploadFileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  uploadSignedUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  followersCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  friendsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  isFriend?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  isFullUser?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>
  sharedArticles?: Resolver<
    Array<ResolversTypes['FeedArticle']>,
    ParentType,
    ContextType
  >
  sharedArticlesCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  sharedHighlightsCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  sharedNotesCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  viewerIsFollowing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UserErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserPersonalizationResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UserPersonalization'] = ResolversParentTypes['UserPersonalization']
> = {
  fontFamily?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  fontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  libraryLayoutType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  librarySortOrder?: Resolver<
    Maybe<ResolversTypes['SortOrder']>,
    ParentType,
    ContextType
  >
  margin?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']
> = {
  __resolveType: TypeResolveFn<
    'UserError' | 'UserSuccess',
    ParentType,
    ContextType
  >
}

export type UserSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UserSuccess'] = ResolversParentTypes['UserSuccess']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UsersErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UsersError'] = ResolversParentTypes['UsersError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['UsersErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UsersResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']
> = {
  __resolveType: TypeResolveFn<
    'UsersError' | 'UsersSuccess',
    ParentType,
    ContextType
  >
}

export type UsersSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['UsersSuccess'] = ResolversParentTypes['UsersSuccess']
> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WebhookResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']
> = {
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  eventTypes?: Resolver<
    Array<ResolversTypes['WebhookEvent']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  method?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WebhookErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['WebhookError'] = ResolversParentTypes['WebhookError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['WebhookErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WebhookResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['WebhookResult'] = ResolversParentTypes['WebhookResult']
> = {
  __resolveType: TypeResolveFn<
    'WebhookError' | 'WebhookSuccess',
    ParentType,
    ContextType
  >
}

export type WebhookSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['WebhookSuccess'] = ResolversParentTypes['WebhookSuccess']
> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WebhooksErrorResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['WebhooksError'] = ResolversParentTypes['WebhooksError']
> = {
  errorCodes?: Resolver<
    Array<ResolversTypes['WebhooksErrorCode']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type WebhooksResultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['WebhooksResult'] = ResolversParentTypes['WebhooksResult']
> = {
  __resolveType: TypeResolveFn<
    'WebhooksError' | 'WebhooksSuccess',
    ParentType,
    ContextType
  >
}

export type WebhooksSuccessResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes['WebhooksSuccess'] = ResolversParentTypes['WebhooksSuccess']
> = {
  webhooks?: Resolver<Array<ResolversTypes['Webhook']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = ResolverContext> = {
  AddPopularReadError?: AddPopularReadErrorResolvers<ContextType>
  AddPopularReadResult?: AddPopularReadResultResolvers<ContextType>
  AddPopularReadSuccess?: AddPopularReadSuccessResolvers<ContextType>
  ApiKey?: ApiKeyResolvers<ContextType>
  ApiKeysError?: ApiKeysErrorResolvers<ContextType>
  ApiKeysResult?: ApiKeysResultResolvers<ContextType>
  ApiKeysSuccess?: ApiKeysSuccessResolvers<ContextType>
  ArchiveLinkError?: ArchiveLinkErrorResolvers<ContextType>
  ArchiveLinkResult?: ArchiveLinkResultResolvers<ContextType>
  ArchiveLinkSuccess?: ArchiveLinkSuccessResolvers<ContextType>
  Article?: ArticleResolvers<ContextType>
  ArticleEdge?: ArticleEdgeResolvers<ContextType>
  ArticleError?: ArticleErrorResolvers<ContextType>
  ArticleResult?: ArticleResultResolvers<ContextType>
  ArticleSavingRequest?: ArticleSavingRequestResolvers<ContextType>
  ArticleSavingRequestError?: ArticleSavingRequestErrorResolvers<ContextType>
  ArticleSavingRequestResult?: ArticleSavingRequestResultResolvers<ContextType>
  ArticleSavingRequestSuccess?: ArticleSavingRequestSuccessResolvers<ContextType>
  ArticleSuccess?: ArticleSuccessResolvers<ContextType>
  ArticlesError?: ArticlesErrorResolvers<ContextType>
  ArticlesResult?: ArticlesResultResolvers<ContextType>
  ArticlesSuccess?: ArticlesSuccessResolvers<ContextType>
  CreateArticleError?: CreateArticleErrorResolvers<ContextType>
  CreateArticleResult?: CreateArticleResultResolvers<ContextType>
  CreateArticleSavingRequestError?: CreateArticleSavingRequestErrorResolvers<ContextType>
  CreateArticleSavingRequestResult?: CreateArticleSavingRequestResultResolvers<ContextType>
  CreateArticleSavingRequestSuccess?: CreateArticleSavingRequestSuccessResolvers<ContextType>
  CreateArticleSuccess?: CreateArticleSuccessResolvers<ContextType>
  CreateHighlightError?: CreateHighlightErrorResolvers<ContextType>
  CreateHighlightReplyError?: CreateHighlightReplyErrorResolvers<ContextType>
  CreateHighlightReplyResult?: CreateHighlightReplyResultResolvers<ContextType>
  CreateHighlightReplySuccess?: CreateHighlightReplySuccessResolvers<ContextType>
  CreateHighlightResult?: CreateHighlightResultResolvers<ContextType>
  CreateHighlightSuccess?: CreateHighlightSuccessResolvers<ContextType>
  CreateLabelError?: CreateLabelErrorResolvers<ContextType>
  CreateLabelResult?: CreateLabelResultResolvers<ContextType>
  CreateLabelSuccess?: CreateLabelSuccessResolvers<ContextType>
  CreateNewsletterEmailError?: CreateNewsletterEmailErrorResolvers<ContextType>
  CreateNewsletterEmailResult?: CreateNewsletterEmailResultResolvers<ContextType>
  CreateNewsletterEmailSuccess?: CreateNewsletterEmailSuccessResolvers<ContextType>
  CreateReactionError?: CreateReactionErrorResolvers<ContextType>
  CreateReactionResult?: CreateReactionResultResolvers<ContextType>
  CreateReactionSuccess?: CreateReactionSuccessResolvers<ContextType>
  CreateReminderError?: CreateReminderErrorResolvers<ContextType>
  CreateReminderResult?: CreateReminderResultResolvers<ContextType>
  CreateReminderSuccess?: CreateReminderSuccessResolvers<ContextType>
  Date?: GraphQLScalarType
  DeleteAccountError?: DeleteAccountErrorResolvers<ContextType>
  DeleteAccountResult?: DeleteAccountResultResolvers<ContextType>
  DeleteAccountSuccess?: DeleteAccountSuccessResolvers<ContextType>
  DeleteHighlightError?: DeleteHighlightErrorResolvers<ContextType>
  DeleteHighlightReplyError?: DeleteHighlightReplyErrorResolvers<ContextType>
  DeleteHighlightReplyResult?: DeleteHighlightReplyResultResolvers<ContextType>
  DeleteHighlightReplySuccess?: DeleteHighlightReplySuccessResolvers<ContextType>
  DeleteHighlightResult?: DeleteHighlightResultResolvers<ContextType>
  DeleteHighlightSuccess?: DeleteHighlightSuccessResolvers<ContextType>
  DeleteIntegrationError?: DeleteIntegrationErrorResolvers<ContextType>
  DeleteIntegrationResult?: DeleteIntegrationResultResolvers<ContextType>
  DeleteIntegrationSuccess?: DeleteIntegrationSuccessResolvers<ContextType>
  DeleteLabelError?: DeleteLabelErrorResolvers<ContextType>
  DeleteLabelResult?: DeleteLabelResultResolvers<ContextType>
  DeleteLabelSuccess?: DeleteLabelSuccessResolvers<ContextType>
  DeleteNewsletterEmailError?: DeleteNewsletterEmailErrorResolvers<ContextType>
  DeleteNewsletterEmailResult?: DeleteNewsletterEmailResultResolvers<ContextType>
  DeleteNewsletterEmailSuccess?: DeleteNewsletterEmailSuccessResolvers<ContextType>
  DeleteReactionError?: DeleteReactionErrorResolvers<ContextType>
  DeleteReactionResult?: DeleteReactionResultResolvers<ContextType>
  DeleteReactionSuccess?: DeleteReactionSuccessResolvers<ContextType>
  DeleteReminderError?: DeleteReminderErrorResolvers<ContextType>
  DeleteReminderResult?: DeleteReminderResultResolvers<ContextType>
  DeleteReminderSuccess?: DeleteReminderSuccessResolvers<ContextType>
  DeleteWebhookError?: DeleteWebhookErrorResolvers<ContextType>
  DeleteWebhookResult?: DeleteWebhookResultResolvers<ContextType>
  DeleteWebhookSuccess?: DeleteWebhookSuccessResolvers<ContextType>
  DeviceToken?: DeviceTokenResolvers<ContextType>
  FeedArticle?: FeedArticleResolvers<ContextType>
  FeedArticleEdge?: FeedArticleEdgeResolvers<ContextType>
  FeedArticlesError?: FeedArticlesErrorResolvers<ContextType>
  FeedArticlesResult?: FeedArticlesResultResolvers<ContextType>
  FeedArticlesSuccess?: FeedArticlesSuccessResolvers<ContextType>
  GenerateApiKeyError?: GenerateApiKeyErrorResolvers<ContextType>
  GenerateApiKeyResult?: GenerateApiKeyResultResolvers<ContextType>
  GenerateApiKeySuccess?: GenerateApiKeySuccessResolvers<ContextType>
  GetFollowersError?: GetFollowersErrorResolvers<ContextType>
  GetFollowersResult?: GetFollowersResultResolvers<ContextType>
  GetFollowersSuccess?: GetFollowersSuccessResolvers<ContextType>
  GetFollowingError?: GetFollowingErrorResolvers<ContextType>
  GetFollowingResult?: GetFollowingResultResolvers<ContextType>
  GetFollowingSuccess?: GetFollowingSuccessResolvers<ContextType>
  GetUserPersonalizationError?: GetUserPersonalizationErrorResolvers<ContextType>
  GetUserPersonalizationResult?: GetUserPersonalizationResultResolvers<ContextType>
  GetUserPersonalizationSuccess?: GetUserPersonalizationSuccessResolvers<ContextType>
  GoogleSignupError?: GoogleSignupErrorResolvers<ContextType>
  GoogleSignupResult?: GoogleSignupResultResolvers<ContextType>
  GoogleSignupSuccess?: GoogleSignupSuccessResolvers<ContextType>
  Highlight?: HighlightResolvers<ContextType>
  HighlightReply?: HighlightReplyResolvers<ContextType>
  HighlightStats?: HighlightStatsResolvers<ContextType>
  Integration?: IntegrationResolvers<ContextType>
  IntegrationsError?: IntegrationsErrorResolvers<ContextType>
  IntegrationsResult?: IntegrationsResultResolvers<ContextType>
  IntegrationsSuccess?: IntegrationsSuccessResolvers<ContextType>
  Label?: LabelResolvers<ContextType>
  LabelsError?: LabelsErrorResolvers<ContextType>
  LabelsResult?: LabelsResultResolvers<ContextType>
  LabelsSuccess?: LabelsSuccessResolvers<ContextType>
  Link?: LinkResolvers<ContextType>
  LinkShareInfo?: LinkShareInfoResolvers<ContextType>
  LogOutError?: LogOutErrorResolvers<ContextType>
  LogOutResult?: LogOutResultResolvers<ContextType>
  LogOutSuccess?: LogOutSuccessResolvers<ContextType>
  LoginError?: LoginErrorResolvers<ContextType>
  LoginResult?: LoginResultResolvers<ContextType>
  LoginSuccess?: LoginSuccessResolvers<ContextType>
  MergeHighlightError?: MergeHighlightErrorResolvers<ContextType>
  MergeHighlightResult?: MergeHighlightResultResolvers<ContextType>
  MergeHighlightSuccess?: MergeHighlightSuccessResolvers<ContextType>
  MoveLabelError?: MoveLabelErrorResolvers<ContextType>
  MoveLabelResult?: MoveLabelResultResolvers<ContextType>
  MoveLabelSuccess?: MoveLabelSuccessResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  NewsletterEmail?: NewsletterEmailResolvers<ContextType>
  NewsletterEmailsError?: NewsletterEmailsErrorResolvers<ContextType>
  NewsletterEmailsResult?: NewsletterEmailsResultResolvers<ContextType>
  NewsletterEmailsSuccess?: NewsletterEmailsSuccessResolvers<ContextType>
  Page?: PageResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Profile?: ProfileResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Reaction?: ReactionResolvers<ContextType>
  ReadState?: ReadStateResolvers<ContextType>
  Reminder?: ReminderResolvers<ContextType>
  ReminderError?: ReminderErrorResolvers<ContextType>
  ReminderResult?: ReminderResultResolvers<ContextType>
  ReminderSuccess?: ReminderSuccessResolvers<ContextType>
  ReportItemResult?: ReportItemResultResolvers<ContextType>
  RevokeApiKeyError?: RevokeApiKeyErrorResolvers<ContextType>
  RevokeApiKeyResult?: RevokeApiKeyResultResolvers<ContextType>
  RevokeApiKeySuccess?: RevokeApiKeySuccessResolvers<ContextType>
  SaveArticleReadingProgressError?: SaveArticleReadingProgressErrorResolvers<ContextType>
  SaveArticleReadingProgressResult?: SaveArticleReadingProgressResultResolvers<ContextType>
  SaveArticleReadingProgressSuccess?: SaveArticleReadingProgressSuccessResolvers<ContextType>
  SaveError?: SaveErrorResolvers<ContextType>
  SaveResult?: SaveResultResolvers<ContextType>
  SaveSuccess?: SaveSuccessResolvers<ContextType>
  SearchError?: SearchErrorResolvers<ContextType>
  SearchItem?: SearchItemResolvers<ContextType>
  SearchItemEdge?: SearchItemEdgeResolvers<ContextType>
  SearchResult?: SearchResultResolvers<ContextType>
  SearchSuccess?: SearchSuccessResolvers<ContextType>
  SendInstallInstructionsError?: SendInstallInstructionsErrorResolvers<ContextType>
  SendInstallInstructionsResult?: SendInstallInstructionsResultResolvers<ContextType>
  SendInstallInstructionsSuccess?: SendInstallInstructionsSuccessResolvers<ContextType>
  SetBookmarkArticleError?: SetBookmarkArticleErrorResolvers<ContextType>
  SetBookmarkArticleResult?: SetBookmarkArticleResultResolvers<ContextType>
  SetBookmarkArticleSuccess?: SetBookmarkArticleSuccessResolvers<ContextType>
  SetDeviceTokenError?: SetDeviceTokenErrorResolvers<ContextType>
  SetDeviceTokenResult?: SetDeviceTokenResultResolvers<ContextType>
  SetDeviceTokenSuccess?: SetDeviceTokenSuccessResolvers<ContextType>
  SetFollowError?: SetFollowErrorResolvers<ContextType>
  SetFollowResult?: SetFollowResultResolvers<ContextType>
  SetFollowSuccess?: SetFollowSuccessResolvers<ContextType>
  SetIntegrationError?: SetIntegrationErrorResolvers<ContextType>
  SetIntegrationResult?: SetIntegrationResultResolvers<ContextType>
  SetIntegrationSuccess?: SetIntegrationSuccessResolvers<ContextType>
  SetLabelsError?: SetLabelsErrorResolvers<ContextType>
  SetLabelsResult?: SetLabelsResultResolvers<ContextType>
  SetLabelsSuccess?: SetLabelsSuccessResolvers<ContextType>
  SetShareArticleError?: SetShareArticleErrorResolvers<ContextType>
  SetShareArticleResult?: SetShareArticleResultResolvers<ContextType>
  SetShareArticleSuccess?: SetShareArticleSuccessResolvers<ContextType>
  SetShareHighlightError?: SetShareHighlightErrorResolvers<ContextType>
  SetShareHighlightResult?: SetShareHighlightResultResolvers<ContextType>
  SetShareHighlightSuccess?: SetShareHighlightSuccessResolvers<ContextType>
  SetUserPersonalizationError?: SetUserPersonalizationErrorResolvers<ContextType>
  SetUserPersonalizationResult?: SetUserPersonalizationResultResolvers<ContextType>
  SetUserPersonalizationSuccess?: SetUserPersonalizationSuccessResolvers<ContextType>
  SetWebhookError?: SetWebhookErrorResolvers<ContextType>
  SetWebhookResult?: SetWebhookResultResolvers<ContextType>
  SetWebhookSuccess?: SetWebhookSuccessResolvers<ContextType>
  ShareStats?: ShareStatsResolvers<ContextType>
  SharedArticleError?: SharedArticleErrorResolvers<ContextType>
  SharedArticleResult?: SharedArticleResultResolvers<ContextType>
  SharedArticleSuccess?: SharedArticleSuccessResolvers<ContextType>
  SubscribeError?: SubscribeErrorResolvers<ContextType>
  SubscribeResult?: SubscribeResultResolvers<ContextType>
  SubscribeSuccess?: SubscribeSuccessResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  SubscriptionsError?: SubscriptionsErrorResolvers<ContextType>
  SubscriptionsResult?: SubscriptionsResultResolvers<ContextType>
  SubscriptionsSuccess?: SubscriptionsSuccessResolvers<ContextType>
  SyncUpdatedItemEdge?: SyncUpdatedItemEdgeResolvers<ContextType>
  TypeaheadSearchError?: TypeaheadSearchErrorResolvers<ContextType>
  TypeaheadSearchItem?: TypeaheadSearchItemResolvers<ContextType>
  TypeaheadSearchResult?: TypeaheadSearchResultResolvers<ContextType>
  TypeaheadSearchSuccess?: TypeaheadSearchSuccessResolvers<ContextType>
  UnsubscribeError?: UnsubscribeErrorResolvers<ContextType>
  UnsubscribeResult?: UnsubscribeResultResolvers<ContextType>
  UnsubscribeSuccess?: UnsubscribeSuccessResolvers<ContextType>
  UpdateHighlightError?: UpdateHighlightErrorResolvers<ContextType>
  UpdateHighlightReplyError?: UpdateHighlightReplyErrorResolvers<ContextType>
  UpdateHighlightReplyResult?: UpdateHighlightReplyResultResolvers<ContextType>
  UpdateHighlightReplySuccess?: UpdateHighlightReplySuccessResolvers<ContextType>
  UpdateHighlightResult?: UpdateHighlightResultResolvers<ContextType>
  UpdateHighlightSuccess?: UpdateHighlightSuccessResolvers<ContextType>
  UpdateLabelError?: UpdateLabelErrorResolvers<ContextType>
  UpdateLabelResult?: UpdateLabelResultResolvers<ContextType>
  UpdateLabelSuccess?: UpdateLabelSuccessResolvers<ContextType>
  UpdateLinkShareInfoError?: UpdateLinkShareInfoErrorResolvers<ContextType>
  UpdateLinkShareInfoResult?: UpdateLinkShareInfoResultResolvers<ContextType>
  UpdateLinkShareInfoSuccess?: UpdateLinkShareInfoSuccessResolvers<ContextType>
  UpdatePageError?: UpdatePageErrorResolvers<ContextType>
  UpdatePageResult?: UpdatePageResultResolvers<ContextType>
  UpdatePageSuccess?: UpdatePageSuccessResolvers<ContextType>
  UpdateReminderError?: UpdateReminderErrorResolvers<ContextType>
  UpdateReminderResult?: UpdateReminderResultResolvers<ContextType>
  UpdateReminderSuccess?: UpdateReminderSuccessResolvers<ContextType>
  UpdateSharedCommentError?: UpdateSharedCommentErrorResolvers<ContextType>
  UpdateSharedCommentResult?: UpdateSharedCommentResultResolvers<ContextType>
  UpdateSharedCommentSuccess?: UpdateSharedCommentSuccessResolvers<ContextType>
  UpdateUserError?: UpdateUserErrorResolvers<ContextType>
  UpdateUserProfileError?: UpdateUserProfileErrorResolvers<ContextType>
  UpdateUserProfileResult?: UpdateUserProfileResultResolvers<ContextType>
  UpdateUserProfileSuccess?: UpdateUserProfileSuccessResolvers<ContextType>
  UpdateUserResult?: UpdateUserResultResolvers<ContextType>
  UpdateUserSuccess?: UpdateUserSuccessResolvers<ContextType>
  UpdatesSinceError?: UpdatesSinceErrorResolvers<ContextType>
  UpdatesSinceResult?: UpdatesSinceResultResolvers<ContextType>
  UpdatesSinceSuccess?: UpdatesSinceSuccessResolvers<ContextType>
  UploadFileRequestError?: UploadFileRequestErrorResolvers<ContextType>
  UploadFileRequestResult?: UploadFileRequestResultResolvers<ContextType>
  UploadFileRequestSuccess?: UploadFileRequestSuccessResolvers<ContextType>
  User?: UserResolvers<ContextType>
  UserError?: UserErrorResolvers<ContextType>
  UserPersonalization?: UserPersonalizationResolvers<ContextType>
  UserResult?: UserResultResolvers<ContextType>
  UserSuccess?: UserSuccessResolvers<ContextType>
  UsersError?: UsersErrorResolvers<ContextType>
  UsersResult?: UsersResultResolvers<ContextType>
  UsersSuccess?: UsersSuccessResolvers<ContextType>
  Webhook?: WebhookResolvers<ContextType>
  WebhookError?: WebhookErrorResolvers<ContextType>
  WebhookResult?: WebhookResultResolvers<ContextType>
  WebhookSuccess?: WebhookSuccessResolvers<ContextType>
  WebhooksError?: WebhooksErrorResolvers<ContextType>
  WebhooksResult?: WebhooksResultResolvers<ContextType>
  WebhooksSuccess?: WebhooksSuccessResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = ResolverContext> = {
  sanitize?: SanitizeDirectiveResolver<any, any, ContextType>
}
