import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Get all unique page and section combinations
    const pageContents = await prisma.pageContent.findMany({
      select: {
        pageId: true,
        sectionId: true,
        lastUpdated: true,
      },
    })

    // Group by pageId
    const pages = pageContents.reduce((acc, item) => {
      if (!acc[item.pageId]) {
        acc[item.pageId] = []
      }

      acc[item.pageId].push({
        sectionId: item.sectionId,
        lastUpdated: item.lastUpdated,
      })

      return acc
    }, {})

    return {
      statusCode: 200,
      data: pages,
    }
  } catch (error) {
    console.error('Error fetching page sections:', error)
    return {
      statusCode: 500,
      error: 'Failed to fetch page sections',
    }
  }
})
