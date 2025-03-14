<script setup lang="ts">
const appConfig = useAppConfig()
const { $ui } = useNuxtApp()
const ui = $ui as UI
const { toggleDashboardSearch } = useUIState()
const { metaSymbol } = useShortcuts()

interface UI {
  button?: {
    secondary?: Record<string, unknown>
  }
}

defineProps({
  label: {
    type: String,
    default: 'Search...',
  },
})
</script>

<template>
  <UButton
    v-bind="(!!label ? { color: 'gray' } : ui?.button?.secondary) || {}"
    :icon="appConfig.ui.icons.search"
    :label="label"
    truncate
    aria-label="Search"
    @click="toggleDashboardSearch"
  >
    <template v-if="!!label" #trailing>
      <div
        class="hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0"
      >
        <UKbd>
          {{ metaSymbol }}
        </UKbd>
        <UKbd> K </UKbd>
      </div>
    </template>
  </UButton>
</template>
