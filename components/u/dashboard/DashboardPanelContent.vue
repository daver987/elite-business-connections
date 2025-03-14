<script setup lang="ts">
import type { PropType } from 'vue'
import type { DeepPartial } from '#ui/types'

const config = {
  wrapper: 'p-4 flex-1 flex flex-col overflow-y-auto',
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<unknown>,
    default: '',
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof config>>,
    default: () => ({}),
  },
})

const { ui, attrs } = useUI(
  'dashboard.panel.content',
  toRef(props, 'ui'),
  config,
  computed(() => String(props.class || '')),
  true
)
</script>

<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <slot />
  </div>
</template>
