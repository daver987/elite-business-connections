<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  Badge,
  BadgeColor,
  BadgeSize,
  BadgeVariant,
  DeepPartial,
} from '#ui/types'

const config = {
  wrapper:
    'h-[--header-height] flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 gap-x-4 min-w-0',
  container: 'flex items-center justify-between flex-1 gap-x-1.5 min-w-0',
  left: 'flex items-stretch gap-1.5 min-w-0',
  title:
    'flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0',
  badge: {
    wrapper: 'inline-flex items-center',
    base: '',
    size: 'xs' as BadgeSize,
    color: 'primary' as BadgeColor,
    variant: 'subtle' as BadgeVariant,
  },
  center: 'hidden lg:flex',
  right: 'flex items-stretch flex-shrink-0 gap-1.5',
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  badge: {
    type: [String, Number, Object] as PropType<string | number | Badge>,
    default: undefined,
  },
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
  'dashboard.navbar',
  toRef(props, 'ui'),
  config,
  computed(() => String(props.class || '')),
  true
)
</script>

<template>
  <div v-bind="attrs" :class="ui.wrapper">
    <div :class="ui.container">
      <div :class="ui.left">
        <slot name="toggle">
          <UDashboardNavbarToggle />
        </slot>

        <slot name="left">
          <h1 v-if="title || $slots.title" :class="ui.title">
            <slot name="title">
              <span class="truncate">{{ title }}</span>
            </slot>
          </h1>

          <div v-if="badge || $slots.badge" :class="ui.badge.wrapper">
            <slot name="badge">
              <UBadge
                v-if="badge"
                v-bind="{
                  size: ui.badge.size,
                  color: ui.badge.color,
                  variant: ui.badge.variant,
                  ...(typeof badge === 'string' || typeof badge === 'number'
                    ? { label: badge }
                    : badge),
                }"
                :class="ui.badge.base"
              />
            </slot>
          </div>
        </slot>
      </div>

      <div v-if="$slots.center" :class="ui.center">
        <slot name="center" />
      </div>

      <div v-if="$slots.right || $slots.center" :class="ui.right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
