import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'

const getConfig = () => {
  return useRuntimeConfig().SENDGRID_API_KEY
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactFormSchema.parse)
  const apiKey = getConfig()

  try {
    const statusCode = await sendContactFormEmail(body, apiKey)
    console.log('Email sent')

    return statusCode
  } catch (error) {
    console.error(error)
    return { error }
  }
})