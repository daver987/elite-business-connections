<script setup lang="ts">
import { h } from '#imports'
import { Icon } from '#components'

const HandshakeIcon = h(Icon, { name: 'ph:handshake' })
const ChartBarIcon = h(Icon, { name: 'heroicons:chart-bar' })
const UsersIcon = h(Icon, { name: 'heroicons:users' })
const CheckBadgeIcon = h(Icon, { name: 'heroicons:check-badge' })
const GlobeAltIcon = h(Icon, { name: 'heroicons:globe-alt' })
const CalendarDaysIcon = h(Icon, { name: 'heroicons:calendar-days' })

const features = [
  {
    name: 'Strong Network.',
    description: 'Connect with industry leaders and like-minded entrepreneurs.',
    icon: HandshakeIcon,
  },
  {
    name: 'Business Growth.',
    description:
      'Access to resources and partnerships that help scale your business.',
    icon: ChartBarIcon,
  },
  {
    name: 'Community Support.',
    description:
      'A supportive community committed to collective growth and success.',
    icon: UsersIcon,
  },
  {
    name: 'Credibility.',
    description:
      'Elevate your business reputation through trusted partnerships.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Global Opportunities.',
    description:
      'Expand your business horizons with our international network.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Exclusive Events.',
    description: 'Invitations to workshops, webinars, and networking events.',
    icon: CalendarDaysIcon,
  },
]
</script>

<template>
  <section class="py-24 bg-gray-900 sm:py-32">
    <UContainer>
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-base font-semibold leading-7 text-primary">
          Why Choose Us
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Your Network, Your Success
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          At Elite Business Connections, we bring businesses together, fostering
          a community where sharing and collaboration lead to success.
        </p>
      </div>
      <dl
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16"
      >
        <div
          class="relative pl-9"
          v-for="feature in features"
          :key="feature.name"
        >
          <dt class="inline font-semibold text-white">
            <component
              class="absolute left-1 top-1 h-5 w-5 text-primary"
              :is="feature.icon"
              aria-hidden="true"
            />
            {{ feature.name }}
          </dt>
          {{ ' ' }}
          <dd class="inline">{{ feature.description }}</dd>
        </div>
      </dl>
    </UContainer>
  </section>
</template>
