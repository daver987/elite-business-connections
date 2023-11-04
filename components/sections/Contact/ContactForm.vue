<script setup lang='ts'>
import { ref } from '#imports'
import type { FormSubmitEvent, NotificationColor } from '@nuxt/ui/dist/runtime/types'
import { professions } from '~/data/professions'
import { type ContactForm, contactFormSchema } from '~/types/ContactForm'
import { type SendgridResponse, sendgridResponseSchema } from '~/types/ContactForm'

const state = reactive({
  first_name: undefined,
  last_name: undefined,
  phone_number: undefined,
  email_address: undefined,
  source: undefined,
  business_type: undefined,
  additional_info: undefined
})

const sourceOptions = ref(['Google', 'Friend', 'Social Media', 'Other'])
const businessTypeOptions = professions()
const loading = ref(false)
const toast = useToast()
const dangerIcon = 'i-heroicons-no-symbol'

async function showToast(color: NotificationColor, title: string, description: string, icon: string) {
  toast.add({
    id: 'form_submission',
    color: color,
    title: title,
    description: description,
    timeout: 7000,
    icon: icon
  })
}

async function resetForm() {
  state.first_name = undefined
  state.last_name = undefined
  state.phone_number = undefined
  state.email_address = undefined
  state.source = undefined
  state.business_type = undefined
  state.additional_info = undefined
}

async function submit(event: FormSubmitEvent<ContactForm>) {
  loading.value = true
  const response = await $fetch<SendgridResponse>('/api/sendgrid', {
    method: 'POST',
    body: event.data
  })
  console.log('Form submitted:', event.data)

  console.log('Server Response', response)
  const sendgridResponse = sendgridResponseSchema.parse(response)


  if (sendgridResponse.response[0].statusCode === 202) {
    await showToast('primary', 'Success', 'Your form has been submitted successfully.', 'i-heroicons-check-badge')
    await resetForm()
  } else {
    await showToast('red', 'Error', 'There was an error submitting your form.', dangerIcon)
  }
  loading.value = false
}
</script>

<template>
  <UCard
    class='space-y-4 max-w-2xl w-full'
    :ui="{ background: 'dark:bg-gray-950' }"
  >
    <template #header>
      <h2 class='text-white text-4xl text-center'>Contact Us Today</h2>
    </template>
    <UForm :schema='contactFormSchema' :state='state' @submit='submit'>
      <div class='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <UFormGroup class='mb-2' label='First Name' name='firstName' required>
          <UInput
            v-model='state.first_name'
            placeholder='Enter your first name'
            size='lg'
          />
        </UFormGroup>
        <UFormGroup class='mb-2' label='Last Name' name='lastName' required>
          <UInput
            v-model='state.last_name'
            placeholder='Enter your last name'
            size='lg'
          />
        </UFormGroup>
      </div>
      <div class='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <UFormGroup
          class='mb-2'
          label='Phone Number'
          name='phoneNumber'
          required
        >
          <UInput
            v-model='state.phone_number'
            placeholder='Enter your phone number'
            type='tel'
            size='lg'
          />
        </UFormGroup>
        <UFormGroup class='mb-2' label='Email' name='email' required>
          <UInput
            v-model='state.email_address'
            placeholder='you@example.com'
            size='lg'
            type='email'
          />
        </UFormGroup>
      </div>
      <div class='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <UFormGroup
          class='mb-2'
          label='Where did you hear about us?'
          name='source'
          required
        >
          <USelectMenu
            v-model='state.source'
            :options='sourceOptions'
            placeholder='Select an option'
            size='lg'
          />
        </UFormGroup>
        <UFormGroup
          class='mb-2'
          label='Type of Business'
          name='businessType'
          required
        >
          <USelectMenu
            v-model='state.business_type'
            :options='businessTypeOptions'
            placeholder='Select your type of business'
            searchable
            searchable-placeholder='Search for business type'
            size='lg'
          />
        </UFormGroup>
      </div>
      <div class='grid grid-cols-1'>
        <UFormGroup
          class='mb-2'
          label='Additional Information'
          name='additionalInfo'
        >
          <UTextarea
            v-model='state.additional_info'
            placeholder="Any additional information you'd like to provide?"
            size='lg'
          />
        </UFormGroup>
      </div>
      <UButton size='lg' block type='submit' :loading='loading'>Submit</UButton>
    </UForm>
  </UCard>
</template>
