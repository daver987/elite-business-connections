import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
      return {
        statusCode: 400,
        error: 'Post slug is required',
      }
    }

    const post = await prisma.post.findUnique({
      where: { slug },
    })

    if (!post) {
      return {
        statusCode: 404,
        error: 'Post not found',
      }
    }

    // Only return published posts publicly
    if (!post.published) {
      return {
        statusCode: 404,
        error: 'Post not found or not published',
      }
    }

    return {
      statusCode: 200,
      data: post,
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)

    return {
      statusCode: 500,
      error: 'Failed to fetch post',
    }
  }
})
