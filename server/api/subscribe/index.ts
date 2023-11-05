import { subscriptionSchema } from '~/types/Subscription'
import { sendSubscriptionEmail } from '~/server/utils/emailUtils'

const getConfig = () => {
  return useRuntimeConfig().SENDGRID_API_KEY
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, subscriptionSchema.parse)
  const apiKey = getConfig()

  try {
    const statusCode = await sendSubscriptionEmail(body, apiKey)
    console.log('Subscription Email sent')

    return statusCode
  } catch (error) {
    console.error(error)
    return { error }
  }
})
