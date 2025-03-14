import prisma from '~/lib/prisma'
import type { Post } from '~/types/Post'

export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = (query.search as string) || ''
    const status = (query.status as string) || ''
    const sort = (query.sort as string) || 'createdAt:desc'

    // Parse sort parameter
    const [sortField, sortOrder] = sort.split(':')
    const orderBy = {
      [sortField]: sortOrder === 'desc' ? 'desc' : 'asc',
    }

    // Build filter conditions
    const where: any = {}

    // Apply search filter if provided
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Apply status filter if provided
    if (status === 'published') {
      where.published = true
    } else if (status === 'draft') {
      where.published = false
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count
    const total = await prisma.post.count({ where })

    // Fetch posts with pagination and filtering
    const posts = await prisma.post.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    })

    return {
      data: posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error: any) {
    console.error('Error fetching posts:', error)

    // Until Prisma is properly set up, return mock data
    const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Sample Blog Post ${i + 1}`,
      slug: `sample-blog-post-${i + 1}`,
      content: 'This is sample content.',
      excerpt: 'This is a sample excerpt.',
      published: i % 2 === 0,
      createdAt: new Date(Date.now() - i * 86400000),
      updatedAt: new Date(Date.now() - i * 43200000),
    }))

    return {
      data: mockPosts,
      total: 25,
      page: 1,
      limit: 10,
      totalPages: 3,
    }
  }
})
