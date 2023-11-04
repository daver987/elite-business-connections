import sgMail from '@sendgrid/mail'

const getConfig = () => {
  return useRuntimeConfig().SENDGRID_API_KEY
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
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
