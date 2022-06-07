import { LayoutType } from '../../templates/homeFeed/HomeFeedContainer'
import { UserBasicData } from '../../../lib/networking/queries/useGetViewerQuery'
import type { LibraryItemNode } from '../../../lib/networking/queries/useGetLibraryItemsQuery'

export type LinkedItemCardAction =
  | 'showDetail'
  | 'showOriginal'
  | 'editTitle'
  | 'archive'
  | 'unarchive'
  | 'delete'
  | 'mark-read'
  | 'mark-unread'
  | 'share'
  | 'snooze'
  | 'set-labels'
  | 'update-item'

export type LinkedItemCardProps = {
  item: LibraryItemNode
  layout: LayoutType
  viewer: UserBasicData
  originText?: string
  handleAction: (action: LinkedItemCardAction) => void
}
