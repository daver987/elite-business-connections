<script setup lang="ts">
const members = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl: '/images/member-one-enhanced.jpeg',
    location: 'Toronto, Canada',
  },
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl: '/images/member-three-enhanced.jpeg',
    location: 'Toronto, Canada',
  },
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl: '/images/member-two-enhanced.jpeg',
    location: 'Toronto, Canada',
  },
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl: '/images/member-two-enhanced.jpeg',
    location: 'Toronto, Canada',
  },
]
</script>

<template>
  <div class="bg-gray-950 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Meet the Architects of Success
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Our dedicated team of professionals is committed to propelling your
          business to new heights through strategic networking and connections.
        </p>
      </div>
      <ul
        class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        role="list"
      >
        <li v-for="member in members" :key="member.name">
          <NuxtImg
            class="aspect-[14/13] w-full rounded-2xl object-cover object-center"
            :src="member.imageUrl"
            alt="Team Member"
          />
          <h3
            class="mt-6 text-lg font-semibold leading-8 tracking-tight text-white"
          >
            {{ member.name }}
          </h3>
          <p class="text-base leading-7 text-gray-300">
            {{ member.role }}
          </p>
          <p class="text-sm leading-6 text-gray-500">
            {{ member.location }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
