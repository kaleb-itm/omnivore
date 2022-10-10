import { PrimaryLayout } from '../../../components/templates/PrimaryLayout'
import { LoadingView } from '../../../components/patterns/LoadingView'
import { useGetViewerQuery } from '../../../lib/networking/queries/useGetViewerQuery'
import {
  removeItemFromCache,
  useGetArticleQuery,
} from '../../../lib/networking/queries/useGetArticleQuery'
import { useRouter } from 'next/router'
import { VStack } from './../../../components/elements/LayoutPrimitives'
import { ArticleContainer } from './../../../components/templates/article/ArticleContainer'
import { PdfArticleContainerProps } from './../../../components/templates/article/PdfArticleContainer'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useKeyboardShortcuts } from '../../../lib/keyboardShortcuts/useKeyboardShortcuts'
import {
  articleKeyboardCommands,
  navigationCommands,
} from '../../../lib/keyboardShortcuts/navigationShortcuts'
import dynamic from 'next/dynamic'
import { webBaseURL } from '../../../lib/appConfig'
import { Toaster } from 'react-hot-toast'
import { createHighlightMutation } from '../../../lib/networking/mutations/createHighlightMutation'
import { deleteHighlightMutation } from '../../../lib/networking/mutations/deleteHighlightMutation'
import { mergeHighlightMutation } from '../../../lib/networking/mutations/mergeHighlightMutation'
import { articleReadingProgressMutation } from '../../../lib/networking/mutations/articleReadingProgressMutation'
import { updateHighlightMutation } from '../../../lib/networking/mutations/updateHighlightMutation'
import Script from 'next/script'
import { theme } from '../../../components/tokens/stitches.config'
import { ArticleActionsMenu } from '../../../components/templates/article/ArticleActionsMenu'
import { setLinkArchivedMutation } from '../../../lib/networking/mutations/setLinkArchivedMutation'
import { Label } from '../../../lib/networking/fragments/labelFragment'
import { useSWRConfig } from 'swr'
import { showErrorToast, showSuccessToast } from '../../../lib/toastHelpers'
import { SetLabelsModal } from '../../../components/templates/article/SetLabelsModal'
import { DisplaySettingsModal } from '../../../components/templates/article/DisplaySettingsModal'
import { useReaderSettings } from '../../../lib/hooks/useReaderSettings'
import { SkeletonArticleContainer } from '../../../components/templates/article/SkeletonArticleContainer'
import { useRegisterActions } from 'kbar'
import { deleteLinkMutation } from '../../../lib/networking/mutations/deleteLinkMutation'
import { ConfirmationModal } from '../../../components/patterns/ConfirmationModal'

const PdfArticleContainerNoSSR = dynamic<PdfArticleContainerProps>(
  () => import('./../../../components/templates/article/PdfArticleContainer'),
  { ssr: false }
)

export default function Home(): JSX.Element {
  const router = useRouter()
  const { cache, mutate } = useSWRConfig()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { slug } = router.query
  const [showHighlightsModal, setShowHighlightsModal] = useState(false)
  const { viewerData } = useGetViewerQuery()
  const readerSettings = useReaderSettings()

  const { articleData, articleFetchError } = useGetArticleQuery({
    username: router.query.username as string,
    slug: router.query.slug as string,
    includeFriendsHighlights: false,
  })
  const article = articleData?.article.article
  const [labels, setLabels] = useState<Label[]>([])
  useEffect(() => {
    if (article?.labels) {
      setLabels(article.labels)
    }
  }, [article])

  useKeyboardShortcuts(navigationCommands(router))

  const actionHandler = useCallback(
    async (action: string, arg?: unknown) => {
      console.log('handling action: ', action, article)

      switch (action) {
        case 'unarchive':
          if (article) {
            removeItemFromCache(cache, mutate, article.id)

            setLinkArchivedMutation({
              linkId: article.id,
              archived: false,
            }).then((res) => {
              if (res) {
                showSuccessToast('Link unarchived', {
                  position: 'bottom-right',
                })
              } else {
                showErrorToast('Error unarchiving link', {
                  position: 'bottom-right',
                })
              }
            })

            router.push(`/home`)
          }
          break
        case 'archive':
          if (article) {
            removeItemFromCache(cache, mutate, article.id)

            await setLinkArchivedMutation({
              linkId: article.id,
              archived: true,
            }).then((res) => {
              if (res) {
                showSuccessToast('Link archived', { position: 'bottom-right' })
              } else {
                // todo: revalidate or put back in cache?
                showErrorToast('Error archiving link', {
                  position: 'bottom-right',
                })
              }
            })

            router.push(`/home`)
          }
          break
        case 'delete':
          readerSettings.setShowDeleteConfirmation(true)
          break
        case 'openOriginalArticle':
          const url = article?.url
          if (url) {
            window.open(url, '_blank')
          }
          break
        case 'refreshLabels':
          setLabels(arg as Label[])
          break
        case 'showHighlights':
          setShowHighlightsModal(true)
          break
        default:
          readerSettings.actionHandler(action, arg)
          break
      }
    },
    [article, cache, mutate, router, readerSettings]
  )

  useEffect(() => {
    const archive = () => {
      actionHandler('archive')
    }
    const openOriginalArticle = () => {
      actionHandler('openOriginalArticle')
    }
    const deletePage = () => {
      actionHandler('delete')
    }

    document.addEventListener('archive', archive)
    document.addEventListener('delete', deletePage)
    document.addEventListener('openOriginalArticle', openOriginalArticle)

    return () => {
      document.removeEventListener('archive', archive)
      document.removeEventListener('openOriginalArticle', openOriginalArticle)
    }
  }, [actionHandler])

  useKeyboardShortcuts(
    articleKeyboardCommands(router, async (action) => {
      actionHandler(action)
    })
  )

  useEffect(() => {
    if (article && viewerData?.me) {
      window.analytics?.track('link_read', {
        link: article.id,
        slug: article.slug,
        url: article.originalArticleUrl,
        userId: viewerData.me.id,
      })
    }
  }, [article, viewerData])

  const deleteCurrentItem = useCallback(async () => {
    if (article) {
      removeItemFromCache(cache, mutate, article.id)
      await deleteLinkMutation(article.id).then((res) => {
        if (res) {
          showSuccessToast('Page deleted', { position: 'bottom-right' })
        } else {
          // todo: revalidate or put back in cache?
          showErrorToast('Error deleting page', { position: 'bottom-right' })
        }
      })
      router.push(`/home`)
    }
  }, [article])

  useRegisterActions(
    [
      {
        id: 'open',
        section: 'Article',
        name: 'Open original article',
        shortcut: ['o'],
        perform: () => {
          document.dispatchEvent(new Event('openOriginalArticle'))
        },
      },
      {
        id: 'back_home',
        section: 'Article',
        name: 'Return to library',
        shortcut: ['u'],
        perform: () => router.push(`/home`),
      },
      {
        id: 'archive',
        section: 'Article',
        name: 'Archive current item',
        shortcut: ['e'],
        perform: () => {
          document.dispatchEvent(new Event('archive'))
        },
      },
      {
        id: 'delete',
        section: 'Article',
        name: 'Delete current item',
        shortcut: ['#'],
        perform: () => {
          document.dispatchEvent(new Event('delete'))
        },
      },
      {
        id: 'highlight',
        section: 'Article',
        name: 'Highlight selected text',
        shortcut: ['h'],
        perform: () => {
          document.dispatchEvent(new Event('highlight'))
        },
      },
      {
        id: 'note',
        section: 'Article',
        name: 'Highlight selected text and add a note',
        shortcut: ['n'],
        perform: () => {
          document.dispatchEvent(new Event('annotate'))
        },
      },
    ],
    []
  )

  if (articleFetchError && articleFetchError.indexOf('NOT_FOUND') > -1) {
    router.push('/404')
    return <LoadingView />
  }

  return (
    <PrimaryLayout
      pageTestId="home-page-tag"
      headerToolbarControl={
        <ArticleActionsMenu
          article={article}
          layout="top"
          showReaderDisplaySettings={article?.contentReader != 'PDF'}
          articleActionHandler={actionHandler}
        />
      }
      alwaysDisplayToolbar={article?.contentReader == 'PDF'}
      pageMetaDataProps={{
        title: article?.title ?? '',
        path: router.pathname,
        description: article?.description ?? '',
      }}
    >
      <Script async src="/static/scripts/mathJaxConfiguration.js" />
      <Script
        async
        id="MathJax-script"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      />
      <Toaster />

      <VStack
        distribution="between"
        alignment="center"
        css={{
          position: 'fixed',
          flexDirection: 'row-reverse',
          top: '-120px',
          left: 8,
          height: '100%',
          width: '35px',
          '@lgDown': {
            display: 'none',
          },
        }}
      >
        {article?.contentReader !== 'PDF' ? (
          <ArticleActionsMenu
            article={article}
            layout="side"
            showReaderDisplaySettings={true}
            articleActionHandler={actionHandler}
          />
        ) : null}
      </VStack>
      {article && viewerData?.me && article.contentReader == 'PDF' ? (
        <PdfArticleContainerNoSSR
          article={article}
          showHighlightsModal={showHighlightsModal}
          setShowHighlightsModal={setShowHighlightsModal}
          viewerUsername={viewerData.me?.profile?.username}
        />
      ) : (
        <VStack
          alignment="center"
          distribution="center"
          ref={scrollRef}
          className="disable-webkit-callout"
          css={{
            '@smDown': {
              background: theme.colors.grayBg.toString(),
            },
          }}
        >
          {article && viewerData?.me ? (
            <ArticleContainer
              article={article}
              isAppleAppEmbed={false}
              highlightBarDisabled={false}
              highlightsBaseURL={`${webBaseURL}/${viewerData.me?.profile?.username}/${slug}/highlights`}
              fontSize={readerSettings.fontSize}
              margin={readerSettings.marginWidth}
              lineHeight={readerSettings.lineHeight}
              fontFamily={readerSettings.fontFamily}
              labels={labels}
              showHighlightsModal={showHighlightsModal}
              setShowHighlightsModal={setShowHighlightsModal}
              articleMutations={{
                createHighlightMutation,
                deleteHighlightMutation,
                mergeHighlightMutation,
                updateHighlightMutation,
                articleReadingProgressMutation,
              }}
            />
          ) : (
            <SkeletonArticleContainer
              margin={readerSettings.marginWidth}
              lineHeight={readerSettings.lineHeight}
              fontSize={readerSettings.fontSize}
            />
          )}
        </VStack>
      )}

      {article && readerSettings.showSetLabelsModal && (
        <SetLabelsModal
          article={article}
          linkId={article.id}
          labels={article.labels}
          articleActionHandler={actionHandler}
          onOpenChange={() => readerSettings.setShowSetLabelsModal(false)}
        />
      )}
      {readerSettings.showEditDisplaySettingsModal && (
        <DisplaySettingsModal
          centerX={true}
          articleActionHandler={actionHandler}
          onOpenChange={() =>
            readerSettings.setShowEditDisplaySettingsModal(false)
          }
        />
      )}
      {readerSettings.showDeleteConfirmation && (
        <ConfirmationModal
          message={'Are you sure you want to delete this page?'}
          onAccept={deleteCurrentItem}
          onOpenChange={() => readerSettings.setShowDeleteConfirmation(false)}
        />
      )}
    </PrimaryLayout>
  )
}
