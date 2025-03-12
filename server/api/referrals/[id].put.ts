export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  // Update referral status
  return {
    message: `Update referral with ID: ${id}`,
    data: body,
  }
})
