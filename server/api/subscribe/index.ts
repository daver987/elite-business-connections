import { subscriptionSchema } from '~/types/Subscription'
import { sendSubscriptionEmail } from '~/server/utils/emailUtils'

const getConfig = (): string => {
  return useRuntimeConfig().SENDGRID_API_KEY
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, subscriptionSchema.parse)
  const apiKey = getConfig()

  try {
    return await sendSubscriptionEmail(body, apiKey)
  } catch (error) {
    console.error(error)
    return { error }
  }
})
