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
    <LazyFeaturesWhyUs />
    <LazyStats is-boxed />
    <LazyMembersThreeUp />
    <ClientOnly>
      <LazyTestimonial />
    </ClientOnly>
    <LazyCtaElevate />
  </div>
</template>
