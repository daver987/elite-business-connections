<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { professions } from '~/data/professions'

const contactFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  email_address: z.string().email('Invalid email'),
  source: z.string().min(1, 'Please select where you heard about us'),
  business_type: z.object({
    label: z.string().min(1, 'Please select your type of business'),
    value: z.number(),
  }),
  additional_info: z.string().optional(),
})

type ContactForm = z.output<typeof contactFormSchema>

const state = reactive({
  first_name: undefined,
  last_name: undefined,
  phone_number: undefined,
  email_address: undefined,
  source: undefined,
  business_type: undefined,
  additional_info: undefined,
})

const sourceOptions = ref(['Google', 'Friend', 'Social Media', 'Other'])
const businessTypeOptions = professions()

async function submit(event: FormSubmitEvent<ContactForm>) {
  const data = await $fetch("/api/sendgrid",{
    method: "POST",
    body: event.data
  })
  console.log('Form submitted:', event.data)
  return data
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
    <UForm :schema="contactFormSchema" :state="state" @submit="submit">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup class="mb-2" label="First Name" name="firstName" required>
          <UInput
            v-model="state.first_name"
            placeholder="Enter your first name"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup class="mb-2" label="Last Name" name="lastName" required>
          <UInput
            v-model="state.last_name"
            placeholder="Enter your last name"
            size="lg"
          />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup
          class="mb-2"
          label="Phone Number"
          name="phoneNumber"
          required
        >
          <UInput
            v-model="state.phone_number"
            placeholder="Enter your phone number"
            type="tel"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup class="mb-2" label="Email" name="email" required>
          <UInput
            v-model="state.email_address"
            placeholder="you@example.com"
            size="lg"
            type="email"
          />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup
          class="mb-2"
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
          class="mb-2"
          label="Type of Business"
          name="businessType"
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
          class="mb-2"
          label="Additional Information"
          name="additionalInfo"
        >
          <UTextarea
            v-model="state.additional_info"
            placeholder="Any additional information you'd like to provide?"
            size="lg"
          />
        </UFormGroup>
      </div>
      <UButton size="lg" block type="submit">Submit</UButton>
    </UForm>
  </UCard>
</template>
