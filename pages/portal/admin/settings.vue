<script setup lang="ts">
definePageMeta({
  layout: 'portal',
})
const links = [
  [
    {
      label: 'Admin Settings',
      icon: 'i-heroicons-user-circle',
      to: '/portal/admin/settings',
      exact: true,
    },
    {
      label: 'Members',
      icon: 'i-heroicons-user-group',
      to: '/portal/admin/settings/members',
    },
    {
      label: 'Security',
      icon: 'i-heroicons-lock-closed',
      to: '/portal/admin/settings/security',
    },
  ],
  [
    {
      label: 'Help & Support',
      icon: 'i-heroicons-lifebuoy',
      to: 'mailto:support@elitebusinessconnections.com',
      target: '_blank',
    },
  ],
]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Admin Settings" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
