<script setup lang="ts">
import { ref } from '#imports'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { handleKeydownSubmit } from '~/utils/handleKeydownSubmit'
import { showToast } from '~/utils/showToast'
import { professions } from '~/data/professions'
import { type ContactForm, contactFormSchema } from '~/types/ContactForm'

const sourceOptions = ref(['Google', 'Friend', 'Social Media', 'Other'])
const businessTypeOptions = professions()
const loading = ref(false)
const dangerIcon = 'i-heroicons-no-symbol'

const state = reactive({
  first_name: undefined,
  last_name: undefined,
  phone_number: undefined,
  email_address: undefined,
  source: undefined,
  business_type: undefined,
  additional_info: undefined,
})

async function resetForm() {
  state.first_name = undefined
  state.last_name = undefined
  state.phone_number = undefined
  state.email_address = undefined
  state.source = undefined
  state.business_type = undefined
  state.additional_info = undefined
}

type StatusCodeResponse = {
  statusCode: number
}

async function onSubmit(event: FormSubmitEvent<ContactForm>) {
  loading.value = true
  const response = await $fetch<StatusCodeResponse>('/api/contact', {
    method: 'POST',
    body: event.data,
  })

  if (response.statusCode === 202) {
    setTimeout(async () => {
      await showToast(
        'submit_contact',
        'green',
        'Success',
        'Your request has been submitted successfully.',
        'i-heroicons-check-badge'
      )
      loading.value = false
      await resetForm()
    }, 3500)
  } else {
    console.error('Error parsing server response:', response.statusCode)
    await showToast(
      'contact_error',
      'red',
      'Error',
      'There was an error submitting your form.',
      dangerIcon
    )
    loading.value = false
  }
}
</script>

<template>
  <UCard
    class="space-y-4 max-w-2xl w-full"
    :ui="{ background: 'dark:bg-gray-950' }"
  >
    <template #header>
      <h2 class="text-white text-4xl text-center">Contact Us Today</h2>
    </template>
    <UForm
      :schema="contactFormSchema"
      :state="state"
      @submit="onSubmit"
      @keydown.enter="handleKeydownSubmit(onSubmit)"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup class="my-2" label="First Name" name="first_name" required>
          <UInput
            v-model="state.first_name"
            placeholder="Enter your first name"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup class="my-2" label="Last Name" name="last_name" required>
          <UInput
            v-model="state.last_name"
            placeholder="Enter your last name"
            size="lg"
          />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup class="my-2" label="Email" name="email_address" required>
          <UInput
            v-model="state.email_address"
            placeholder="you@example.com"
            size="lg"
            type="email"
          />
        </UFormGroup>
        <UFormGroup
          class="my-2"
          label="Phone Number"
          name="phone_number"
          required
        >
          <UInput
            v-model="state.phone_number"
            placeholder="555 555 1234"
            type="tel"
            size="lg"
          />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup
          class="my-2"
          label="Where did you hear about us?"
          name="source"
          required
        >
          <USelectMenu
            v-model="state.source"
            :options="sourceOptions"
            placeholder="Select an option"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup
          class="my-2"
          label="Type of Business"
          name="business_type"
          required
        >
          <USelectMenu
            v-model="state.business_type"
            :options="businessTypeOptions"
            placeholder="Select your type of business"
            searchable
            searchable-placeholder="Search for business type"
            size="lg"
          />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-1">
        <UFormGroup
          class="my-2"
          label="Additional Information"
          name="additional_info"
        >
          <UTextarea
            v-model="state.additional_info"
            placeholder="Any additional information you'd like to provide?"
            size="lg"
          />
        </UFormGroup>
      </div>
      <UButton class="mt-2" size="lg" block type="submit" :loading="loading"
        >Submit
      </UButton>
    </UForm>
  </UCard>
</template>
