<script setup>
definePageMeta({
  layout: 'empty',
  alias: '/under-construction',
  colorMode: 'dark',
})
</script>

<template>
  <section
    class="grid min-h-screen grid-cols-1 grid-rows-[1fr,auto,1fr] bg-gray-900 lg:grid-cols-[max(50%,36rem),1fr]"
  >
    <UContainer
      class="pt-6 w-full sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8"
    >
      <div>
        <span class="sr-only">Elite Business Connections</span>
        <Logo size="lg" :auto-margin="false" />
      </div>
    </UContainer>
    <UContainer
      class="w-full py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2"
    >
      <div class="max-w-lg">
        <p class="text-base font-semibold leading-8 text-primary">
          Under Construction
        </p>
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl"
        >
          We're Working on Something Amazing
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-300">
          Please check back soon.
        </p>
        <div class="mt-10">
          <NuxtLink class="text-sm font-semibold leading-7 text-primary" to="/"
            ><span aria-hidden="true">&larr;</span> Back to home
          </NuxtLink>
        </div>
      </div>
    </UContainer>
    <div
      class="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block"
    >
      <NuxtImg
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
        alt="Under Construction"
      />
    </div>
  </section>
</template>
