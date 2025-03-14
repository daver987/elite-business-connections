<script setup lang="ts">
import useUtilities from '~/utils/formatters'
import { Content } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import type { Post } from '~/types/Post'

definePageMeta({
  colorMode: 'dark',
})

const route = useRoute()
const slug = route.params.slug as string

const { formatDate } = useUtilities()
const loading = ref(true)
const post = ref<Post | null>(null)
const error = ref<string | null>(null)

// TipTap viewer for rendering content
const editor = ref(null)

// Define API response type
type ApiResponse = {
  statusCode: number
  message?: string
  error?: string
  data?: Post
}

// Fetch post data
const fetchPost = async () => {
  loading.value = true
  error.value = null

  try {
    // Try to fetch post by slug from the database
    const response = await $fetch<ApiResponse>(`/api/posts/slug/${slug}`)

    if (response.statusCode === 200 && response.data) {
      post.value = response.data

      // Set meta tags
      useSeoMeta({
        title: `${post.value.title} - Elite Business Connections`,
        description:
          post.value.excerpt ||
          'Read this spotlight article from Elite Business Connections',
        ogTitle: `${post.value.title} - Elite Business Connections`,
        ogDescription:
          post.value.excerpt ||
          'Read this spotlight article from Elite Business Connections',
        ogImage:
          post.value.featuredImage ||
          'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
        ogUrl: `https://elitebusinessconnections.ca/spotlights/${post.value.slug}`,
        twitterTitle: `${post.value.title} - Elite Business Connections`,
        twitterDescription:
          post.value.excerpt ||
          'Read this spotlight article from Elite Business Connections',
        twitterImage:
          post.value.featuredImage ||
          'https://elitebusinessconnections.ca//images/ebc_logo_light.png',
        twitterCard: 'summary_large_image',
      })

      // Initialize the TipTap editor in read-only mode
      initEditor()
    } else {
      error.value = response.error || 'Post not found'
    }
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = 'Failed to load post'

    // Use mock data for development
    post.value = {
      id: 'mock-post',
      title: 'Sample Blog Post',
      slug,
      content:
        '<h2>This is a sample heading</h2><p>This is some sample content.</p><p>This post showcases the TipTap content rendering.</p><p>This is a longer paragraph with more text to show how the content flows in the article layout. Elite Business Connections is a professional networking group focused on building relationships and growing businesses through quality referrals.</p><img src="https://picsum.photos/seed/1/800/400" alt="Sample Image" /><h3>Another Heading</h3><p>More content follows here with <a href="https://elitebusinessconnections.ca">a link</a> to demonstrate how links are styled.</p><ul><li>List item one</li><li>List item two</li><li>List item three</li></ul>',
      excerpt: 'This is a sample excerpt for the blog post.',
      featuredImage: 'https://picsum.photos/seed/1/800/400',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Initialize the TipTap editor in read-only mode
    initEditor()
  } finally {
    loading.value = false
  }
}

// Initialize the TipTap editor for viewing content
const initEditor = () => {
  if (post.value) {
    editor.value = useEditor({
      content: post.value.content,
      extensions: [
        StarterKit,
        Image,
        Link.configure({
          HTMLAttributes: {
            class: 'text-primary-500 hover:text-primary-700 underline',
            target: '_blank',
          },
        }),
      ],
      editable: false,
    })
  }
}

// Cleanup editor on component unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// Fetch post when component mounts
onMounted(() => {
  fetchPost()
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
</script>

<template>
  <div>
    <!-- Loading State -->
    <div class="flex items-center justify-center h-[60vh]" v-if="loading">
      <UIcon class="animate-spin h-8 w-8" name="i-heroicons-arrow-path" />
      <span class="ml-2 text-lg">Loading post...</span>
    </div>

    <!-- Error State -->
    <div
      class="flex flex-col items-center justify-center h-[60vh]"
      v-else-if="error"
    >
      <UIcon
        class="h-16 w-16 text-red-500 mb-4"
        name="i-heroicons-exclamation-circle"
      />
      <h2 class="text-xl font-semibold mb-2">{{ error }}</h2>
      <p class="text-gray-400 mb-6">
        We couldn't find the post you're looking for.
      </p>
      <UButton to="/spotlights" color="primary"> Return to Spotlights </UButton>
    </div>

    <!-- Post Content -->
    <template v-else-if="post">
      <!-- Post Header -->
      <section class="relative overflow-hidden bg-gray-900">
        <div class="absolute inset-0 opacity-30" v-if="post.featuredImage">
          <img
            class="h-full w-full object-cover"
            :src="post.featuredImage"
            :alt="post.title"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"
          ></div>
        </div>

        <div class="relative px-6 py-32 sm:px-12 lg:px-16">
          <div class="mx-auto max-w-3xl text-center">
            <h1
              class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {{ post.title }}
            </h1>
            <p class="mt-4 text-lg leading-8 text-gray-300" v-if="post.excerpt">
              {{ post.excerpt }}
            </p>
            <div class="mt-6 flex items-center justify-center gap-x-6">
              <div class="text-sm leading-6 text-gray-300">
                <time :datetime="post.createdAt.toString()">
                  {{ formatDate(post.createdAt) }}
                </time>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Post Content -->
      <section class="post">
        <div class="px-6 py-16 lg:px-8">
          <div
            class="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300"
          >
            <ClientOnly>
              <div class="post-content" v-if="editor">
                <TiptapEditor
                  class="prose prose-lg prose-img:rounded-xl dark:prose-invert max-w-none"
                  :editor="editor"
                />
              </div>
              <div class="flex items-center justify-center h-[300px]" v-else>
                <UIcon
                  class="animate-spin h-6 w-6"
                  name="i-heroicons-arrow-path"
                />
                <span class="ml-2">Loading content...</span>
              </div>
            </ClientOnly>

            <!-- Post Footer -->
            <div class="mt-16 flex border-t border-gray-700 pt-8">
              <div class="w-full">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-400">
                    Published on {{ formatDate(post.createdAt) }}
                  </div>

                  <UButton
                    to="/spotlights"
                    variant="ghost"
                    color="gray"
                    icon="i-heroicons-arrow-left"
                  >
                    Back to Spotlights
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style>
.post-content .ProseMirror {
  outline: none;
}
</style>
