<template>
  <div class="p-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-document-text" class="mr-2 text-primary-500" />
            <h3 class="text-lg font-medium">Posts</h3>
          </div>
        </template>
        <div class="flex items-baseline justify-between">
          <div>
            <div class="text-3xl font-bold">{{ stats.posts.total }}</div>
            <div class="text-sm text-gray-500">
              {{ stats.posts.published }} published, {{ stats.posts.draft }} drafts
            </div>
          </div>
          <UButton
            to="/admin/posts"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            size="xs"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-photo" class="mr-2 text-primary-500" />
            <h3 class="text-lg font-medium">Media</h3>
          </div>
        </template>
        <div class="flex items-baseline justify-between">
          <div>
            <div class="text-3xl font-bold">{{ stats.media.total }}</div>
            <div class="text-sm text-gray-500">Total files</div>
          </div>
          <UButton
            to="/admin/media"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            size="xs"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-users" class="mr-2 text-primary-500" />
            <h3 class="text-lg font-medium">Members</h3>
          </div>
        </template>
        <div class="flex items-baseline justify-between">
          <div>
            <div class="text-3xl font-bold">{{ stats.members.total }}</div>
            <div class="text-sm text-gray-500">
              {{ stats.members.admin }} admins, {{ stats.members.regular }} regular
            </div>
          </div>
          <UButton
            to="/admin/members"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            size="xs"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-arrow-path" class="mr-2 text-primary-500" />
            <h3 class="text-lg font-medium">Referrals</h3>
          </div>
        </template>
        <div class="flex items-baseline justify-between">
          <div>
            <div class="text-3xl font-bold">{{ stats.referrals.total }}</div>
            <div class="text-sm text-gray-500">
              {{ stats.referrals.new }} new, {{ stats.referrals.closed }} closed
            </div>
          </div>
          <UButton
            to="/portal/referrals"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            size="xs"
          />
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <h2 class="mb-4 mt-8 text-xl font-medium">Quick Actions</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard class="flex flex-col items-center justify-center p-6 text-center">
        <UIcon
          name="i-heroicons-document-plus"
          class="mb-4 h-12 w-12 text-primary-500"
        />
        <h3 class="mb-2 text-lg font-medium">Create New Post</h3>
        <p class="mb-4 text-sm text-gray-600">
          Add a new blog post to your website
        </p>
        <UButton to="/admin/posts/new" color="primary">New Post</UButton>
      </UCard>

      <UCard class="flex flex-col items-center justify-center p-6 text-center">
        <UIcon
          name="i-heroicons-arrow-up-tray"
          class="mb-4 h-12 w-12 text-primary-500"
        />
        <h3 class="mb-2 text-lg font-medium">Upload Media</h3>
        <p class="mb-4 text-sm text-gray-600">
          Add images and files to your media library
        </p>
        <UButton to="/admin/media" color="primary">Upload</UButton>
      </UCard>

      <UCard class="flex flex-col items-center justify-center p-6 text-center">
        <UIcon
          name="i-heroicons-user-plus"
          class="mb-4 h-12 w-12 text-primary-500"
        />
        <h3 class="mb-2 text-lg font-medium">Add Member</h3>
        <p class="mb-4 text-sm text-gray-600">
          Add a new member to your organization
        </p>
        <UButton to="/admin/members" color="primary">Add Member</UButton>
      </UCard>

      <UCard class="flex flex-col items-center justify-center p-6 text-center">
        <UIcon
          name="i-heroicons-puzzle-piece"
          class="mb-4 h-12 w-12 text-primary-500"
        />
        <h3 class="mb-2 text-lg font-medium">Manage Portal</h3>
        <p class="mb-4 text-sm text-gray-600">
          Go to the portal to manage your business
        </p>
        <UButton to="/portal" color="primary">Go to Portal</UButton>
      </UCard>
    </div>

    <!-- Recent Posts -->
    <h2 class="mb-4 mt-8 text-xl font-medium">Recent Posts</h2>
    <UCard>
      <UTable
        :columns="[
          { key: 'title', label: 'Title' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Date' },
          { key: 'actions', label: 'Actions' },
        ]"
        :rows="recentPosts"
        :loading="loading"
      >
        <template #title-data="{ row }">
          <ULink :to="`/admin/posts/${row.id}`" class="font-medium text-primary-500">
            {{ row.title }}
          </ULink>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="row.published ? 'green' : 'yellow'"
            variant="subtle"
            size="sm"
          >
            {{ row.published ? 'Published' : 'Draft' }}
          </UBadge>
        </template>

        <template #createdAt-data="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-eye"
              :to="`/blog/${row.slug}`"
              target="_blank"
              :disabled="!row.published"
              title="View published post"
              size="xs"
            />
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              :to="`/admin/posts/${row.id}`"
              title="Edit post"
              size="xs"
            />
          </div>
        </template>
      </UTable>
      <template #footer>
        <div class="text-right">
          <UButton to="/admin/posts" color="gray" variant="ghost" size="sm">
            View all posts
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/Post'

definePageMeta({
  layout: 'admin',
})

// Mock statistics for development
const stats = reactive({
  posts: {
    total: 24,
    published: 18,
    draft: 6,
  },
  media: {
    total: 42,
  },
  members: {
    total: 15,
    admin: 2,
    regular: 13,
  },
  referrals: {
    total: 87,
    new: 12,
    closed: 65,
  },
})

// Recent posts
const recentPosts = ref<Post[]>([])
const loading = ref(true)

// Format date for display
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Fetch recent posts
const fetchRecentPosts = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/posts?limit=5&sort=createdAt:desc')
    
    // For now, using mock data until we have the actual API implementation
    if (!response || !Array.isArray(response.data)) {
      // Mock data for development
      const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
        id: `post-${i + 1}`,
        title: `Sample Blog Post ${i + 1}`,
        slug: `sample-blog-post-${i + 1}`,
        content: 'This is sample content.',
        excerpt: 'This is a sample excerpt.',
        published: i % 2 === 0,
        createdAt: new Date(Date.now() - (i * 86400000)),
        updatedAt: new Date(Date.now() - (i * 43200000)),
      }))
      
      recentPosts.value = mockPosts
    } else {
      recentPosts.value = response.data
    }
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    // Use mock data as fallback
    const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Sample Blog Post ${i + 1}`,
      slug: `sample-blog-post-${i + 1}`,
      content: 'This is sample content.',
      excerpt: 'This is a sample excerpt.',
      published: i % 2 === 0,
      createdAt: new Date(Date.now() - (i * 86400000)),
      updatedAt: new Date(Date.now() - (i * 43200000)),
    }))
    
    recentPosts.value = mockPosts
  } finally {
    loading.value = false
  }
}

// Fetch data on mount
onMounted(() => {
  fetchRecentPosts()
})
</script>
