<script lang="ts" setup>
const { data: linkArray } = await useFetch('/api/navigation')
const navigationLinks = linkArray.value?.navigation!
</script>

<template>
  <div>
    <Navbar :navLinks="navigationLinks" />
    <slot />
    <FooterMain />
  </div>
</template>
