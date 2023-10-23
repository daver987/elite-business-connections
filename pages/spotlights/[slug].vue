<script setup lang="ts">
import { convertToHtml } from '~/utils/convertToHtml'
import useUtilities from '~/utils/formatters'

definePageMeta({
  colorMode: 'dark',
})

const { formatDate } = useUtilities()

const route = useRoute()

const query = groq`*[_type == "spotlight"]{
  ...,
  body[]{
    ...,
    "postImage": asset->url,
    markDefs[]{
      ...,
    }
  },
    "authorName":author[]->name,
    "authorSlug":author[]->slug.current,
    "bio": author[]->bio[].children[].text,
    "featuredImage": mainImage.asset->url,
    "avatar": author[]->image.asset->url
}`

const { data: spotlight } = await useSanityQuery(query, {
  slug: route.params.slug,
})
const { featuredImage, excerpt, title, body, authorName, avatar, _updatedAt } =
  spotlight.value[0]
const convertedHtml = convertToHtml(body)
</script>

<template>
  <div>
    <HeaderSpotlight
      :excerpt="excerpt"
      :title="title"
      :featuredImage="featuredImage"
    />
    <section class="post">
      <div class="px-6 py-32 lg:px-8">
        <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <article
            class="prose prose-sm prose-img:rounded-xl dark:prose-invert max-w-none"
          >
            <div v-html="convertedHtml"></div>
          </article>
          <div
            class="mt-8 flex border-t-[0.5px] border-b-[0.5px] border-gray-200 pt-8"
          >
            <ul class="divide-y divide-white/5" role="list">
              <li class="py-4">
                <div class="flex items-center gap-x-3">
                  <NuxtImg
                    class="h-6 w-6 flex-none rounded-full object-cover bg-gray-800"
                    :src="avatar[0]"
                    alt="avatar"
                  />
                  <h3
                    class="flex-auto truncate text-sm font-semibold leading-6 text-white"
                  >
                    {{ authorName[0] }}
                  </h3>
                  <time
                    class="flex-none text-xs text-gray-500"
                    :datetime="_updatedAt"
                    >{{ formatDate(_updatedAt) }}
                  </time>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>