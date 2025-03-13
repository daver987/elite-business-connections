<script setup lang="ts">
definePageMeta({
  layout: 'default',
  path: '/contact',
  colorMode: 'dark',
})

useSeoMeta({
  title: 'Contact Elite Business Connections - Get in Touch',
  description:
    'Contact Elite Business Connections to learn more about business networking opportunities and how you can join our community.',
  ogTitle: 'Contact Elite Business Connections - Get in Touch',
  ogDescription:
    'Contact Elite Business Connections to learn more about business networking opportunities and how you can join our community.',
  ogImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  ogUrl: 'https://elitebusinessconnections.ca/contact/',
  twitterTitle: 'Contact Elite Business Connections - Get in Touch',
  twitterDescription:
    'Contact Elite Business Connections to learn more about business networking opportunities and how you can join our community.',
  twitterImage:
    'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div>
    <ContactHeader />
    <div class="relative isolate bg-gray-900">
      <UContainer class="mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div class="relative pb-20 pt-24 sm:pt-32 lg:static lg:py-48">
          <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div
              class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2"
            >
              <svg
                class="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width="200"
                    height="200"
                    x="100%"
                    y="-1"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg class="overflow-visible fill-gray-800/20" x="100%" y="-1">
                  <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  stroke-width="0"
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                />
              </svg>
              <div
                class="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                aria-hidden="true"
              >
                <div
                  class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#f87171] to-[#b91c1c] opacity-20"
                  style="
                    clip-path: polygon(
                      74.1% 56.1%,
                      100% 38.6%,
                      97.5% 73.3%,
                      85.5% 100%,
                      80.7% 98.2%,
                      72.5% 67.7%,
                      60.2% 37.8%,
                      52.4% 32.2%,
                      47.5% 41.9%,
                      45.2% 65.8%,
                      27.5% 23.5%,
                      0.1% 35.4%,
                      17.9% 0.1%,
                      27.6% 23.5%,
                      76.1% 2.6%,
                      74.1% 56.1%
                    );
                  "
                />
              </div>
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-white">
              Connect With Elite Business Connections
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              At Elite Business Connections, we're more than just a networking
              platform. We are committed to fostering genuine relationships that
              help accelerate your business growth. Contact us today to discover
              the power of collective intelligence and targeted referrals. Let's
              elevate your business to new heights, together.
            </p>

            <dl class="mt-10 space-y-4 text-base leading-7 text-gray-300">
              <div class="flex gap-x-4">
                <dt class="flex-none">
                  <span class="sr-only">Address</span>
                  <Icon
                    class="h-7 w-6 text-primary-400"
                    name="heroicons:building-office-2"
                    aria-hidden="true"
                  />
                </dt>
                <dd>Rockland, ON</dd>
              </div>
              <div class="flex gap-x-4">
                <dt class="flex-none">
                  <span class="sr-only">Telephone</span>
                  <Icon
                    class="h-7 w-6 text-primary-400"
                    name="heroicons:phone"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <NuxtLink
                    class="hover:text-white text-sm"
                    to="tel:+16134541828"
                    >+1 (613) 454-1828
                  </NuxtLink>
                </dd>
              </div>
              <div class="flex gap-x-4">
                <dt class="flex-none">
                  <span class="sr-only">Email</span>
                  <Icon
                    class="h-7 w-6 text-primary-400"
                    name="heroicons:envelope"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <NuxtLink
                    class="text-sm hover:text-white"
                    to="mailto:info@elitebusinessconnections.com"
                  >
                    info@elitebusinessconnections.ca
                  </NuxtLink>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="lg:ml-8 flex flex-col justify-center items-center mt-8">
          <ContactForm />
        </div>
      </UContainer>
    </div>
  </div>
</template>
