export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Create new blog post
  return {
    message: 'Create new post',
    data: body,
  }
})
