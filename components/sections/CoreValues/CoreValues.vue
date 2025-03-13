<script setup lang="ts">
import { Icon } from '#components'

interface CoreValue {
  id: number
  title: string
  description: string
  icon: string
}

const defaultCoreValues: CoreValue[] = [
  {
    id: 1,
    title: 'Integrity',
    description:
      'We believe in ethical business practices and honest communication.',
    icon: 'i-heroicons-shield-check',
  },
  {
    id: 2,
    title: 'Excellence',
    description:
      'We are committed to providing top-quality service and exceeding expectations.',
    icon: 'i-heroicons-star',
  },
  {
    id: 3,
    title: 'Collaboration',
    description:
      'We foster meaningful connections that create mutual growth and success.',
    icon: 'i-heroicons-user-group',
  },
  {
    id: 4,
    title: 'Innovation',
    description:
      'We embrace change and continuously seek new ways to add value.',
    icon: 'i-heroicons-light-bulb',
  },
]

interface ApiResponse {
  statusCode: number
  data?: CoreValue[]
  error?: string
}

const { data: apiResponse } = useLazyFetch<ApiResponse>(
  '/api/pages/home/core-values',
  {
    default: () => ({
      statusCode: 200,
      data: defaultCoreValues,
    }),
  }
)

const coreValues = computed(() =>
  apiResponse.value?.data && apiResponse.value.statusCode === 200
    ? apiResponse.value.data
    : defaultCoreValues
)
</script>

<template>
  <UContainer class="mt-32">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Core Values
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-300">
        Our values are the foundation upon which we build strong business
        relationships, foster growth, and create opportunities.
      </p>
    </div>

    <dl
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16"
    >
      <div class="relative pl-9" v-for="value in coreValues" :key="value.id">
        <dt class="inline font-semibold text-white">
          <Icon
            class="absolute left-1 top-1 h-5 w-5 text-primary"
            :name="value.icon"
            aria-hidden="true"
          />
          {{ value.title }}
        </dt>
        {{ ' ' }}
        <dd class="inline">{{ value.description }}</dd>
      </div>
    </dl>
  </UContainer>
</template>
