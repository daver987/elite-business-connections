import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'
import { createContact } from '../../utils/directus-helpers'
import type { Contact, ContactForm } from '~/types/ContactForm'

async function getConfig(): Promise<{
  sendgridApiKey: string
  bearerToken: string
}> {
  const sendgridApiKey = useRuntimeConfig().SENDGRID_API_KEY
  const bearerToken = useRuntimeConfig().DIRECTUS_SERVER_TOKEN
  return {
    sendgridApiKey,
    bearerToken,
  }
}

function mapToContactArray(data: ContactForm[]): Contact[] {
  return data.map((item) => ({
    contact_type: 'form_submission',
    is_contact_form_lead: true,
    first_name: item.first_name,
    last_name: item.last_name,
    email_address: item.email_address,
    phone_number: item.phone_number,
    needs_followup: true,
    contact_notes: `Business Type: ${item.business_type.label} (${
      item.business_type.value
    }), Source: ${item.source}${
      item.additional_info ? `, Additional Info: ${item.additional_info}` : ''
    }`,
  }))
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactFormSchema.parse)
  const { sendgridApiKey, bearerToken } = await getConfig()
  const contactArray: Contact[] = mapToContactArray([body])

  try {
    const statusCode = await sendContactFormEmail(body, sendgridApiKey)
    console.log('Email sent')
    const contact = await createContact(bearerToken, contactArray)
    console.log('contact', contact)

    return statusCode
  } catch (error) {
    console.error(error)
    return { error }
  }
})
