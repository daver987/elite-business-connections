<script setup lang="ts">
import type { HeaderNavigation } from '~/types/Navigation'

const { data: navigationLinks } = await useFetch<HeaderNavigation[]>(
  '/api/navigation?navType=header'
)
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <Navbar :navLinks="navigationLinks" />
  </header>
</template>
