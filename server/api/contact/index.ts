import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'

const getConfig = () => {
 const sendgridApiKey = useRuntimeConfig().SENDGRID_API_KEY
  const bearerToken = useRuntimeConfig().DIRECTUS_SERVER_TOKEN
  return
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer *****");

var raw = JSON.stringify([
  {
    "first_name": "<string>",
    "last_name": "<string>",
    "email_address": "<string>",
    "phone_number": "<string>",
    "notes": "<string>"
  }
]);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://members.elitebusinessconnections.ca/items/contacts", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

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
