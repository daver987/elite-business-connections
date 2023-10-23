<script setup lang="ts">
import type { Member } from '~/types/teamMembers'

definePageMeta({
  layout: 'default',
  path: '/',
  colorMode: 'dark',
})

const query = groq`*[_type == "testimonial"]{
  name,
  "avatar": avatar.asset->url,
  company,
    quote,
    role
}`

const { data: testimonialArray } = await useSanityQuery(query)
const { data: teamMembers } = await useFetch('/api/team-members')

const members = teamMembers.value?.members!
const socialIcons = teamMembers.value?.socialIcons!
const testimonials = testimonialArray.value
</script>

<template>
  <div>
    <HeroMain />
    <FeaturesWhyUs />
    <Stats is-boxed />
    <MembersThreeUp :members="members as Member[]" :socialIcons="socialIcons" />
    <ClientOnly>
      <Testimonial :testimonials="testimonials" />
    </ClientOnly>
    <CtaElevate />
  </div>
</template>
