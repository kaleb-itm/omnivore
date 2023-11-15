import { env } from '../env'
import { generateVerificationToken } from '../utils/auth'
import { sendEmail } from '../utils/sendEmail'

export const sendConfirmationEmail = async (user: {
  id: string
  name: string
  email: string
}): Promise<boolean> => {
  // generate confirmation link
  const token = generateVerificationToken({ id: user.id })
  const link = `${env.client.url}/auth/confirm-email/${token}`
  // send email
  const dynamicTemplateData = {
    name: user.name,
    link,
  }

  return sendEmail({
    from: env.sender.message,
    to: user.email,
    templateId: env.sendgrid.confirmationTemplateId,
    dynamicTemplateData,
  })
}

export const sendVerificationEmail = async (user: {
  id: string
  name: string
  email: string
}): Promise<boolean> => {
  // generate verification link
  const token = generateVerificationToken({ id: user.id, email: user.email })
  const link = `${env.client.url}/auth/reset-password/${token}`
  // send email
  const dynamicTemplateData = {
    name: user.name,
    link,
  }

  return sendEmail({
    from: env.sender.message,
    to: user.email,
    templateId: env.sendgrid.verificationTemplateId,
    dynamicTemplateData,
  })
}

export const sendPasswordResetEmail = async (user: {
  id: string
  name: string
  email: string
}): Promise<boolean> => {
  // generate link
  const token = generateVerificationToken({ id: user.id })
  const link = `${env.client.url}/auth/reset-password/${token}`
  // send email
  const dynamicTemplateData = {
    name: user.name,
    link,
  }

  return sendEmail({
    from: env.sender.message,
    to: user.email,
    templateId: env.sendgrid.resetPasswordTemplateId,
    dynamicTemplateData,
  })
}
