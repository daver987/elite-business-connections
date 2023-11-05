<script lang="ts" setup>
import type { HeaderNavigation } from '~/types/Navigation'

const { data: navigationLinks } = useFetch<HeaderNavigation>(
  '/api/navigation?navType=header'
)
</script>

<template>
  <div>
    <Navbar :navLinks="navigationLinks as unknown as HeaderNavigation[]" />
    <slot />
    <FooterMain />
  </div>
</template>
