import { z } from 'zod'
// import { sendSubscriptionEmail } from '~/server/utils/emailUtils'
import prisma from '~/lib/prisma'

// Define the schema for validation
const subscriptionSchema = z.object({
  email_address: z
    .string({ required_error: 'An email address is required' })
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
})

async function getConfig(): Promise<{
  sendgridApiKey: string
}> {
  const sendgridApiKey = useRuntimeConfig().SENDGRID_API_KEY
  return { sendgridApiKey }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, subscriptionSchema.parse)
    const { sendgridApiKey } = await getConfig()

    // Save to the database
    await prisma.subscription.create({
      data: {
        emailAddress: body.email_address,
        isActive: true,
      },
    })

    // We'll implement email sending later
    // For now, we're just commenting this out as we're focusing on DB storage
    // const emailResult = await sendSubscriptionEmail(body, sendgridApiKey)

    return { statusCode: 202, message: 'Subscription successfully processed' }
  } catch (error) {
    console.error('Error processing subscription:', error)
    return { statusCode: 500, error: 'Failed to process subscription' }
  }
})
