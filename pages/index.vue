<script setup lang="ts">
definePageMeta({
  layout: 'default',
  path: '/',
  colorMode: 'dark',
})
</script>

<template>
  <div>
    <HeroMain />
    <FeaturesWhyUs />
    <Stats is-boxed />
    <MembersThreeUp />
    <ClientOnly>
      <Testimonial />
    </ClientOnly>
    <CtaElevate />
  </div>
</template>
