<script setup lang="ts">
import { useCms } from '~/composables/useCms'
import type { SpotlightItem } from '~/data/spotlightsData'

const props = defineProps<{
  spotlight: SpotlightItem
}>()

const { urlFor } = useCms()

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <UCard class="card" v-if="spotlight">
    <NuxtImg
      class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      v-if="spotlight.imageUrl"
      :src="spotlight.imageUrl"
      alt="Cover image"
    />

    <div class="card__cover--none" />

    <div class="card__container">
      <h3 class="card__title">
        <NuxtLink class="absolute inset-0" :to="`/spotlight/${spotlight.id}`">
          {{ spotlight.title }}
        </NuxtLink>
      </h3>
      <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-400t">
        {{ spotlight.excerpt }}
      </p>
      <time class="text-gray-500" :datetime="spotlight.datetime"
        >{{ formatDate(spotlight.datetime) }}
      </time>
    </div>
  </UCard>
</template>
