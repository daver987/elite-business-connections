<script setup lang="ts">
definePageMeta({
  layout: 'portal',
})

// This would typically come from an API call
const spotlights = [
  {
    id: '1a2b3c',
    title: 'Spring Business Networking Tips',
    status: 'published',
    author: 'John Smith',
    date: '2025-02-15',
  },
  {
    id: '4d5e6f',
    title: 'Member Spotlight: Sarah Johnson',
    status: 'published',
    author: 'Admin',
    date: '2025-02-01',
  },
  {
    id: '7g8h9i',
    title: 'Benefits of Professional Referrals',
    status: 'draft',
    author: 'Michael Chen',
    date: '2025-03-05',
  },
  {
    id: '0j1k2l',
    title: 'Upcoming Network Events for Q2',
    status: 'draft',
    author: 'Admin',
    date: '2025-03-12',
  },
]

const search = ref('')
const statusFilter = ref('all')
const filteredSpotlights = computed(() => {
  let results = spotlights

  if (search.value) {
    const searchTerm = search.value.toLowerCase()
    results = results.filter(
      (spotlight) =>
        spotlight.title.toLowerCase().includes(searchTerm) ||
        spotlight.author.toLowerCase().includes(searchTerm)
    )
  }

  if (statusFilter.value !== 'all') {
    results = results.filter(
      (spotlight) => spotlight.status === statusFilter.value
    )
  }

  return results
})

function createNewSpotlight() {
  // Generate a UUID
  const uuid =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)

  // Redirect to edit page with new UUID
  navigateTo(`/portal/editor/${uuid}`)
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Content Editor">
        <template #right>
          <div class="flex items-center gap-2">
            <UButton
              icon="i-heroicons-plus"
              label="New Spotlight"
              color="primary"
              @click="createNewSpotlight"
            />
          </div>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UContainer class="p-4">
          <UCard class="mb-4">
            <div class="flex items-center gap-4">
              <UInput
                class="flex-1"
                v-model="search"
                icon="i-heroicons-magnifying-glass"
                placeholder="Search spotlights..."
              />
              <USelect
                v-model="statusFilter"
                :options="[
                  { label: 'All Status', value: 'all' },
                  { label: 'Published', value: 'published' },
                  { label: 'Draft', value: 'draft' },
                ]"
                placeholder="Filter by status"
              />
            </div>
          </UCard>

          <UTable
            :columns="[
              { key: 'title', label: 'Title', sortable: true },
              { key: 'author', label: 'Author' },
              { key: 'date', label: 'Date', sortable: true },
              { key: 'status', label: 'Status' },
              { key: 'actions', label: 'Actions' },
            ]"
            :rows="filteredSpotlights"
          >
            <template #title-cell="{ row }">
              <NuxtLink
                class="text-primary-500 hover:underline"
                :to="`/portal/editor/${row.id}`"
              >
                {{ row.title }}
              </NuxtLink>
            </template>
            <template #status-cell="{ row }">
              <UBadge :color="row.status === 'published' ? 'green' : 'orange'">
                {{ row.status }}
              </UBadge>
            </template>
            <template #actions-cell="{ row }">
              <div class="flex items-center gap-2">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-pencil-square"
                  :ui="{ rounded: 'rounded-full' }"
                  :to="`/portal/editor/${row.id}`"
                />
                <UButton
                  v-if="row.status === 'draft'"
                  color="green"
                  variant="ghost"
                  icon="i-heroicons-paper-airplane"
                  :ui="{ rounded: 'rounded-full' }"
                  title="Publish"
                />
                <UButton
                  v-if="row.status === 'published'"
                  color="blue"
                  variant="ghost"
                  icon="i-heroicons-eye"
                  :ui="{ rounded: 'rounded-full' }"
                  title="View Published"
                  :to="`/spotlights/${row.id}`"
                  target="_blank"
                />
                <UDropdown
                  :items="[
                    {
                      label: 'Duplicate',
                      icon: 'i-heroicons-document-duplicate',
                    },
                    { label: 'Share Link', icon: 'i-heroicons-share' },
                    [
                      {
                        label: 'Delete',
                        icon: 'i-heroicons-trash',
                        color: 'red',
                      },
                    ],
                  ]"
                >
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-ellipsis-horizontal"
                    :ui="{ rounded: 'rounded-full' }"
                  />
                </UDropdown>
              </div>
            </template>
          </UTable>
        </UContainer>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
