<script setup lang="ts">
import { ref } from '#imports'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { handleKeydownSubmit } from '~/utils/handleKeydownSubmit'
import { showToast } from '~/utils/showToast'
import { professions } from '~/data/professions'

const sourceOptions = ref(['Google', 'Friend', 'Social Media', 'Other'])
const businessTypeOptions = professions()
const loading = ref(false)
const dangerIcon = 'i-heroicons-no-symbol'

// Define schema directly in the component
const schema = z.object({
  first_name: z.string().min(1, 'First name is required').trim(),
  last_name: z.string().min(1, 'Last name is required').trim(),
  phone_number: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Invalid phone number format must be 555 555 1234',
    })
    .min(10)
    .trim()
    .transform((val) => {
      const digits = val.replace(/\D/g, '')
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    }),
  email_address: z
    .string({ required_error: 'An email address is required' })
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  source: z.string().min(1, 'Please select where you heard about us'),
  business_type: z.object({
    label: z.string().min(1, 'Please select your type of business'),
    value: z.number(),
  }),
  additional_info: z.string().optional(),
})

// Define type from schema
type Schema = z.output<typeof schema>

// Initial form state
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

type ApiResponse = {
  statusCode: number
  message?: string
  error?: string
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const response = await $fetch<ApiResponse>('/api/contact', {
      method: 'POST',
      body: event.data,
    })

    if (response.statusCode === 202) {
      await showToast(
        'submit_contact',
        'green',
        'Success',
        'Your request has been submitted successfully.',
        'i-heroicons-check-badge'
      )
      loading.value = false
      await resetForm()
    } else {
      console.error('Error submitting form:', response.error || 'Unknown error')
      await showToast(
        'contact_error',
        'red',
        'Error',
        'There was an error submitting your form.',
        dangerIcon
      )
      loading.value = false
    }
  } catch (error) {
    console.error('Exception during form submission:', error)
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
      :schema="schema"
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
