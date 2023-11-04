<script setup>
const navigation = {
  opportunities: [
    { name: 'Networking', href: '#' },
    { name: 'Business Growth', href: '#' },
    { name: 'Member Benefits', href: '#' },
    { name: 'Testimonials', href: '#' },
  ],
  resources: [
    { name: 'FAQs', href: '#' },
    { name: 'How To Join', href: '#' },
    { name: 'Spotlights', href: '/spotlights' },
    { name: 'Member Dashboard', href: '#' },
  ],
  about: [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '#' },
    { name: 'Events', href: '#' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],

  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/RocklandEliteBusinessConnections/',
      icon: 'line-md:facebook',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/elite_business_connections/',
      icon: 'line-md:instagram',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/EliteBizCon',
      icon: 'line-md:twitter-x',
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/company/70982919',
      icon: 'line-md:linkedin',
    },
  ],
}
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900" aria-labelledby="footer-heading">
    <h2 class="sr-only" id="footer-heading">Footer</h2>
    <UContainer class="pb-8 pt-20 sm:pt-24 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-semibold leading-6 text-white">
                Opportunities
              </h3>
              <ul class="mt-6 space-y-4" role="list">
                <li v-for="item in navigation.opportunities" :key="item.name">
                  <NuxtLink
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    :href="item.href"
                    >{{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-base font-semibold leading-6 text-white">
                About
              </h3>
              <ul class="mt-6 space-y-4" role="list">
                <li v-for="item in navigation.about" :key="item.name">
                  <NuxtLink
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    :to="item.href"
                    >{{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-base font-semibold leading-6 text-white">
                Resources
              </h3>
              <ul class="mt-6 space-y-4" role="list">
                <li v-for="item in navigation.resources" :key="item.name">
                  <NuxtLink
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    :to="item.href"
                    >{{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-base font-semibold leading-6 text-white">
                Legal
              </h3>
              <ul class="mt-6 space-y-4" role="list">
                <li v-for="item in navigation.legal" :key="item.name">
                  <NuxtLink
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    :to="item.href"
                    >{{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-10 xl:mt-0">
          <h3 class="text-base font-semibold leading-6 text-white">
            Subscribe to our newsletter
          </h3>
          <p class="mt-2 text-sm leading-6 text-gray-300">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <script setup lang="ts">
          import { ref, reactive } from '#imports'
          import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
          import { emailSchema } from '~/types/Email'

          const state = reactive({
            email_address: undefined,
          })

          async function submit(event: FormSubmitEvent<{ email: string }>) {
            // handle form submission
          }
          </script>

          <template>
            <UForm :schema="emailSchema" :state="state" @submit="submit">
              <UFormGroup label="Email address" name="email" required>
                <UInput
                  v-model="state.email_address"
                  placeholder="Enter your email"
                  size="lg"
                  type="email"
                />
              </UFormGroup>
              <UButton size="lg" block type="submit">Subscribe</UButton>
            </UForm>
          </template>
        </div>
      </div>
      <div
        class="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24"
      >
        <div class="flex space-x-6 md:order-2">
          <NuxtLink
            class="text-gray-500 hover:text-gray-400"
            v-for="item in navigation.social"
            :key="item.name"
            :to="item.href"
          >
            <span class="sr-only">{{ item.name }}</span>
            <Icon class="w-6 h-6" :name="item.icon" aria-hidden="true" />
          </NuxtLink>
        </div>
        <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          &copy; {{ currentYear }} Elite Business Connections All rights
          reserved.
        </p>
      </div>
    </UContainer>
  </footer>
</template>
