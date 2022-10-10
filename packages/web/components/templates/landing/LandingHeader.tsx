import Link from 'next/link'
import { Box, SpanBox } from '../../elements/LayoutPrimitives'
import { OmnivoreNameLogo } from '../../elements/images/OmnivoreNameLogo'

const containerStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  p: '0px 15px 0px 15px',
  height: '68px',
  minHeight: '68px',
  display: 'flex',
  alignItems: 'center',
  '@md': { width: '50%' },
  '@xsDown': { height: '48px' },
  justifyContent: 'space-between',
  width: '100%',
}

const linkStyles = {
  marginLeft: 'auto',
  verticalAlign: 'middle',
  cursor: 'pointer',
  lineHeight: '100%',
}

const textStyles = {
  pt: '5px',
  pr: '6px',
  fontSize: 24,
  lineHeight: '24px',
  fontWeight: 'normal',
}

export function LandingHeader(): JSX.Element {
  return (
    <Box css={containerStyles}>
      <OmnivoreNameLogo color={'#3D3D3D'} href="/login" />
      <Box css={linkStyles}>
        <Box>
          <Link passHref href="/login">
            <a
              style={{
                textDecoration: 'none',
                color: '#3D3D3D',
                fontFamily: 'Inter',
                fontWeight: 500,
              }}
            >
              <SpanBox css={textStyles}>Log in</SpanBox>
            </a>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
