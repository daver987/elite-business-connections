// Assume getConfig is a function that retrieves configuration like the API token and user role
const getConfig = () => {
  const config = useRuntimeConfig()
  return {
    token: config.DIRECTUS_SERVER_TOKEN,
    role: 'b2ef9b05-ab76-4f3c-a41c-e17dc81fa31c'
  }
}

export default defineEventHandler(async (event) => {
  const {first_name, last_name, email, password} = await readBody(event)
  const {token, role} = getConfig()

  // Prepare the headers for the fetch request
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  // Prepare the request body with user data
  const requestBody = {
    first_name,
    last_name,
    email,
    password,
    role
  }

  // Make the POST request to register the user using $fetch
  try {
    const result = await $fetch('https://members.elitebusinessconnections.ca/users', {
      method: 'POST',
      headers,
      body: requestBody
    })
    console.log('Registration result', result)
    // You can perform additional logic with result if needed
    return result

  } catch (error) {
    // Handle any errors
    console.error('Error during user registration:', error)
    // You may want to return a proper error response here
    return {error: 'Failed to register user.'}
  }
})
