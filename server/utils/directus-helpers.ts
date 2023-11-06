import type { Contact } from '~/types/ContactForm'

export async function createContact(token: string, body: Contact[]) {
  const response = await $fetch(
    'https://members.elitebusinessconnections.ca/items/contacts',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  )
  console.log('Created Contact', response)
  return JSON.stringify(response)
}
