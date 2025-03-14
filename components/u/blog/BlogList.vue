<script setup lang="ts">
import type { PropType } from 'vue'
import type { DeepPartial } from '#ui/types'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  orientation: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  class: {
    type: [String, Object, Array] as PropType<unknown>,
    default: '',
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof config.value>>,
    default: () => ({}),
  },
})

const config = computed(() => {
  const wrapper: string = {
    horizontal: 'flex flex-col lg:grid lg:grid-cols-3 gap-x-8 gap-y-16',
    vertical: 'flex flex-col gap-y-16 w-full',
  }[props.orientation]

  return {
    wrapper,
  }
})

const { ui, attrs } = useUI(
  'blog.list',
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
