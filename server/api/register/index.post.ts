import type { Register, RegisterResponse } from '~/types/Register'

async function getConfig(): Promise<{ role: string; token: string }> {
  const config = useRuntimeConfig()
  return {
    token: config.DIRECTUS_SERVER_TOKEN,
    role: 'b2ef9b05-ab76-4f3c-a41c-e17dc81fa31c',
  }
}

export default defineEventHandler(async (event) => {
  const { first_name, last_name, email, password } =
    await readBody<Register>(event)
  const { token, role } = await getConfig()

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const requestBody = {
    first_name,
    last_name,
    email,
    password,
    role,
  }

  try {
    const result = await $fetch<RegisterResponse>(
      'https://members.elitebusinessconnections.ca/users',
      {
        method: 'POST',
        headers,
        body: requestBody,
      }
    )
    console.log('Registration result', result)
    if (result.data && result.data.id) {
      return { statusCode: 202 }
    } else {
      throw new Error('Registration failed')
    }
  } catch (error) {
    console.error('Error during user registration:', error)
    return { error: 'Failed to register user.' }
  }
})
