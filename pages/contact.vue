<script setup lang="ts">
definePageMeta({
  layout: 'default',
  path: '/contact',
  colorMode: 'dark',
})

useSeoMeta({
  title: 'Contact Elite Business Connections - Get in Touch',
  description: 'Contact Elite Business Connections to learn more about business networking opportunities and how you can join our community.',
  ogTitle: 'Contact Elite Business Connections - Get in Touch',
  ogDescription: 'Contact Elite Business Connections to learn more about business networking opportunities and how you can join our community.',
  ogImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  ogUrl: 'https://elitebusinessconnections.ca/contact/',
  twitterTitle: 'Contact Elite Business Connections - Get in Touch',
  twitterDescription: 'Contact Elite Business Connections to learn more about business networking opportunities and how you can join our community.',
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
  <div>
    <ContactHeader />
    <ContactForm />
  </div>
</template>
