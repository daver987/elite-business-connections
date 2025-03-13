<script setup lang="ts">
// Navigation links
const navigationLinks = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/admin',
    exact: true,
  },
  {
    label: 'Blog Posts',
    icon: 'i-heroicons-document-text',
    to: '/admin/posts',
  },
  {
    label: 'Media Library',
    icon: 'i-heroicons-photo',
    to: '/admin/media',
  },
  {
    label: 'Members',
    icon: 'i-heroicons-users',
    to: '/admin/members',
  },
]

// Determine current page title based on route
const route = useRoute()
const pageTitle = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path === '/admin/posts') return 'Blog Posts'
  if (route.path.startsWith('/admin/posts/new')) return 'New Blog Post'
  if (route.path.startsWith('/admin/posts/')) return 'Edit Blog Post'
  if (route.path === '/admin/media') return 'Media Library'
  if (route.path === '/admin/members') return 'Members'
  return 'Admin'
})
</script>

<template>
  <div class="min-h-screen">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="w-64 shadow-lg border-b/20 border-1">
        <div class="flex h-16 items-center px-4">
          <NuxtLink class="flex" to="/">
            <NuxtImg
              class="h-8"
              src="/images/ebc_logo_dark.png"
              alt="EBC Logo"
            />
          </NuxtLink>
        </div>
        <nav class="mt-4 px-4">
          <UVerticalNavigation :links="navigationLinks" />
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 overflow-auto">
        <!-- Top Nav -->
        <header
          class="sticky top-0 z-10 flex h-16 items-center justify-between px-6 shadow-sm"
        >
          <h1 class="text-xl font-medium">
            {{ pageTitle }}
          </h1>
          <div class="flex items-center gap-4">
            <UButton
              to="/"
              color="gray"
              variant="ghost"
              icon="i-heroicons-home"
              size="sm"
            >
              View Site
            </UButton>
            <!-- User dropdown would go here in a real app -->
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
