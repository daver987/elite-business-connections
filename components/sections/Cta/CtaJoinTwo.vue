<template>
  <section class="relative isolate overflow-hidden bg-gray-900">
    <UContainer>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Unlock Business Opportunities.<br />Join Elite Business Connections
          Today.
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Become part of a network where professionals thrive. Our platform
          facilitates meaningful connections that help accelerate your business
          growth.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink
            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            to="/contact"
          >
            Get started
          </NuxtLink>
          <NuxtLink
            class="text-sm font-semibold leading-6 text-white"
            to="/contact"
            >Learn more <span aria-hidden="true">→</span></NuxtLink
          >
        </div>
      </div>
    </UContainer>
    <svg
      class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      viewBox="0 0 1024 1024"
      aria-hidden="true"
    >
      <circle
        cx="512"
        cy="512"
        r="512"
        fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
        fill-opacity="0.7"
      />
      <defs>
        <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
          <stop stop-color="#7775D6" />
          <stop offset="1" stop-color="#E935C1" />
        </radialGradient>
      </defs>
    </svg>
  </section>
</template>
