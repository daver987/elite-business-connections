<script setup lang="ts">
import { Icon } from '#components'

interface CoreValues {
  title: string
  description: string
  iconName: string
  iconCollection: string
}

interface TransformedCoreValues {
  title: string
  description: string
  icon: string
}

const query = groq`*[ _type == "coreValues"]{
    "iconName": icon.metadata.iconName,
    "iconCollection": icon.metadata.collectionId,
    description,
    title
}`

const sanity = useSanity()

const { data: coreValuesSanity } = await useAsyncData('coreValues', () =>
  sanity.fetch<{ coreValues: CoreValues[] }>(query)
)

const transformedCoreValues: TransformedCoreValues[] =
  coreValuesSanity.value?.map((value) => {
    return {
      title: value.title,
      description: value.description,
      icon: `${value.iconCollection}:${value.iconName}`,
    }
  })
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
      <div
        class="relative pl-9"
        v-for="value in transformedCoreValues"
        :key="value.title"
      >
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
