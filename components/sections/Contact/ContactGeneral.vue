<script setup lang="ts">
import { h } from '#imports'
import { Icon } from '#components'

const LifebuoyIcon = h(Icon, { name: 'heroicons:lifebuoy' })
const NewspaperIcon = h(Icon, { name: 'heroicons:newspaper' })
const PhoneIcon = h(Icon, { name: 'heroicons:phone' })

const cards = [
  {
    name: 'Membership Inquiries',
    description:
      'Interested in joining EBC? Let’s discuss membership benefits, fees, and the application process.',
    icon: PhoneIcon,
  },
  {
    name: 'Event Support',
    description:
      'Have questions about our events? Contact us for schedules, registration, and sponsorship opportunities.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Media Relations',
    description:
      'For press releases, interviews, and other media-related inquiries, get in touch with our communications team.',
    icon: NewspaperIcon,
  },
]
</script>

<template>
  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
    <NuxtImg
      class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      alt=""
    />
    <div
      class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Get in Touch with EBC
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Whether you have questions about membership, events, or sponsorship,
          our team is here to assist you.
        </p>
      </div>

      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
      >
        <div
          class="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
          v-for="card in cards"
          :key="card.name"
        >
          <component
            class="h-7 w-5 flex-none text-primary"
            :is="card.icon"
            aria-hidden="true"
          />
          <div class="text-base leading-7">
            <h3 class="font-semibold text-white">{{ card.name }}</h3>
            <p class="mt-2 text-gray-300">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
