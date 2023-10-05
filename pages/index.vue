<script setup lang="ts">
import { Member } from '~/types/teamMembers'

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
const statQuery = groq`*[ _type == "stats"]{
  position,
    duration,
    symbol,
    end,
    title,
    start
}`
const { data: testimonialArray } = await useSanityQuery(query)
const { data: statArray } = await useSanityQuery(statQuery)
const { data: teamMembers } = await useFetch('/api/team-members')
console.log(testimonialArray.value)

const stats = statArray.value
const members = teamMembers.value?.members!
const socialIcons = teamMembers.value?.socialIcons!
const testimonials = testimonialArray.value
</script>

<template>
  <div>
    <HeroMain />
    <FeaturesWhyUs />
    <Stats :stats="stats" is-boxed />
    <MembersThreeUp :members="members as Member[]" :socialIcons="socialIcons" />
    <ClientOnly>
      <Testimonial :testimonials="testimonials" />
    </ClientOnly>
    <CtaElevate />
  </div>
</template>
