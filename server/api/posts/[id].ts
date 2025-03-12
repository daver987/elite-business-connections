export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Get post by ID
  return {
    message: `Get post with ID: ${id}`
  }
})