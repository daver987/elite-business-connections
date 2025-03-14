<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps({
  as: {
    type: [String, Object],
    default: 'img',
  },
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
  <component class="dark:hidden" v-bind="$attrs" :is="as" :src="light" />
  <component class="hidden dark:block" v-bind="$attrs" :is="as" :src="dark" />
</template>
