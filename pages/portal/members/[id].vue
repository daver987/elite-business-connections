<script setup lang="ts">
import type { User } from '~/types'

definePageMeta({
  layout: 'portal',
})

const route = useRoute()
const { id } = route.params

const { data: member, pending } = await useFetch<User>(`/api/users/${id}`, {
  default: () => null,
})

// If member not found, redirect to members list
if (!member.value && !pending.value) {
  navigateTo('/portal/members')
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="member?.name || 'Member Details'">
        <template #right>
          <UButton
            label="Back to Members"
            icon="i-heroicons-arrow-left"
            color="gray"
            to="/portal/members"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent v-if="pending">
        <div class="flex justify-center p-8">
          <ULoading />
        </div>
      </UDashboardPanelContent>

      <UDashboardPanelContent v-else-if="member">
        <div class="max-w-3xl mx-auto p-4">
          <div class="flex items-center gap-4 mb-6">
            <UAvatar v-if="member.avatar" v-bind="member.avatar" size="xl" />
            <UAvatar v-else :alt="member.name" size="xl" />
            <div>
              <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ member.name }}
              </h1>
              <p class="text-gray-500 dark:text-gray-400">{{ member.email }}</p>
            </div>
          </div>

          <UDivider class="my-6" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard>
              <template #header>
                <h2 class="text-lg font-medium">Contact Information</h2>
              </template>
              <div class="space-y-4">
                <div class="flex items-start gap-2" v-if="member.company">
                  <UIcon
                    class="w-5 h-5 text-gray-400 mt-0.5"
                    name="i-heroicons-building-office"
                  />
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Company
                    </p>
                    <p class="text-gray-900 dark:text-white">
                      {{ member.company }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-2" v-if="member.location">
                  <UIcon
                    class="w-5 h-5 text-gray-400 mt-0.5"
                    name="i-heroicons-map-pin"
                  />
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p class="text-gray-900 dark:text-white">
                      {{ member.location }}
                    </p>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
