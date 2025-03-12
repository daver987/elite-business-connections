export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  // Update member by ID
  return {
    message: `Update member with ID: ${id}`,
    data: body
  }
})