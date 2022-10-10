import { ComponentStory, ComponentMeta } from '@storybook/react'
import MobileInstallHelp from '../components/elements/MobileInstallHelp'
import { Box } from '../components/elements/LayoutPrimitives'

export default {
  title: 'Components/MobileInstallHelp',
  component: MobileInstallHelp,
  argTypes: {
    onboarding: {
      description:
        'Changes the appearence of the component to match onboarding page designs.',
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof MobileInstallHelp>

const Template: ComponentStory<typeof MobileInstallHelp> = (args) => (
  <Box
    css={{
      maxWidth: '50rem',
      margin: 'auto',
      marginBottom: '100px',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #0000000F',
      boxShadow: '0px 3px 11px 0px #201F1D0A',
    }}
  >
    <MobileInstallHelp {...args} />
  </Box>
)

export const MobileInstallHelpStory = Template.bind({})
MobileInstallHelpStory.args = {
  onboarding: false,
}

export const OnboardingMobileInstallHelpStory = Template.bind({})
OnboardingMobileInstallHelpStory.args = {
  onboarding: true,
}
