<script setup>
import useUtilities from '~/utils/formatters'

const featuredSpotlightArray = getRandomElements(spotlightsData, 1)
const featuredSpotlight = featuredSpotlightArray[0]
const spotlights = getRandomElements(spotlightsData, 2)
const { formatDate } = useUtilities()
</script>

<template>
  <section class="bg-gray-900 py-24 sm:py-32">
    <UContainer
      class="grid grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:grid-cols-2"
    >
      <div class="max-w-2xl lg:max-w-4xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Featured Spotlight
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-300">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
    </UContainer>
    <div
      class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 mt-12 px-6 sm:gap-y-16 lg:grid-cols-12 lg:px-8"
    >
      <article
        class="relative isolate flex flex-col gap-8 lg:flex-row lg:col-span-8"
      >
        <div
          class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[1/1] lg:w-96 lg:shrink-0"
        >
          <NuxtImg
            class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover object-center"
            :src="featuredSpotlight.imageUrl"
            alt="Spotlight Image"
          />
          <div
            class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-100/90"
          />
        </div>
        <div>
          <div class="flex items-center gap-x-4 text-xs">
            <time class="text-gray-400" :datetime="featuredSpotlight.datetime"
              >{{ formatDate(featuredSpotlight.datetime) }}
            </time>
            <Link
              class="relative z-10 rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
              :href="featuredSpotlight.category.uri"
            >
              {{ featuredSpotlight.category.title }}
            </Link>
          </div>
          <div class="group relative max-w-xl">
            <h3
              class="mt-3 text-lg font-semibold leading-6 text-gray-100 group-hover:text-gray-300"
            >
              <Link :to="featuredSpotlight.category.uri">
                <span class="absolute inset-0" />
                {{ featuredSpotlight.title }}
              </Link>
            </h3>
            <p class="mt-5 text-sm leading-6 text-gray-300">
              {{ featuredSpotlight.excerpt }}
            </p>
          </div>
          <div class="mt-6 flex border-t border-gray-100/10 pt-6">
            <div class="relative flex items-center gap-x-4">
              <NuxtImg
                class="h-10 w-10 rounded-full bg-gray-900"
                :src="featuredSpotlight.author.avatar"
                alt="Author"
              />
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-100">
                  <Link :to="featuredSpotlight.author.uri">
                    <span class="absolute inset-0" />
                    {{ featuredSpotlight.author.fullName }}
                  </Link>
                </p>
                <p class="text-gray-300">
                  {{ featuredSpotlight.author.companyRole }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div
        class="mx-auto w-full max-w-2xl border-t border-gray-100/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0 lg:col-span-4"
      >
        <div class="-my-12 divide-y divide-gray-100/10">
          <article
            class="py-12"
            v-for="spotlight in spotlights"
            :key="spotlight.id"
          >
            <div class="group relative max-w-xl">
              <time
                class="block text-sm leading-6 text-gray-300"
                :datetime="spotlight.datetime"
                >{{ formatDate(spotlight.datetime) }}
              </time>
              <h2
                class="mt-2 text-lg font-semibold text-gray-100 group-hover:text-gray-300"
              >
                <Link :to="spotlight.category.uri">
                  <span class="absolute inset-0" />
                  {{ spotlight.title }}
                </Link>
              </h2>
              <p class="mt-4 text-sm leading-6 text-gray-300">
                {{ spotlight.excerpt }}
              </p>
            </div>
            <div class="mt-4 flex">
              <Link
                class="relative flex gap-x-2.5 text-sm font-semibold leading-6 text-gray-100"
                :to="spotlight.author.uri"
              >
                <NuxtImg
                  class="h-6 w-6 flex-none rounded-full bg-gray-900"
                  :src="spotlight.author.avatar"
                  alt="author image"
                />
                {{ spotlight.author.fullName }}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
