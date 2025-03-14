import prisma from '~/lib/prisma'
import slugify from 'slugify'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Validate required fields
    if (!body.title) {
      return {
        statusCode: 400,
        error: 'Title is required',
      }
    }

    if (!body.content) {
      return {
        statusCode: 400,
        error: 'Content is required',
      }
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return {
        statusCode: 404,
        error: 'Post not found',
      }
    }

    // Generate slug if not provided
    let slug = body.slug
    if (!slug) {
      slug = slugify(body.title, { lower: true, strict: true })
    }

    // Check if slug exists for a different post
    if (slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: { slug },
      })

      if (slugExists) {
        // Append a random string to make the slug unique
        slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`
      }
    }

    // Update the post
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt || null,
        featuredImage: body.featuredImage || null,
        published: body.published || false,
      },
    })

    return {
      statusCode: 200,
      data: post,
    }
  } catch (error) {
    console.error('Error updating post:', error)

    return {
      statusCode: 500,
      error: 'Failed to update post',
    }
  }
})
