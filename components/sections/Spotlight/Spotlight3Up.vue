<script setup lang="ts">
import { ref } from 'vue'
import { useCms } from '~/composables/useCms'
import type { SpotlightItem } from '~/data/spotlightsData'

const { spotlight, urlFor } = useCms()
const spotlightData = ref<SpotlightItem[]>([])


spotlight.fetch().then((data) => {
  spotlightData.value = data
})
</script>

<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl capitalize">
          From the spotlights
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-300">
          Featuring the brightest minds and businesses in our network.
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <UCard
          class="flex flex-col items-start justify-between"
          v-for="spotlight in spotlightData"
          :ui="{
            header: {
              padding: 'px-0 py-0 sm:px-0',
            },
          }"
          :key="spotlight._id"
        >
          <template #header>
            <div class="relative w-full">
              <NuxtImg
                class="w-full bg-gray-100 object-cover"
                :src="urlFor(spotlight.imageUrl).width(800).height(450).url()"
                alt="Featured Image"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
              />
            </div>
          </template>
          <template #default>
            <div class="max-w-xl">
              <div class="mt-8 flex items-center gap-x-4 text-xs">
                <time class="text-gray-400" :datetime="spotlight.datetime">
                  {{ new Date(spotlight.datetime).toLocaleDateString() }}
                </time>
              </div>
              <div class="group relative">
                <h3
                  class="mt-3 text-lg font-semibold leading-6 text-gray-200 group-hover:text-gray-300"
                >
                  <NuxtLink :href="`/spotlights/${spotlight.id}`">
                    <span class="absolute inset-0" />
                    {{ spotlight.title }}
                  </NuxtLink>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                  {{ spotlight.excerpt }}
                </p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4">
                <NuxtImg
                  class="h-10 w-10 rounded-full bg-gray-100"
                  :src="
                    urlFor(spotlight.author.avatar).width(50).height(50).url()
                  "
                  alt=""
                />
                <div class="text-sm leading-6">
                  <p class="font-semibold text-gray-400">
                    <NuxtLink :to="spotlight.author.uri">
                      <span class="absolute inset-0" />
                      {{ spotlight.author.fullName }}
                    </NuxtLink>
                  </p>
                  <p class="text-gray-400">
                    {{ spotlight.author.companyRole }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
~/types/Spotlight
