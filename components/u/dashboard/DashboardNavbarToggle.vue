<script setup lang="ts">
const appConfig = useAppConfig()
const { $ui } = useNuxtApp()

interface UI {
  button?: {
    secondary?: Record<string, unknown>
  }
}

const ui = $ui as UI
const isOpen = inject<boolean | undefined>('isOpen', undefined)
</script>

<template>
  <UButton
    class="lg:hidden"
    v-if="isOpen !== undefined"
    v-bind="ui?.button?.secondary || {}"
    :icon="appConfig.ui.icons.menu"
    :aria-label="`${isOpen ? 'Close' : 'Open'} sidebar`"
    @click="isOpen = !isOpen"
  />
</template>
