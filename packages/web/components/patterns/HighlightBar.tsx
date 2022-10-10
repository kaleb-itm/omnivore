import { isAndroid } from '../../lib/deviceType'

import { styled, theme } from '../tokens/stitches.config'
import { AnchoredPopover } from '../patterns/AnchoredPopover'

import { StyledText } from '../elements/StyledText'
import { Button } from '../elements/Button'
import { HStack, Box } from '../elements/LayoutPrimitives'
import { TrashIcon } from '../elements/images/TrashIcon'
import { PenWithColorIcon } from '../elements/images/PenWithColorIcon'
import { Note, Trash, TrashSimple } from 'phosphor-react'

type PageCoordinates = {
  pageX: number
  pageY: number
}

export type HighlightAction =
  | 'delete'
  | 'create'
  | 'comment'
  | 'share'
  | 'post'
  | 'unshare'

type HighlightBarProps = {
  anchorCoordinates: PageCoordinates
  isNewHighlight: boolean
  isSharedToFeed: boolean
  displayAtBottom: boolean
  handleButtonClick: (action: HighlightAction) => void
}

export function HighlightBar(props: HighlightBarProps): JSX.Element {
  if (props.displayAtBottom) {
    return (
      <Box
        css={{
          width: '100%',
          maxWidth: '240px',
          height: '48px',
          position: 'fixed',
          background: '$grayBg',
          borderRadius: '4px',
          border: '1px solid $grayBorder',
          boxShadow: theme.shadows.cardBoxShadow.toString(),
          bottom: 'calc(38px + env(safe-area-inset-bottom, 40px))',
          '@smDown': {
            maxWidth: '80%',
            bottom: `calc(28px + ${
              isAndroid() ? 30 : 0
            }px + env(safe-area-inset-bottom, 40px))`,
          },
        }}
      >
        <BarContent {...props} />
      </Box>
    )
  } else {
    return (
      <Box
        css={{
          width: '100%',
          maxWidth: '240px',
          height: '48px',
          position: 'absolute',
          background: '$grayBg',
          borderRadius: '4px',
          border: '1px solid $grayBorder',
          boxShadow: theme.shadows.cardBoxShadow.toString(),
          left: props.anchorCoordinates.pageX,
          top: props.anchorCoordinates.pageY,
        }}
      >
        <BarContent {...props} />
      </Box>
    )
  }
}

function BarContent(props: HighlightBarProps): JSX.Element {
  const Separator = styled('div', {
    width: '1px',
    maxWidth: '1px',
    height: '100%',
    background: '$grayBorder',
  })

  return (
    <HStack
      distribution="evenly"
      alignment="center"
      css={{
        height: '100%',
        alignItems: 'center',
        width: props.displayAtBottom ? '100%' : 'auto',
      }}
    >
      {props.isNewHighlight ? (
        <Button
          style="plainIcon"
          title="Create Highlight"
          onClick={() => props.handleButtonClick('create')}
          css={{
            flexDirection: 'column',
            height: '100%',
            m: 0,
            p: 0,
            alignItems: 'baseline',
          }}
        >
          <HStack css={{ height: '100%', alignItems: 'center' }}>
            <PenWithColorIcon />
            <StyledText
              style="body"
              css={{
                pl: '12px',
                m: '0px',
                color: '$readerFont',
                fontWeight: '400',
                fontSize: '16px',
              }}
            >
              Highlight
            </StyledText>
          </HStack>
        </Button>
      ) : (
        <Button
          style="plainIcon"
          title="Remove Highlight"
          onClick={() => props.handleButtonClick('delete')}
          css={{ color: '$readerFont', height: '100%', m: 0, p: 0 }}
        >
          <HStack css={{ height: '100%', alignItems: 'center' }}>
            <Trash size={24} color={theme.colors.omnivoreRed.toString()} />
            <StyledText
              style="body"
              css={{
                pl: '12px',
                m: '0px',
                color: '$readerFont',
                fontWeight: '400',
                fontSize: '16px',
              }}
            >
              Delete
            </StyledText>
          </HStack>
        </Button>
      )}
      <Separator />
      <Button
        style="plainIcon"
        title="Add Note to Highlight"
        onClick={() => props.handleButtonClick('comment')}
        css={{ color: '$readerFont', height: '100%', m: 0, p: 0 }}
      >
        <HStack css={{ height: '100%', alignItems: 'center' }}>
          <Note size={24} color={theme.colors.readerFont.toString()} />
          <StyledText
            style="body"
            css={{
              pl: '12px',
              m: '0px',
              color: '$readerFont',
              fontWeight: '400',
              fontSize: '16px',
            }}
          >
            Note
          </StyledText>
        </HStack>
      </Button>
      {/* <Separator />
      <Button
        style="plainIcon"
        title="Share Highlight"
        onClick={() => props.handleButtonClick('share')}
        css={{ color: '$readerFont', height: '100%', m: 0, p: 0, pt: '6px' }}
      >
        <ShareIcon size={28} strokeColor={theme.colors.readerFont.toString()} isCompleted={false} />
      </Button> */}
    </HStack>
  )
}
