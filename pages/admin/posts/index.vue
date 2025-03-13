<script setup lang="ts">
import type { Post } from '~/types/Post'
import { useDebounce } from '@vueuse/core'

definePageMeta({
  layout: 'admin',
})

// Table columns
const columns = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'createdAt',
    label: 'Created At',
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
  },
]

// State
const posts = ref<Post[]>([])
const loading = ref(true)
const search = ref('')
const page = ref(1)
const limit = ref(10)
const totalPosts = ref(0)
const totalPages = computed(() => Math.ceil(totalPosts.value / limit.value))
const filters = reactive({
  status: 'All',
  sortBy: 'createdAt:desc',
})

// Delete modal
const showDeleteModal = ref(false)
const postToDelete = ref<Post | null>(null)
const deleteLoading = ref(false)

// Format date for display
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Fetch posts with pagination, search, and filters
const fetchPosts = async () => {
  loading.value = true
  try {
    const queryParams = new URLSearchParams({
      page: page.value.toString(),
      limit: limit.value.toString(),
      search: search.value,
      status: filters.status === 'All' ? '' : filters.status.toLowerCase(),
      sort: filters.sortBy,
    })

    const response = await $fetch(`/api/posts?${queryParams.toString()}`)

    // For now, using mock data until we have the actual API implementation
    if (!response || !Array.isArray(response.data)) {
      // Mock data for development
      const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
        id: `post-${i + 1}`,
        title: `Sample Blog Post ${i + 1}`,
        slug: `sample-blog-post-${i + 1}`,
        content: 'This is sample content.',
        excerpt: 'This is a sample excerpt.',
        published: i % 2 === 0,
        createdAt: new Date(Date.now() - i * 86_400_000),
        updatedAt: new Date(Date.now() - i * 43_200_000),
      }))

      posts.value = mockPosts
      totalPosts.value = 25
    } else {
      posts.value = response.data
      totalPosts.value = response.total
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Use mock data as fallback
    const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Sample Blog Post ${i + 1}`,
      slug: `sample-blog-post-${i + 1}`,
      content: 'This is sample content.',
      excerpt: 'This is a sample excerpt.',
      published: i % 2 === 0,
      createdAt: new Date(Date.now() - i * 86_400_000),
      updatedAt: new Date(Date.now() - i * 43_200_000),
    }))

    posts.value = mockPosts
    totalPosts.value = 25
  } finally {
    loading.value = false
  }
}

// Debounced search
const debouncedSearch = useDebounce(() => {
  page.value = 1
  fetchPosts()
}, 300)

// Delete confirmation
const confirmDelete = (post: Post) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

// Delete post
const deletePost = async () => {
  if (!postToDelete.value) return

  deleteLoading.value = true
  try {
    await $fetch(`/api/posts/${postToDelete.value.id}`, {
      method: 'DELETE',
    })

    // Remove post from list
    posts.value = posts.value.filter(
      (post) => post.id !== postToDelete.value?.id
    )
    totalPosts.value--

    // Show success notification
    const toast = useToast()
    toast.add({
      title: 'Post deleted',
      description: `"${postToDelete.value.title}" has been deleted.`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 5000,
    })

    showDeleteModal.value = false
    postToDelete.value = null
  } catch (error) {
    console.error('Error deleting post:', error)

    // Show error notification
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to delete post. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
  } finally {
    deleteLoading.value = false
  }
}

// Fetch posts on mount
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Blog Posts</h1>
      <UButton
        to="/admin/posts/new"
        color="primary"
        icon="i-heroicons-plus"
        size="lg"
      >
        New Post
      </UButton>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <UInput
              class="w-64"
              v-model="search"
              placeholder="Search posts..."
              size="lg"
              icon="i-heroicons-magnifying-glass"
              @input="debouncedSearch"
            />
          </div>
          <div class="flex items-center gap-2">
            <USelect
              v-model="filters.status"
              :options="['All', 'Published', 'Draft']"
              placeholder="Status"
              size="sm"
              @update:model-value="fetchPosts"
            />
            <USelect
              v-model="filters.sortBy"
              :options="[
                { label: 'Latest first', value: 'createdAt:desc' },
                { label: 'Oldest first', value: 'createdAt:asc' },
                { label: 'Title A-Z', value: 'title:asc' },
                { label: 'Title Z-A', value: 'title:desc' },
              ]"
              placeholder="Sort by"
              size="sm"
              @update:model-value="fetchPosts"
            />
          </div>
        </div>
      </template>

      <UTable
        :columns="columns"
        :rows="posts"
        :loading="loading"
        :empty-state="{
          icon: 'i-heroicons-document-text',
          label: 'No posts found',
        }"
      >
        <template #title-data="{ row }">
          <div>
            <ULink
              class="font-medium text-primary-500"
              :to="`/admin/posts/${row.id}`"
            >
              {{ row.title }}
            </ULink>
          </div>
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

        <template #updatedAt-data="{ row }">
          {{ formatDate(row.updatedAt) }}
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
            <UButton
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              title="Delete post"
              size="xs"
              @click="confirmDelete(row)"
            />
          </div>
        </template>
      </UTable>

      <template #footer>
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">
            Showing {{ posts.length }} of {{ totalPosts }} posts
          </p>
          <UPagination
            v-model="page"
            :page-count="totalPages"
            :total="totalPosts"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: 'rounded-full min-w-8 h-8 justify-center',
            }"
            @update:model-value="fetchPosts"
          />
        </div>
      </template>
    </UCard>

    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              class="text-red-500"
              name="i-heroicons-exclamation-triangle"
            />
            <h3 class="text-lg font-medium">Delete Post</h3>
          </div>
        </template>

        <p>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <p class="font-medium mt-2">{{ postToDelete?.title }}</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="outline"
              @click="showDeleteModal = false"
            >
              Cancel
            </UButton>
            <UButton color="red" :loading="deleteLoading" @click="deletePost">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
