<script setup lang="ts">
import { h } from '#imports'
import { Icon } from '#components'

const NetworkIcon = h(Icon, { name: 'heroicons:users' })
const ReferralIcon = h(Icon, { name: 'heroicons:arrow-up-circle' })
const TrainingIcon = h(Icon, { name: 'heroicons:academic-cap' })

const features = [
  {
    name: 'Exclusive Networking',
    description:
      'Join a community of like-minded professionals to expand your business contacts and develop valuable relationships.',
    href: '/about',
    icon: NetworkIcon,
  },
  {
    name: 'Quality Referrals',
    description:
      'Receive high-quality, pre-qualified business referrals from trusted partners within the Elite Business Connections network.',
    href: '/about',
    icon: ReferralIcon,
  },
  {
    name: 'Professional Development',
    description:
      'Benefit from training sessions, webinars, and exclusive resources to enhance your business skills and industry knowledge.',
    href: '/about',
    icon: TrainingIcon,
  },
]
</script>

<template>
  <section class="py-24 bg-gray-900 sm:py-32">
    <UContainer>
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-primary">
          Your Business, Amplified
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Features Designed for Business Success
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Elite Business Connections provides a robust suite of features to help
          you grow, network, and succeed.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
        >
          <div
            class="flex flex-col"
            v-for="feature in features"
            :key="feature.name"
          >
            <dt
              class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white"
            >
              <component
                class="h-5 w-5 flex-none text-primary"
                :is="feature.icon"
                aria-hidden="true"
              />
              {{ feature.name }}
            </dt>
            <dd
              class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300"
            >
              <p class="flex-auto">{{ feature.description }}</p>
              <p class="mt-6">
                <NuxtLink
                  class="text-sm font-semibold leading-6 text-primary"
                  :to="feature.href"
                  >Learn more <span aria-hidden="true">→</span></NuxtLink
                >
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </UContainer>
  </section>
</template>
