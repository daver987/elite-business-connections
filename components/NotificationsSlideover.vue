<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import type { Notification } from '~/types'

const isNotificationsSlideoverOpen = isNotificationsSlideoverOpenState()

const { data: notifications } =
  await useFetch<Notification[]>('/api/notifications')
</script>

<template>
  <UDashboardSlideover
    v-model="isNotificationsSlideoverOpen"
    title="Notifications"
  >
    <NuxtLink
      class="p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative"
      v-for="notification in notifications"
      :key="notification.id"
      :to="`/inbox?id=${notification.id}`"
    >
      <UChip color="red" :show="!!notification.unread" inset>
        <UAvatar
          v-bind="notification.sender.avatar"
          :alt="notification.sender.name"
          size="md"
        />
      </UChip>

      <div class="text-sm flex-1">
        <p class="flex items-center justify-between">
          <span class="text-gray-900 dark:text-white font-medium">{{
            notification.sender.name
          }}</span>

          <time
            class="text-gray-500 dark:text-gray-400 text-xs"
            v-text="formatTimeAgo(new Date(notification.date))"
            :datetime="notification.date"
          />
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          {{ notification.body }}
        </p>
      </div>
    </NuxtLink>
  </UDashboardSlideover>
</template>
