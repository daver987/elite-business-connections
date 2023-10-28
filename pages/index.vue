<script setup lang="ts">
definePageMeta({
  layout: 'default',
  path: '/',
  colorMode: 'dark',
})

useSeoMeta({
  title: 'Elite Business Connections - Elevate Your Business',
  description:
    'Elite Business Connections offers opportunities for business networking and growth. Connect with business owners, entrepreneurs, and professionals.',
  ogTitle: 'Elite Business Connections - Elevate Your Business',
  ogDescription:
    'Elite Business Connections offers opportunities for business networking and growth. Connect with business owners, entrepreneurs, and professionals.',
  ogImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  ogUrl: 'https://elitebusinessconnections.ca/',
  twitterTitle: 'Elite Business Connections - Elevate Your Business',
  twitterDescription:
    'Elite Business Connections offers opportunities for business networking and growth. Connect with business owners, entrepreneurs, and professionals.',
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
    <HeroMain />
    <LazyFeaturesWhyUs />
    <LazyStats is-boxed />
    <LazyMembersThreeUp />
    <ClientOnly>
      <LazyTestimonial />
    </ClientOnly>
    <LazyCtaElevate />
  </div>
</template>
