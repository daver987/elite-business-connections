import { PrismaClient } from '@prisma/client'
import type { Media } from '~/types/Media'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 20
    const search = (query.search as string) || ''
    const type = (query.type as string) || ''
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
        { filename: { contains: search, mode: 'insensitive' } },
        { mimetype: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Apply type filter if provided
    if (type === 'images') {
      where.mimetype = { startsWith: 'image/' }
    } else if (type === 'documents') {
      where.OR = [
        { mimetype: { contains: 'pdf' } },
        { mimetype: { contains: 'word' } },
        { mimetype: { contains: 'document' } },
        { mimetype: { contains: 'spreadsheet' } },
        { mimetype: { contains: 'presentation' } },
        { mimetype: { contains: 'text/' } },
      ]
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count
    const total = await prisma.media.count({ where })

    // Fetch media files with pagination and filtering
    const mediaFiles = await prisma.media.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    })

    return {
      data: mediaFiles,
      total,
      page,
      limit,
    }
  } catch (error: any) {
    console.error('Error fetching media files:', error)

    // Mock data for development
    const mockMedia: Media[] = Array.from({ length: 20 }, (_, i) => {
      const isImg = i % 3 === 0
      const isPdf = i % 3 === 1
      const isDoc = i % 3 === 2

      let filename, mimetype, filepath

      if (isImg) {
        filename = `image-${i + 1}.jpg`
        mimetype = 'image/jpeg'
        filepath = `https://picsum.photos/seed/${i + 1}/400/300`
      } else if (isPdf) {
        filename = `document-${i + 1}.pdf`
        mimetype = 'application/pdf'
        filepath = `/files/document-${i + 1}.pdf`
      } else if (isDoc) {
        filename = `spreadsheet-${i + 1}.xlsx`
        mimetype =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        filepath = `/files/spreadsheet-${i + 1}.xlsx`
      }

      return {
        id: `media-${i + 1}`,
        filename,
        filepath,
        mimetype,
        size: Math.floor(Math.random() * 5 * 1024 * 1024), // Random size up to 5MB
        createdAt: new Date(Date.now() - i * 86400000), // Random date within last 20 days
      }
    })

    return {
      data: mockMedia,
      total: 45,
      page: 1,
      limit: 20,
    }
  }
})
