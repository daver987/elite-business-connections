import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Get all contacts, sorted by most recent first
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      statusCode: 200,
      data: contacts,
    }
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return {
      statusCode: 500,
      error: 'Failed to fetch contacts',
    }
  }
})
