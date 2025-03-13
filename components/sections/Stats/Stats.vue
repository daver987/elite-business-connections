<script setup lang="ts">
import type { Ref } from 'vue'

interface Props {
  isBoxed?: boolean
}

defineProps<Props>()

interface Stat {
  id: number
  value: string
  label: string
  description: string
  start?: number
  end?: number
  symbol?: string
  position?: 'start' | 'end'
  duration?: number
}

interface ApiResponse {
  statusCode: number
  data?: Stat[]
  error?: string
}

const defaultStats: Stat[] = [
  {
    id: 1,
    value: '50+',
    label: 'Active Members',
    description: 'Professional business connections in our network',
    start: 0,
    end: 50,
    symbol: '+',
    position: 'end',
    duration: 1500,
  },
  {
    id: 2,
    value: '100+',
    label: 'Monthly Referrals',
    description: 'Quality business leads shared between members',
    start: 0,
    end: 100,
    symbol: '+',
    position: 'end',
    duration: 1500,
  },
  {
    id: 3,
    value: '25+',
    label: 'Business Categories',
    description: 'Diverse range of industries represented',
    start: 0,
    end: 25,
    symbol: '+',
    position: 'end',
    duration: 1500,
  },
  {
    id: 4,
    value: '6+',
    label: 'Years of Excellence',
    description: 'Building strong business relationships since 2018',
    start: 0,
    end: 6,
    symbol: '+',
    position: 'end',
    duration: 1500,
  },
]

const { data: apiResponse } = useLazyFetch<ApiResponse>(
  '/api/pages/home/stats',
  {
    default: () => ({
      statusCode: 200,
      data: defaultStats,
    }),
  }
)

const statArray = computed(() =>
  apiResponse.value?.data && apiResponse.value.statusCode === 200
    ? apiResponse.value.data
    : defaultStats
)

const statContainer: Ref<null | HTMLElement> = ref(null)
const observer: Ref<IntersectionObserver | null> = ref(null)
const currentValues: Ref<Array<number>> = ref([])
const timers: Record<number, ReturnType<typeof setInterval>> = {}

const isAnimated = ref<Array<boolean>>([])

const animateValue = (stat: Stat, index: number): void => {
  if (
    typeof stat.start !== 'number' ||
    typeof stat.end !== 'number' ||
    typeof stat.duration !== 'number'
  ) {
    return
  }

  const start = stat.start
  const end = stat.end
  const duration = stat.duration

  const steps: number = Math.floor(duration / 10)
  const increment: number = (end - start) / steps
  let current = start

  timers[index] = setInterval(() => {
    current += increment
    if (
      (increment > 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      currentValues.value[index] = end
      clearInterval(timers[index])
    } else {
      currentValues.value[index] = Math.floor(current)
    }
  }, 10)
}

const onIntersect = (entries: Array<IntersectionObserverEntry>) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      for (const [index, stat] of statArray.value.entries()) {
        if (!isAnimated.value[index]) {
          animateValue(stat, index)
          isAnimated.value[index] = true
        }
      }
      if (observer.value) {
        observer.value.disconnect()
      }
    }
  }
}

watch(
  statArray,
  (newStats) => {
    isAnimated.value = new Array(newStats.length).fill(false)
    currentValues.value = new Array(newStats.length).fill(0)

    if (observer.value && statContainer.value) {
      observer.value.observe(statContainer.value)
    }
  },
  { immediate: true }
)

onMounted(() => {
  observer.value = new IntersectionObserver(onIntersect, {
    rootMargin: '0px',
    threshold: 0.1,
  })
  if (statContainer.value && observer.value) {
    observer.value.observe(statContainer.value)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
  Object.values(timers).forEach(clearInterval)
})
</script>

<template>
  <section class="py-24 sm:py-32 bg-gray-900" ref="statContainer">
    <UContainer class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <dl
          class="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
          v-if="isBoxed"
        >
          <div
            class="flex flex-col bg-white/5 p-8"
            v-for="stat in statArray"
            :key="stat.id"
          >
            <dt class="text-sm font-semibold leading-6 text-gray-300">
              {{ stat.label }}
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight text-white"
            >
              <span v-if="stat.position === 'start'">{{ stat.symbol }}</span
              >{{ currentValues[statArray.indexOf(stat)] ?? 0
              }}<span v-if="stat.position === 'end'">{{ stat.symbol }}</span>
            </dd>
          </div>
        </dl>
        <dl
          class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4"
          v-else
        >
          <div
            class="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6"
            v-for="stat in statArray"
            :key="stat.id"
          >
            <dt class="text-base leading-7 text-gray-300">
              {{ stat.label }}
            </dt>
            <dd class="text-3xl font-semibold tracking-tight text-white">
              <span v-if="stat.position === 'start'">{{ stat.symbol }}</span
              >{{ currentValues[statArray.indexOf(stat)] ?? 0
              }}<span v-if="stat.position === 'end'">{{ stat.symbol }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </UContainer>
  </section>
</template>
