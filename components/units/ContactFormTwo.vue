<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { professions } from '~/data/professions'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email'),
  source: z.string().min(1, 'Please select where you heard about us'),
  businessType: z.object({
    label: z.string().min(1, 'Please select your type of business'),
    value: z.number()
  }),
  additionalInfo: z.string().optional(),
})

type Schema = z.output<typeof schema>

const state = ref({
  firstName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  email: undefined,
  source: undefined,
  businessType: undefined,
  additionalInfo: undefined,
})

const sourceOptions = ref(['Google', 'Friend', 'Social Media', 'Other'])
const businessTypeOptions = professions()

async function submit(event: FormSubmitEvent<Schema>) {
  console.log('Form submitted:', event.data)
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
    <UForm :schema="schema" :state="state" @submit="submit">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UFormGroup class="mb-2" label="First Name" name="firstName" required>
          <UInput
              v-model="state.firstName"
              placeholder="Enter your first name"
              size="lg"
          />
        </UFormGroup>
        <UFormGroup class="mb-2" label="Last Name" name="lastName" required>
          <UInput
              v-model="state.lastName"
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
              v-model="state.phoneNumber"
              placeholder="Enter your phone number"
              type="tel"
              size="lg"
          />
        </UFormGroup>
        <UFormGroup class="mb-2" label="Email" name="email" required>
          <UInput
              v-model="state.email"
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
              v-model="state.businessType"
              :options="businessTypeOptions"
              placeholder="Select your type of business"
              searchable
              searchable-placeholder="Search for business type"
              size="lg"
          />
        </UFormGroup>
      </div>
      <UFormGroup
          class="mb-2"
          label="Additional Information"
          name="additionalInfo"
      >
        <UTextarea
            v-model="state.additionalInfo"
            placeholder="Any additional information you'd like to provide?"
            size="lg"
        />
      </UFormGroup>
      <UButton size="lg" block type="submit">Submit</UButton>
    </UForm>
  </UCard>
</template>
