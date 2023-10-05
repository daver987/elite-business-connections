<script setup lang="ts">
const { data: linkArray } = await useFetch('/api/navigation')
const navigationLinks = linkArray.value?.navigation!

const spotlightTitle = ref('Elite Business Connections: Spotlights')
const spotlightExcerpt = ref(
  "Welcome to the Spotlights, presented by Elite Business Connections. Here, you'll find a collection of inspiring stories and informative articles from our diverse membership, including Kinahealth and many others. Dive into these spotlights to discover success stories, expert insights, and valuable tips on achieving optimal well-being and business success"
)
</script>

<template>
  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
    <NuxtImg
      class="absolute inset-0 -z-10 h-full w-full object-cover"
      src="https://images.unsplash.com/photo-1482100199117-a4a38a64e7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      alt="Spotlight Image"
    />
    <div
      class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <UContainer>
      <Navbar :navLinks="navigationLinks" />
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {{ spotlightTitle }}
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          {{ spotlightExcerpt }}
        </p>
      </div>
    </UContainer>
  </div>
</template>
