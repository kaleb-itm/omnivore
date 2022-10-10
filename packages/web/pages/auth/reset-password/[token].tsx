import { PageMetaData } from '../../../components/patterns/PageMetaData'
import { ProfileLayout } from '../../../components/templates/ProfileLayout'
import { EmailResetPassword } from '../../../components/templates/auth/EmailResetPassword'

export default function EmailRegistrationPage(): JSX.Element {
  return (
    <>
      <PageMetaData
        title="Reset your password - Omnivore"
        path="/auth-forgot-password"
      />
      <ProfileLayout>
        <EmailResetPassword />
      </ProfileLayout>
      <div data-testid="auth-forgot-password-page-tag" />
    </>
  )
}
