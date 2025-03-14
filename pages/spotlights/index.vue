<script setup lang="ts">
import useUtilities from '~/utils/formatters'
import type { Post } from '~/types/Post'

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})

useSeoMeta({
  title: 'Member Spotlights - Elite Business Connections',
  description:
    'Read spotlight articles about our community members. Learn about their businesses, achievements, and contributions to the network.',
  ogTitle: 'Member Spotlights - Elite Business Connections',
  ogDescription:
    'Read spotlight articles about our community members. Learn about their businesses, achievements, and contributions to the network.',
  ogImage: 'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  ogUrl: 'https://elitebusinessconnections.ca/spotlights/',
  twitterTitle: 'Member Spotlights - Elite Business Connections',
  twitterDescription:
    'Read spotlight articles about our community members. Learn about their businesses, achievements, and contributions to the network.',
  twitterImage:
    'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
  twitterCard: 'summary',
})

const { formatDate } = useUtilities()
const loading = ref(true)
const posts = ref<Post[]>([])
const error = ref<string | null>(null)

// Define API response type
type ApiResponse = {
  statusCode: number
  message?: string
  error?: string
  data?: Post[]
  total?: number
  page?: number
  limit?: number
  totalPages?: number
}

// Fetch all published posts
const fetchPosts = async () => {
  loading.value = true
  error.value = null

  try {
    // Fetch published posts from the API
    const response = await $fetch<ApiResponse>('/api/posts?status=published')

    if (response.statusCode === 200 && response.data) {
      posts.value = response.data
    } else {
      error.value = response.error || 'No posts found'
    }
  } catch (err) {
    console.error('Error fetching posts:', err)
    error.value = 'Failed to load posts'

    // Use mock data for development
    posts.value = Array.from({ length: 6 }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Sample Blog Post ${i + 1}`,
      slug: `sample-blog-post-${i + 1}`,
      content: '<p>This is sample content.</p>',
      excerpt: `This is a sample excerpt for blog post ${i + 1}. Click to read more about our member spotlight.`,
      featuredImage: `https://picsum.photos/seed/${i + 1}/800/600`,
      published: true,
      createdAt: new Date(Date.now() - i * 86400000),
      updatedAt: new Date(Date.now() - i * 43200000),
    }))
  } finally {
    loading.value = false
  }
}

// Fetch posts when component mounts
onMounted(() => {
  fetchPosts()
})

// Truncate text for excerpts
const truncate = (text: string, length = 160) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Get excerpt from post
const getExcerpt = (post: Post) => {
  if (post.excerpt) return post.excerpt

  // Strip HTML from content and truncate
  const div = document.createElement('div')
  div.innerHTML = post.content
  return truncate(div.textContent || '')
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-900/90"></div>
      </div>
      <div class="relative mx-auto max-w-2xl text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Member Spotlights
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Read spotlight articles about our community members. Learn about their
          businesses, achievements, and contributions to the network.
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <div class="flex items-center justify-center h-[40vh]" v-if="loading">
      <UIcon class="animate-spin h-8 w-8" name="i-heroicons-arrow-path" />
      <span class="ml-2 text-lg">Loading posts...</span>
    </div>

    <!-- Error State -->
    <div
      class="flex flex-col items-center justify-center h-[40vh]"
      v-else-if="error"
    >
      <UIcon
        class="h-16 w-16 text-red-500 mb-4"
        name="i-heroicons-exclamation-circle"
      />
      <h2 class="text-xl font-semibold mb-2">{{ error }}</h2>
      <p class="text-gray-400 mb-6">
        No posts found. Check back later for updates.
      </p>
    </div>

    <!-- Posts Grid -->
    <section class="py-16 sm:py-24" v-else>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
            Latest Posts
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-400">
            Discover insights and stories from our community members.
          </p>
        </div>

        <div
          class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <article
            class="flex flex-col items-start"
            v-for="post in posts"
            :key="post.id"
          >
            <div class="relative w-full">
              <img
                class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                :src="
                  post.featuredImage ||
                  'https://placehold.co/800x600/333/white?text=EBC'
                "
                :alt="post.title"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
              ></div>
            </div>
            <div class="max-w-xl">
              <div class="mt-8 flex items-center gap-x-4 text-xs">
                <time
                  class="text-gray-500"
                  :datetime="post.createdAt.toString()"
                >
                  {{ formatDate(post.createdAt) }}
                </time>
              </div>
              <div class="group relative">
                <h3
                  class="mt-3 text-lg font-semibold leading-6 group-hover:text-primary-500"
                >
                  <NuxtLink :to="`/spotlights/${post.slug}`">
                    <span class="absolute inset-0"></span>
                    {{ post.title }}
                  </NuxtLink>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                  {{ getExcerpt(post) }}
                </p>
              </div>
              <div class="mt-4">
                <NuxtLink
                  class="text-sm font-semibold leading-6 text-primary-500"
                  :to="`/spotlights/${post.slug}`"
                >
                  Read more <span aria-hidden="true">→</span>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
