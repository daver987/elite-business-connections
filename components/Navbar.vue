<script setup lang='ts'>
interface NavLink {
  name: string
  href: string
}

interface NavLinks {
  navLinks: NavLink[]
}

const isOpen = ref(false)

defineProps<NavLinks>()

const delayedClose = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 300)
}

</script>

<template>
  <UContainer class='absolute inset-x-0 top-0 z-50'>
    <nav
      class='flex items-center justify-between border-white/10 py-3 border-b-[0.5px]'
      aria-label='Global'
    >
      <div class='flex lg:flex-1'>
        <Logo size='md' />
      </div>
      <div class='flex lg:hidden'>
        <UButton
          icon='i-heroicons-bars-3'
          size='md'
          square
          variant='ghost'
          color='gray'
          :padded='false'
          @click='isOpen = true'
        />
      </div>
      <div class='hidden lg:flex lg:gap-x-12'>
        <NuxtLink
          class='text-sm font-semibold leading-6'
          v-for='item in navLinks'
          exact-active-class='link-active'
          :key='item.name'
          :to='item.href'
        >{{ item.name }}
        </NuxtLink>
      </div>
      <div class='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4'>
        <NuxtLink
          class='text-sm font-semibold leading-6'
          to='/under-construction'
        >Access Membership <span aria-hidden='true'>&rarr;</span>
        </NuxtLink>
      </div>
    </nav>
  </UContainer>
  <USlideover v-model='isOpen'>
    <UCard>
      <template #header>
        <div class='flex items-center justify-between'>
          <Logo size='md' />
          <UButton
            icon='i-heroicons-x-mark'
            size='lg'
            :padded='false'
            square
            color='gray'
            variant='ghost'
            @click='isOpen = false'
          />
        </div>
      </template>
      <template #default>
        <div class='space-y-2 py-6 flex flex-col'>
          <NuxtLink
            class='link-style'
            v-for='item in navLinks'
            exact-active-class='link-active'
            :key='item.name'
            :to='item.href'
            @click.native='delayedClose'
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </template>
      <template #footer>
        <div class='py-6'>
          <NuxtLink to='/under-construction'> Access Membership</NuxtLink>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>
