import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      return {
        statusCode: 400,
        error: 'Post ID is required',
      }
    }

    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return {
        statusCode: 404,
        error: 'Post not found',
      }
    }

    return {
      statusCode: 200,
      data: post,
    }
  } catch (error) {
    console.error('Error fetching post:', error)

    return {
      statusCode: 500,
      error: 'Failed to fetch post',
    }
  }
})
