<script setup lang="ts">
import type { Member } from '~/types/teamMembers'

definePageMeta({
  layout: 'default',
  path: '/',
  colorMode: 'dark',
})

const { data: teamMembers } = await useFetch('/api/team-members')

const members = teamMembers.value?.members!
const socialIcons = teamMembers.value?.socialIcons!
</script>

<template>
  <div>
    <HeroMain />
    <FeaturesWhyUs />
    <Stats is-boxed />
    <MembersThreeUp :members="members as Member[]" :socialIcons="socialIcons" />
    <ClientOnly>
      <Testimonial />
    </ClientOnly>
    <CtaElevate />
  </div>
</template>
