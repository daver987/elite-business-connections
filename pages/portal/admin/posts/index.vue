<script setup lang="ts">
import { z } from 'zod'
import type { Post } from '~/types/Post'
import { refDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'portal',
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
    label: 'Created',
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

// Format date for display
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Fetch posts
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

    if (response) {
      posts.value = response.data
      totalPosts.value = response.total
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Show error notification
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to load posts. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
  } finally {
    loading.value = false
  }
}

// Watch for changes to search, page, or filters
watch([() => page.value, () => filters.status, () => filters.sortBy], () => {
  fetchPosts()
})

const debouncedSearch = refDebounced(search, 300)

watch(debouncedSearch, () => {
  page.value = 1
  fetchPosts()
})

// Delete post
const deletePost = async (post: Post) => {
  try {
    await $fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    })

    // Refresh posts
    fetchPosts()

    // Show success notification
    const toast = useToast()
    toast.add({
      title: 'Success',
      description: 'Post deleted successfully',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 5000,
    })
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
  }
}

// Fetch posts on mount
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Posts Management">
        <template #right>
          <UButton
            color="primary"
            icon="i-heroicons-plus"
            to="/portal/admin/posts/new"
          >
            New Post
          </UButton>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UInput
            class="w-64"
            v-model="search"
            placeholder="Search posts..."
            icon="i-heroicons-magnifying-glass"
          />
        </template>
        <template #right>
          <USelect
            v-model="filters.status"
            :options="['All', 'Published', 'Draft']"
            placeholder="Status"
            size="sm"
          />
          <USelect
            v-model="filters.sortBy"
            :options="[
              { label: 'Newest first', value: 'createdAt:desc' },
              { label: 'Oldest first', value: 'createdAt:asc' },
              { label: 'Title A-Z', value: 'title:asc' },
              { label: 'Title Z-A', value: 'title:desc' },
            ]"
            placeholder="Sort by"
            size="sm"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
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
            <div class="font-medium">{{ row.title }}</div>
          </template>

          <template #status-data="{ row }">
            <UBadge
              :color="row.published ? 'green' : 'gray'"
              :variant="row.published ? 'solid' : 'outline'"
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
                :to="`/spotlights/${row.slug}`"
                target="_blank"
                title="View post"
                size="xs"
              />
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-pencil-square"
                :to="`/portal/admin/posts/${row.id}`"
                title="Edit post"
                size="xs"
              />
              <UPopover>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  title="Delete post"
                  size="xs"
                />
                <template #panel>
                  <div class="p-4 w-80">
                    <p class="text-sm text-gray-500 mb-4">
                      Are you sure you want to delete this post? This action
                      cannot be undone.
                    </p>
                    <div class="flex justify-end gap-2">
                      <UButton
                        color="gray"
                        variant="ghost"
                        size="sm"
                        @click="() => {}"
                      >
                        Cancel
                      </UButton>
                      <UButton color="red" size="sm" @click="deletePost(row)">
                        Delete
                      </UButton>
                    </div>
                  </div>
                </template>
              </UPopover>
            </div>
          </template>
        </UTable>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
          <div class="text-sm text-gray-500">
            Showing {{ posts.length }} of {{ totalPosts }} posts
          </div>
          <UPagination
            v-model="page"
            :page-count="totalPages"
            :total="totalPosts"
            :ui="{ wrapper: 'flex items-center gap-1' }"
          />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
