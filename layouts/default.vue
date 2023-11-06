<script lang='ts' setup>
import type { HeaderNavigation } from '~/types/Navigation'

const { data: navigationLinks } = await useFetch<HeaderNavigation[]>(
  '/api/navigation?navType=header',
  {
    transform: (data: HeaderNavigation[]) => {
      if(data.length) {
        return data
      }
    }
  }
)
</script>

<template>
  <div>
    <Navbar :navLinks='navigationLinks' />
    <slot />
    <FooterMain />
  </div>
</template>
