import { z } from 'zod'
import prisma from '~/lib/prisma'

// Define a schema for validation
const pageContentSchema = z.object({
  content: z.any(),
})

export default defineEventHandler(async (event) => {
  try {
    const { pageId, sectionId } = event.context.params || {}

    if (!pageId || !sectionId) {
      return {
        statusCode: 400,
        error: 'Missing required parameters: pageId and sectionId',
      }
    }

    // Validate the body
    const body = await readValidatedBody(event, pageContentSchema.parse)

    // Upsert the page content (create if not exists, update if exists)
    const pageContent = await prisma.pageContent.upsert({
      where: {
        pageId_sectionId: {
          pageId,
          sectionId,
        },
      },
      update: {
        content: body.content,
      },
      create: {
        pageId,
        sectionId,
        content: body.content,
      },
    })

    return {
      statusCode: 200,
      message: 'Page content updated successfully',
      data: pageContent,
    }
  } catch (error) {
    console.error('Error updating page content:', error)
    return {
      statusCode: 500,
      error: 'Failed to update page content',
    }
  }
})
