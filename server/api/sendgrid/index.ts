import sgMail from '@sendgrid/mail'

const getConfig = () => {
  return useRuntimeConfig().SENDGRID_API_KEY
}


const msg = {
  to: 'info@drobertson.pro',
  from: 'contact@elitebusinessconnections.ca',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}

export default defineEventHandler(async (event) => {
  const apiKey = getConfig()
  sgMail.setApiKey(apiKey)

  const response = await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  return {response}
})
