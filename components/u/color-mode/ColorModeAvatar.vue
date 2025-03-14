<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps({
  dark: {
    type: String,
    required: true,
  },
  light: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <UAvatar class="dark:hidden" v-bind="$attrs" :src="light" />
  <UAvatar class="hidden dark:block" v-bind="$attrs" :src="dark" />
</template>
