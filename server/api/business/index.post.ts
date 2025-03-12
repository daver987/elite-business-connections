export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Log closed business
  return {
    message: 'Log closed business',
    data: body,
  }
})
