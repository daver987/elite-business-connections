import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'

import { NextApiRequest, NextApiResponse } from 'next'
import { contactFormSchema } from '~/types/ContactForm'
import { sendContactFormEmail } from '~/server/utils/emailUtils'

async function createContactInDirectus(contactData: any) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${process.env.DIRECTUS_SERVER_TOKEN}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify([contactData]),
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://members.elitebusinessconnections.ca/items/contacts", requestOptions)
    const result = await response.text()
    console.log(result)
  } catch (error) {
    console.log('error', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await readValidatedBody(req, contactFormSchema.parse)
  const sendgridApiKey = process.env.SENDGRID_API_KEY

  try {
    const statusCode = await sendContactFormEmail(body, sendgridApiKey)
    console.log('Email sent')

    await createContactInDirectus(body)

    res.status(200).json({ status: 'success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while processing your request.' })
  }
}
