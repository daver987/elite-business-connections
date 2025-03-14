import type { User } from '~/types'

export default eventHandler(async (event) => {
  const { id } = event.context.params as { id: string }

  // Get all users from the users endpoint
  const users = await $fetch<User[]>('/api/users')

  // Find the user by ID
  const user = users.find((user) => user.id.toString() === id)

  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  return user
})
