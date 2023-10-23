<script setup lang="ts">
import type { Stat } from '~/types/stats'
import type { Ref } from 'vue'

interface Props {
  isBoxed?: boolean
}

defineProps<Props>()

const statQuery = groq`*[ _type == "stats"]{
  position,
    duration,
    symbol,
    end,
    title,
    start
}`
const { data: statArray } = await useSanityQuery(statQuery)

const statContainer: Ref<null | HTMLElement> = ref(null)
const observer: Ref<IntersectionObserver | null> = ref(null)
const currentValues: Ref<number[]> = ref([])
const timers: { [key: number]: any } = {}
let isAnimated = new Array(statArray.value.length).fill(false)

const animateValue = (stat: Stat, index: number) => {
  const steps = Math.floor(stat.duration / 10)
  const increment = (stat.end - stat.start) / steps
  let current = stat.start

  timers[index] = setInterval(() => {
    current += increment
    if (
      (increment > 0 && current >= stat.end) ||
      (increment < 0 && current <= stat.end)
    ) {
      currentValues.value[index] = stat.end
      clearInterval(timers[index])
    } else {
      currentValues.value[index] = Math.floor(current)
    }
  }, 10)
}

const onIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      statArray.value.forEach((stat, index) => {
        if (!isAnimated[index]) {
          animateValue(stat, index)
          isAnimated[index] = true
        }
      })
      if (observer.value) {
        observer.value.disconnect()
      }
    }
  })
}

onMounted(() => {
  currentValues.value = new Array(statArray.value.length).fill(0)
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
            :key="stat._id"
          >
            <dt class="text-sm font-semibold leading-6 text-gray-300">
              {{ stat.title }}
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight text-white"
            >
              <span v-if="stat.position === 'start'">{{ stat.symbol }}</span
              >{{ currentValues[statArray.indexOf(stat)]
              }}<span v-if="stat.position === 'end'">{{ stat.symbol }}</span>
              <span v-else>+</span>
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
            :key="stat._id"
          >
            <dt class="text-base leading-7 text-gray-300">
              {{ stat.title }}
            </dt>
            <dd class="text-3xl font-semibold tracking-tight text-white">
              <span v-if="stat.position === 'start'">{{ stat.symbol }}</span
              >{{ currentValues[statArray.indexOf(stat)]
              }}<span v-if="stat.position === 'end'">{{ stat.symbol }}</span>
              <span v-else>+</span>
            </dd>
          </div>
        </dl>
      </div>
    </UContainer>
  </section>
</template>
