<script setup lang="ts">
import type { PropType } from 'vue'
import type { Button, DeepPartial } from '#ui/types'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  icon: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  links: {
    type: Array as PropType<
      (Button & { click?: (...args: unknown[]) => void })[]
    >,
    default: () => [],
  },
  orientation: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
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
    vertical:
      'divide-y divide-gray-200 dark:divide-gray-800 space-y-6 *:pt-6 first:*:pt-2 mb-6',
    horizontal:
      'grid lg:grid-cols-3 pt-2 pb-6 items-start first:*:col-span-2 lg:first:*:col-span-1 last:*:col-span-2 gap-6',
  }[props.orientation]

  const container: string = {
    vertical: 'flex flex-wrap items-center justify-between gap-4',
    horizontal: 'flex lg:flex-col justify-between flex-row flex-wrap gap-4',
  }[props.orientation]

  return {
    wrapper,
    container,
    inner: 'flex items-start gap-4',
    title: 'text-gray-900 dark:text-white font-semibold',
    description: 'mt-1 text-sm text-gray-500 dark:text-gray-400',
    links: 'flex flex-wrap items-center gap-1.5',
    icon: {
      wrapper: 'inline-flex',
      base: 'w-12 h-12 flex-shrink-0 text-gray-900 dark:text-white',
    },
  }
})

const { ui, attrs } = useUI(
  'dashboard.section',
  toRef(props, 'ui'),
  config,
  computed(() => String(props.class || '')),
  true
)
</script>

<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <div :class="ui.container">
      <div :class="ui.inner">
        <div v-if="icon || $slots.icon" :class="ui.icon.wrapper">
          <slot name="icon">
            <UIcon :name="icon as string" :class="ui.icon.base" />
          </slot>
        </div>

        <div>
          <p v-if="title || $slots.title" :class="ui.title">
            <slot name="title">
              {{ title }}
            </slot>
          </p>

          <div v-if="description || $slots.description" :class="ui.description">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>

      <div v-if="links?.length || $slots.links" :class="ui.links">
        <slot name="links">
          <UButton
            v-for="(link, index) in links"
            v-bind="link"
            :key="index"
            @click="link.click"
          />
        </slot>
      </div>
    </div>

    <slot />
  </div>
</template>
