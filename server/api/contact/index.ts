import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'
import { createContact } from '../../utils/directus-helpers'
import type { Contact, ContactForm } from '~/types/ContactForm'

const getConfig = () => {
  const sendgridApiKey = useRuntimeConfig().SENDGRID_API_KEY
  const bearerToken = useRuntimeConfig().DIRECTUS_SERVER_TOKEN
  return {
    sendgridApiKey,
    bearerToken,
  }
}

function mapToContactArray(data: ContactForm[]): Contact[] {
  return data.map((item) => ({
    user_created: '63b3d6ff-8d38-46cc-935c-36ebeb697777',
    contact_type: 'form_submission',
    first_name: item.first_name,
    last_name: item.last_name,
    email_address: item.email_address,
    phone_number: item.phone_number,
    contact_notes: `Business Type: ${item.business_type.label} (${
      item.business_type.value
    }), Source: ${item.source}${
      item.additional_info ? `, Additional Info: ${item.additional_info}` : ''
    }`,
  }))
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, contactFormSchema.parse)
  const config = getConfig()
  const contactArray: Contact[] = mapToContactArray([body])

  try {
    const statusCode = await sendContactFormEmail(body, config.sendgridApiKey)
    console.log('Email sent')
    const contact = await createContact(config.bearerToken, contactArray)
    console.log('contact', contact)

    return statusCode
  } catch (error) {
    console.error(error)
    return { error }
  }
})
