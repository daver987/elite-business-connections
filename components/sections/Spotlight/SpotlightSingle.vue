<script setup lang="ts">
interface Category {
  title: string
  uri: string
}

interface Author {
  fullName: string
  uri: string
  companyRole: string
  avatar: string
}

interface ContentSection {
  heading: string
  paragraphs: string[]
}

interface Content {
  intro: string
  sectionOne: ContentSection
  sectionTwo: ContentSection
  sectionThree: ContentSection
  sectionFour: ContentSection
  conclusion: string
}

interface Spotlight {
  id: number
  datetime: string
  category: Category
  author: Author
  title: string
  imageUrl: string
  imageDescription: string
  excerpt: string
  content: Content
}

const spotlight = defineProps<Spotlight>()
</script>

<template>
  <section class="bg-gray-900 py-32">
    <UContainer>
      <div
        class="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row"
      >
        <div class="w-full lg:max-w-lg lg:flex-auto">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {{ spotlight.title }}
          </h2>
          <p class="mt-6 text-xl leading-8 text-gray-600">
            {{ spotlight.content.intro }}
          </p>
          <NuxtImg
            class="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
            :src="spotlight.imageUrl"
            :alt="spotlight.imageDescription"
          />
        </div>
        <div class="w-full lg:max-w-xl lg:flex-auto">
          <h3 class="text-xl font-semibold">
            {{ spotlight.content.sectionOne.heading }}
          </h3>
          <ul class="-my-8 divide-y divide-gray-100">
            <li
              class="py-8"
              v-for="(paragraph, index) in spotlight.content.sectionOne
                .paragraphs"
              :key="index"
            >
              <p class="text-base leading-7 text-gray-600">{{ paragraph }}</p>
            </li>
          </ul>
          <div class="mt-8 flex border-t border-gray-100 pt-8">
            <a
              class="text-sm font-semibold leading-6 text-primary hover:text-primary/90"
              :href="spotlight.author.uri"
            >
              Written by {{ spotlight.author.fullName }} -
              {{ spotlight.author.companyRole }}
              <img
                class="h-6 w-6 flex-none rounded-full bg-gray-50"
                :src="spotlight.author.avatar"
                alt=""
              />
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
