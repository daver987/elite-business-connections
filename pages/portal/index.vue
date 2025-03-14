<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

definePageMeta({
  layout: 'portal',
})

const isNotificationsSlideoverOpen = isNotificationsSlideoverOpenState()

const items = [
  [
    {
      label: 'New mail',
      icon: 'i-heroicons-paper-airplane',
      to: '/portal/inbox',
    },
    {
      label: 'New user',
      icon: 'i-heroicons-user-plus',
      to: '/portal/users',
    },
  ],
]

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="red" inset>
                <UIcon class="w-5 h-5" name="i-heroicons-bell" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdown :items="items">
            <UButton
              class="ml-1.5 rounded-full"
              icon="i-heroicons-plus"
              size="md"
            />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker class="-ml-2.5" v-model="range" />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart :period="period" :range="range" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
