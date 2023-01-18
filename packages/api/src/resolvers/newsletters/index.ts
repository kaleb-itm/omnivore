import { authorized } from '../../utils/helpers'
import {
  CreateNewsletterEmailError,
  CreateNewsletterEmailErrorCode,
  CreateNewsletterEmailSuccess,
  DeleteNewsletterEmailError,
  DeleteNewsletterEmailErrorCode,
  DeleteNewsletterEmailSuccess,
  MutationDeleteNewsletterEmailArgs,
  NewsletterEmailsError,
  NewsletterEmailsErrorCode,
  NewsletterEmailsSuccess,
  SubscriptionStatus,
} from '../../generated/graphql'
import {
  createNewsletterEmail,
  deleteNewsletterEmail,
  getNewsletterEmails,
} from '../../services/newsletters'
import { NewsletterEmail } from '../../entity/newsletter_email'
import { analytics } from '../../utils/analytics'
import { env } from '../../env'
import { User } from '../../entity/user'
import { unsubscribeAll } from '../../services/subscriptions'
import { getRepository } from '../../entity/utils'

export const createNewsletterEmailResolver = authorized<
  CreateNewsletterEmailSuccess,
  CreateNewsletterEmailError
>(async (_parent, _args, { claims }) => {
  console.log('createNewsletterEmailResolver')
  analytics.track({
    userId: claims.uid,
    event: 'newsletter_email_address_created',
    properties: {
      env: env.server.apiEnv,
    },
  })

  try {
    const newsletterEmail = await createNewsletterEmail(claims.uid)

    return {
      newsletterEmail: {
        ...newsletterEmail,
        subscriptionCount: 0,
      },
    }
  } catch (e) {
    console.log(e)

    return {
      errorCodes: [CreateNewsletterEmailErrorCode.BadRequest],
    }
  }
})

export const newsletterEmailsResolver = authorized<
  NewsletterEmailsSuccess,
  NewsletterEmailsError
>(async (_parent, _args, { claims }) => {
  console.log('newsletterEmailsResolver')

  try {
    const user = await getRepository(User).findOneBy({
      id: claims.uid,
    })
    if (!user) {
      return Promise.reject({
        errorCode: NewsletterEmailsErrorCode.Unauthorized,
      })
    }

    const newsletterEmails = await getNewsletterEmails(user.id)

    return {
      newsletterEmails: newsletterEmails.map((newsletterEmail) => ({
        ...newsletterEmail,
        subscriptionCount: newsletterEmail.subscriptions.filter(
          (s) => s.status == SubscriptionStatus.Active
        ).length,
      })),
    }
  } catch (e) {
    console.log(e)

    return {
      errorCodes: [NewsletterEmailsErrorCode.BadRequest],
    }
  }
})

export const deleteNewsletterEmailResolver = authorized<
  DeleteNewsletterEmailSuccess,
  DeleteNewsletterEmailError,
  MutationDeleteNewsletterEmailArgs
>(async (_parent, args, { claims }) => {
  console.log('deleteNewsletterEmailResolver')
  analytics.track({
    userId: claims.uid,
    event: 'newsletter_email_address_deleted',
    properties: {
      env: env.server.apiEnv,
    },
  })

  try {
    const newsletterEmail = await getRepository(NewsletterEmail).findOne({
      where: {
        id: args.newsletterEmailId,
      },
      relations: ['user', 'subscriptions'],
    })

    if (!newsletterEmail) {
      return {
        errorCodes: [DeleteNewsletterEmailErrorCode.NotFound],
      }
    }

    if (newsletterEmail.user.id !== claims.uid) {
      return {
        errorCodes: [DeleteNewsletterEmailErrorCode.Unauthorized],
      }
    }

    // unsubscribe all before deleting
    await unsubscribeAll(newsletterEmail)

    const deleted = await deleteNewsletterEmail(args.newsletterEmailId)
    if (deleted) {
      return {
        newsletterEmail: {
          ...newsletterEmail,
          subscriptionCount: newsletterEmail.subscriptions.length,
        },
      }
    } else {
      // when user tries to delete other's newsletters emails or email already deleted
      return {
        errorCodes: [DeleteNewsletterEmailErrorCode.NotFound],
      }
    }
  } catch (e) {
    console.log(e)

    return {
      errorCodes: [DeleteNewsletterEmailErrorCode.BadRequest],
    }
  }
})
