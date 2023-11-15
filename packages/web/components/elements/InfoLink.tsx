import { Info } from 'phosphor-react'
import { VStack } from '../elements/LayoutPrimitives'
import { theme } from '../tokens/stitches.config'
import { TooltipWrapped } from './Tooltip'
import { EditInfoIcon } from './icons/EditInfoIcon'

type InfoLinkProps = {
  href: string
}

const TooltipStyle = {
  backgroundColor: '#F9D354',
  color: '#0A0806',
}

export function InfoLink(props: InfoLinkProps): JSX.Element {
  return (
    <VStack
      css={{
        marginLeft: '10px',
      }}
    >
      <a
        href={props.href}
        style={{ textDecoration: 'none', width: '24px', height: '24px' }}
        target="_blank"
        rel="noreferrer"
      >
        <TooltipWrapped
          tooltipContent="Learn More"
          tooltipSide={'top'}
          style={TooltipStyle}
          arrowStyles={{ fill: '#F9D354' }}
        >
          <EditInfoIcon size={24} color={theme.colors.grayText.toString()} />
        </TooltipWrapped>
      </a>
    </VStack>
  )
}
