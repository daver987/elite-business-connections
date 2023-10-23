<script setup lang="ts">
definePageMeta({
  layout: 'default',
  path: '/about',
  colorMode: 'dark',
})
useSeoMeta({
  title: 'About Elite Business Connections - Building Business Together',
  description: 'Elite Business Connections is your partner in growth, networking, and success. We offer a platform for entrepreneurs, freelancers, and business leaders to connect, share insights, and succeed together.',
  ogTitle: 'About Elite Business Connections - Building Business Together',
  ogDescription: 'Elite Business Connections is your partner in growth, networking, and success. We offer a platform for entrepreneurs, freelancers, and business leaders to connect, share insights, and succeed together.',
  ogImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  ogUrl: 'https://elitebusinessconnections.ca/about/',
  twitterTitle: 'About Elite Business Connections - Building Business Together',
  twitterDescription: 'Elite Business Connections is your partner in growth, networking, and success. We offer a platform for entrepreneurs, freelancers, and business leaders to connect, share insights, and succeed together.',
  twitterImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

<template>
  <div class="bg-gray-900">
    <div class="relative isolate">
      <!-- Background -->
      <div
        class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style="
            clip-path: polygon(
              73.6% 51.7%,
              91.7% 11.8%,
              100% 46.4%,
              97.4% 82.2%,
              92.5% 84.9%,
              75.7% 64%,
              55.3% 47.5%,
              46.5% 49.4%,
              45% 62.9%,
              50.3% 87.2%,
              21.3% 64.1%,
              0.1% 100%,
              5.4% 51.1%,
              21.4% 63.9%,
              58.9% 0.2%,
              73.6% 51.7%
            );
          "
        />
      </div>

      <!-- Header section -->
      <div class="px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Building Business Together
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            Elite Business Connections is your partner in growth, networking,
            and success. Together, we create opportunities that last.
          </p>
        </div>
      </div>

      <!-- Content section -->
      <UContainer class="mt-20">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div
            class="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2"
          >
            <div>
              <p>
                At Elite Business Connections, we believe in the power of
                networking and collaborative growth. We offer a platform where
                entrepreneurs, freelancers, and business leaders can connect and
                share valuable insights.
              </p>
              <p class="mt-8">
                Our members benefit from weekly meetings, structured networking
                events, and the chance to learn from guest speakers from various
                industries.
              </p>
            </div>
            <div>
              <p>
                Why join us? Because we offer more than just networking
                opportunities. We offer a community that is committed to helping
                each other succeed.
              </p>
              <p class="mt-8">
                From generating referrals to gaining business advice, our
                members share a commitment to each other’s growth and success.
              </p>
            </div>
          </div>
        </div>
      </UContainer>

      <LazyStats />

      <!-- Image section -->
      <UContainer class="mt-28 sm:mt-32">
        <NuxtImg
          class="aspect-[9/4] w-full object-cover xl:rounded-3xl"
          src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"
          alt="EBC Meeting"
        />
      </UContainer>

      <LazyCoreValues />

      <LazyMembersThreeUp />

      <LazyCtaElevate />
    </div>
  </div>
</template>
