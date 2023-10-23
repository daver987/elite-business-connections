<script setup lang="ts">
interface Props {
  backgroundImage: string
  headline: string
  content: string
  buttonOne: {
    label: string
    href: string
  }
  buttonTwo: {
    label: string
    href: string
  }
}
</script>

<template>
  <div class="container relative isolate overflow-hidden">
    <NuxtImg
      class="absolute inset-0 -z-10 h-full w-full object-left lg:object-center object-cover"
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      alt="Cover Image"
    />
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
    <UContainer class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20"
        >
          Unveiling our newest networking events.
          <NuxtLink class="font-semibold text-white" to="/about"
            ><span class="absolute inset-0" aria-hidden="true" />Learn more
            <span aria-hidden="true">&rarr;</span></NuxtLink
          >
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Elevate Your Business with Elite Connections
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Join a community of professionals dedicated to helping each other
          succeed. Benefit from quality referrals, exclusive events, and
          specialized training.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <UButton id="join-now" to="/contact" size="lg" label="Join Now" />

          <UButton
            id="learn-more"
            trailing
            label="Learn More"
            color="white"
            variant="link"
            to="/about"
            icon="i-heroicons-arrow-long-right"
          />
        </div>
      </div>
    </UContainer>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
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
  </div>
</template>

<style scoped>
.container {
  min-height: 100dvh;
}

#learn-more {
  text-decoration: none;
}

#learn-more:hover {
  text-decoration: none;
}

#join-now {
  color: white !important;
}

#join-now:hover {
  color: white !important;
}
</style>
