<script setup lang="ts">
import { Member } from '~/types/teamMembers'

const { members, socialIcons } = defineProps<{
  members: Member[]
  socialIcons?: Record<string, string>
}>()
</script>

<template>
  <section class="py-24 bg-gray-900 sm:py-32">
    <UContainer class="text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Meet the Architects of Success
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-400">
          Our dedicated team of professionals is committed to propelling your
          business to new heights through strategic networking and connections.
        </p>
      </div>
      <ul
        class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        role="list"
      >
        <li
          class="rounded-2xl bg-gray-800 px-8 py-10"
          v-for="member in members"
          :key="member.name"
        >
          <NuxtImg
            class="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 object-cover object-top"
            :src="member.imageUrl"
            alt="Team Member"
          />
          <h3
            class="mt-6 text-base font-semibold leading-7 tracking-tight text-white"
          >
            {{ member.name }}
          </h3>
          <p class="text-sm leading-6 text-gray-400">{{ member.role }}</p>
          <ul class="mt-6 flex justify-center gap-x-6" role="list">
            <li v-for="social in member.social" :key="social.platform">
              <NuxtLink
                v-if="socialIcons![social.platform]"
                :to="social.url"
                target="_blank"
              >
                <span class="sr-only">{{ social.platform }}</span>
                <Icon class="w-6 h-6" :name="socialIcons![social.platform]" />
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
