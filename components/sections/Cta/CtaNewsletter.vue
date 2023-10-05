<template>
  <div
    class="relative isolate overflow-hidden bg-gray-950 py-16 sm:py-24 lg:py-32"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
      >
        <div class="max-w-xl lg:max-w-lg">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay Connected with Elite Insights
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-300">
            Subscribe to our newsletter for weekly insights on business
            networking, success stories, and opportunities.
          </p>
          <div class="mt-6 flex max-w-md gap-x-4">
            <label class="sr-only" for="email-address">Email address</label>
            <UInput
              class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              placeholder="Enter your email"
            />
            <UButton
              class="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="submit"
            >
              Subscribe
            </UButton>
          </div>
        </div>
        <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
          <div class="flex flex-col items-start">
            <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <Icon
                class="h-6 w-6 text-white"
                name="heroicons:calendar-days"
                aria-hidden="true"
              />
            </div>
            <dt class="mt-4 font-semibold text-white">Exclusive Invitations</dt>
            <dd class="mt-2 leading-7 text-gray-400">
              Get invites to exclusive Elite Business Connections events and
              webinars.
            </dd>
          </div>
          <div class="flex flex-col items-start">
            <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <Icon
                class="h-6 w-6 text-white"
                name="heroicons:hand-raised"
                aria-hidden="true"
              />
            </div>
            <dt class="mt-4 font-semibold text-white">Zero Spam</dt>
            <dd class="mt-2 leading-7 text-gray-400">
              Your time is valuable. We send only the information that matters
              to you.
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div
      class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      aria-hidden="true"
    >
      <div
        class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
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
