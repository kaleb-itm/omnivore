import { Label } from '../../../lib/networking/fragments/labelFragment'
import { ArticleAttributes } from '../../../lib/networking/queries/useGetArticleQuery'
import { Button } from '../../elements/Button'
import { CrossIcon } from '../../elements/images/CrossIcon'
import { HStack, VStack } from '../../elements/LayoutPrimitives'
import {
  ModalRoot,
  ModalOverlay,
  ModalContent,
} from '../../elements/ModalPrimitives'
import { StyledText } from '../../elements/StyledText'
import { theme } from '../../tokens/stitches.config'
import { SetLabelsControl } from './SetLabelsControl'

type SetLabelsModalProps = {
  linkId: string
  labels: Label[] | undefined
  article?: ArticleAttributes
  onOpenChange: (open: boolean) => void
  articleActionHandler: (action: string, arg?: unknown) => void
}

export function SetLabelsModal(props: SetLabelsModalProps): JSX.Element {
  return (
    <ModalRoot defaultOpen onOpenChange={props.onOpenChange}>
      <ModalOverlay />
      <ModalContent
        css={{ border: '1px solid $grayBorder' }}
        onPointerDownOutside={(event) => {
          event.preventDefault()
          props.onOpenChange(false)
        }}
      >
        <VStack css={{ width: '100%' }}>
          <HStack
            distribution="between"
            alignment="center"
            css={{ width: '100%' }}
          >
            <StyledText style="modalHeadline" css={{ pl: '16px' }}>
              Labels
            </StyledText>
            <Button
              css={{ pt: '16px', pr: '16px' }}
              style="ghost"
              onClick={() => {
                props.onOpenChange(false)
              }}
              tabIndex={-1}
            >
              <CrossIcon
                size={14}
                strokeColor={theme.colors.grayText.toString()}
              />
            </Button>
          </HStack>
          <SetLabelsControl {...props} />
        </VStack>
      </ModalContent>
    </ModalRoot>
  )
}
