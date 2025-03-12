export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Delete blog post
  return {
    message: `Delete post with ID: ${id}`,
  }
})
