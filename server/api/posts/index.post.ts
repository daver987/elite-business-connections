import prisma from '~/lib/prisma'
import slugify from 'slugify'

export default defineEventHandler(async (event) => {
  try {
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

    // Generate slug if not provided
    let slug = body.slug
    if (!slug) {
      slug = slugify(body.title, { lower: true, strict: true })
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    })

    if (existingPost) {
      // Append a random string to make the slug unique
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`
    }

    // Create new post
    const post = await prisma.post.create({
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
      statusCode: 201,
      data: post,
    }
  } catch (error) {
    console.error('Error creating post:', error)

    return {
      statusCode: 500,
      error: 'Failed to create post',
    }
  }
})
