export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  // Update blog post
  return {
    message: `Update post with ID: ${id}`,
    data: body,
  }
})
