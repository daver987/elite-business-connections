export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Create new referral
  return {
    message: 'Create new referral',
    data: body
  }
})