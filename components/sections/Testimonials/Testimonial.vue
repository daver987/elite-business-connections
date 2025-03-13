<script setup lang="ts">
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/vue-splide'

interface Testimonial {
  id: number
  quote: string
  author: string
  occupation: string
  image: string
}

// Default testimonials if API fails
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Before joining EBC, I was new in business, had no mentors or business partners and was very nervous of where my business would take me. Now looking back 3 years in, it was the best decision I made.',
    author: 'John Smith',
    occupation: 'Business Owner',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
]

// Define the API response type
interface ApiResponse {
  statusCode: number
  data?: Testimonial[]
  error?: string
}

const { data: apiResponse } = await useLazyFetch<ApiResponse>(
  '/api/pages/home/testimonials',
  {
    default: () => ({
      statusCode: 200,
      data: defaultTestimonials,
    }),
  }
)

const testimonials = computed(() =>
  apiResponse.value?.data && apiResponse.value.statusCode === 200
    ? apiResponse.value.data
    : defaultTestimonials
)

const options = {
  rewind: false,
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
    <div class="max-w-3xl text-center mx-auto mb-24">
      <h2 class="text-lg font-semibold leading-8 tracking-tight text-primary">
        What Our Members Say
      </h2>
      <p
        class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance"
      >
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
          :key="testimonial.id"
        >
          <figure class="mt-10 flex flex-auto flex-col justify-between">
            <blockquote class="text-lg leading-8 text-white">
              <p>{{ testimonial.quote }}</p>
            </blockquote>
            <figcaption class="mt-10 flex items-center gap-x-6">
              <img
                class="h-14 w-14 rounded-full bg-gray-800 object-center object-cover"
                :src="testimonial.image"
                :alt="testimonial.author"
              />
              <div class="text-base">
                <div class="font-semibold">
                  {{ testimonial.author }}
                </div>
                <div class="mt-1 text-gray-400">
                  {{ testimonial.occupation }}
                </div>
              </div>
            </figcaption>
          </figure>
        </SplideSlide>
      </Splide>
    </UContainer>
  </section>
</template>
