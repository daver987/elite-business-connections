<script setup lang="ts">
definePageMeta({
  layout: 'portal',
})
const links = [
  [
    {
      label: 'Active Referrals',
      icon: 'i-heroicons-user-circle',
      to: '/portal/referrals',
      exact: true,
    },
    {
      label: 'Closed Business',
      icon: 'i-heroicons-user-group',
      to: '/portal/referrals/closed',
    },
    {
      label: 'Business Referrals',
      icon: 'i-heroicons-clock',
      to: '/portal/referrals/business',
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
      <UDashboardNavbar title="Settings" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
