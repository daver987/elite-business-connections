import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const { pageId, sectionId } = event.context.params || {}

    if (!pageId || !sectionId) {
      return {
        statusCode: 400,
        error: 'Missing required parameters: pageId and sectionId',
      }
    }

    // Try to find the page content
    const pageContent = await prisma.pageContent.findUnique({
      where: {
        pageId_sectionId: {
          pageId,
          sectionId,
        },
      },
    })

    // If not found, return 404
    if (!pageContent) {
      return {
        statusCode: 404,
        error: 'Page content not found',
      }
    }

    // Return the content
    return {
      statusCode: 200,
      data: pageContent.content,
    }
  } catch (error) {
    console.error('Error fetching page content:', error)
    return {
      statusCode: 500,
      error: 'Failed to fetch page content',
    }
  }
})
