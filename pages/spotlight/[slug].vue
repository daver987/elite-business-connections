<script setup lang='ts'>
definePageMeta({
  colorMode: 'dark',
})

const route = useRoute()

const query = groq`*[ _type == "spotlight" && slug.current == $slug][0]`

const { data: spotlight } = await useSanityQuery(query, {
  slug: route.params.slug,
})
</script>

<template>
  <div>
    <HeaderSpotlight />
    <section class='post'>
      <div class='px-6 py-32 lg:px-8'>
        <div class='mx-auto max-w-3xl text-base leading-7 text-gray-700'>
          <article class='prose md:prose-lg lg:prose-xl dark:prose-invert'>
            <SanityContent :blocks='spotlight.body' />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
