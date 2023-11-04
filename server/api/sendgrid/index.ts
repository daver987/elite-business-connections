import sgMail from '@sendgrid/mail'

const getConfig = () => {
  return useRuntimeConfig().SENDGRID_API_KEY
}

const msg = {
  to: 'info@drobertson.pro',
  from: 'contact@elitebusinessconnections.ca',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
const SENDGRID_TEMPLATE = "d-55354bbb9b7749d8b3b7938892330028"
export default defineEventHandler(async (event) => {
  const apiKey = getConfig()
  sgMail.setApiKey(apiKey)

  try {
    const response = await sgMail.send(msg)
    console.log('Email sent')
    return { response }
  } catch (error) {
    console.error(error)
    return { error }
  }
})
