export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Get member by ID
  return {
    message: `Get member with ID: ${id}`
  }
})