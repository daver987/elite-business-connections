import chalk from 'chalk'
import type { Register, RegisterResponse } from '~/types/Register'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { first_name, last_name, email, password } =
    await readBody<Register>(event)

  const token = config.DIRECTUS_SERVER_TOKEN
  const role = 'b2ef9b05-ab76-4f3c-a41c-e17dc81fa31c'

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
    console.log(chalk.green('Registration result:'), result)
    if (result.data && result.data.id) {
      return { statusCode: 202 }
    } else {
      throw new Error('Registration failed: Data is undefined or lacks ID')
    }
  } catch (error: unknown) {
    // Narrow down the type to Error using an assertion
    if (error instanceof Error) {
      console.error(chalk.red('Error during user registration:'), error.message)
      // Log the error response if it exists and if error is of type AxiosError
      if ('response' in error) {
        console.error(chalk.red('Error response:'), error.response)
      }
    } else {
      // Handle cases where the caught error is not an instance of Error
      console.error(chalk.red('An unexpected error occurred:'), error)
    }
    return { error: 'Failed to register user.' }
  }
})
