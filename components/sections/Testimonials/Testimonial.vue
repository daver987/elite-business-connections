<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'

interface Testimonial {
  company: string
  quote: string
  avatar: string
  name: string
  role: string
}

interface Props {
  testimonials: Testimonial[]
}

defineProps<Props>()

const options = {
  rewind: true,
  speed: 4000,
  perPage: 1,
  mediaQuery: 'min',
  breakpoints: {
    1024: {
      perPage: 2,
    },
  },
  arrows: false,
  pagination: false,
  drag: true,
  autoplay: true,
  infinite: true,
}
</script>

<template>
  <section class="py-24 sm:py-32 bg-gray-900">
    <div class="max-w-xl text-center mx-auto mb-24">
      <h2 class="text-lg font-semibold leading-8 tracking-tight text-primary">
        What Our Members Say
      </h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Building Success, One Connection at a Time
      </p>
    </div>
    <UContainer>
      <Splide
        class="max-w-7xl w-full"
        :options="options"
        aria-label="Testimonials"
      >
        <SplideSlide
          class="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20 border-x-[0.5px] border-gray-700 pl-5"
          v-for="testimonial in testimonials"
          :key="testimonial.name"
        >
          <h3 class="h-12 text-3xl font-medium text-gray-100 self-start">
            {{ testimonial.company }}
          </h3>
          <figure class="mt-10 flex flex-auto flex-col justify-between">
            <blockquote class="text-lg leading-8 text-white">
              <p>{{ testimonial.quote }}</p>
            </blockquote>
            <figcaption class="mt-10 flex items-center gap-x-6">
              <NuxtImg
                class="h-14 w-14 rounded-full bg-gray-800 object-center object-cover"
                :src="testimonial.avatar"
                alt="Avatar"
              />
              <div class="text-base">
                <div class="font-semibold text-white">
                  {{ testimonial.name }}
                </div>
                <div class="mt-1 text-gray-400">
                  {{ testimonial.role }}
                </div>
              </div>
            </figcaption>
          </figure>
        </SplideSlide>
      </Splide>
    </UContainer>
  </section>
</template>
