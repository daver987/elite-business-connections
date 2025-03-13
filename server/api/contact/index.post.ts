import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'
import prisma from '~/lib/prisma'

async function getConfig(): Promise<{
  sendgridApiKey: string
}> {
  const sendgridApiKey = useRuntimeConfig().SENDGRID_API_KEY
  return { sendgridApiKey }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, contactFormSchema.parse)
    const { sendgridApiKey } = await getConfig()

    await prisma.contact.create({
      data: {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email_address,
        phone: body.phone_number,
        source: body.source,
        businessType: body.business_type.label,
        businessTypeId: body.business_type.value,
        additionalInfo: body.additional_info || '',
        needsFollowup: true,
        isContactFormLead: true,
      },
    })

    const emailResult = await sendContactFormEmail(body, sendgridApiKey)

    if (emailResult.statusCode >= 200 && emailResult.statusCode < 300) {
      return { statusCode: 202, message: 'Contact form submitted successfully' }
    } else {
      console.error(
        'Email sending failed with status code:',
        emailResult.statusCode
      )
      return {
        statusCode: 202,
        message: 'Contact form submitted but email notification failed',
      }
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return {
      statusCode: 500,
      error: 'Failed to process contact form submission',
    }
  }
})
