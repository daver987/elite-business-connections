<script setup lang="ts">
const { data: linkArray } = await useFetch('/api/navigation')
const navigationLinks = linkArray.value?.navigation!
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <Navbar :navLinks="navigationLinks" />
  </header>
</template>
