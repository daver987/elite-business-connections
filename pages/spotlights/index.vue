<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  path: '/spotlights',
  colorMode: 'dark',
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
useSeoMeta({
  title: 'Member Spotlights - Elite Business Connections',
  description: 'Read spotlight articles about our community members. Learn about their businesses, achievements, and contributions to the network.',
  ogTitle: 'Member Spotlights - Elite Business Connections',
  ogDescription: 'Read spotlight articles about our community members. Learn about their businesses, achievements, and contributions to the network.',
  ogImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  ogUrl: 'https://elitebusinessconnections.ca/spotlights/',
  twitterTitle: 'Member Spotlights - Elite Business Connections',
  twitterDescription: 'Read spotlight articles about our community members. Learn about their businesses, achievements, and contributions to the network.',
  twitterImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  twitterCard: 'summary'
})

</script>

<template>
  <div>
    <UContainer>
      <Spotlight3Up />
    </UContainer>
  </div>
</template>
