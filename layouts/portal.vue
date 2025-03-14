<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const isHelpSlideoverOpen = isHelpSlideoverOpenState()

const sharedLinks = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/portal',
    tooltip: {
      text: 'Dashboard',
      shortcuts: ['G', 'H'],
    },
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: 'i-heroicons-inbox',
    to: '/portal/inbox',
    badge: '4',
    tooltip: {
      text: 'Inbox',
      shortcuts: ['G', 'I'],
    },
  },
  {
    id: 'members',
    label: 'Members',
    icon: 'i-heroicons-user-group',
    to: '/portal/members',
    tooltip: {
      text: 'Members',
      shortcuts: ['G', 'M'],
    },
  },
  {
    id: 'referrals',
    label: 'Referrals',
    icon: 'i-heroicons-arrow-path-rounded-square',
    to: '/portal/referrals',
    children: [
      {
        label: 'Active Referrals',
        to: '/portal/referrals',
        exact: true,
      },
      {
        label: 'Closed Business',
        to: '/portal/referrals/closed',
      },
      {
        label: 'Business Referrals',
        to: '/portal/referrals/business',
      },
    ],
    tooltip: {
      text: 'Referrals',
      shortcuts: ['G', 'R'],
    },
  },
]

const settingsLinks = [
  {
    id: 'settings',
    label: 'Settings',
    to: '/portal/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'Profile',
        to: '/portal/settings',
        exact: true,
      },
      {
        label: 'Members',
        to: '/portal/settings/members',
      },
      {
        label: 'Notifications',
        to: '/portal/settings/notifications',
      },
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S'],
    },
  },
]

const editorLinks = [
  {
    id: 'editor-dashboard',
    label: 'Editor Dashboard',
    icon: 'i-heroicons-pencil-square',
    to: '/portal/editor',
    tooltip: {
      text: 'Editor Dashboard',
      shortcuts: ['G', 'E'],
    },
  },
  {
    id: 'media',
    label: 'Media',
    icon: 'i-heroicons-photo',
    to: '/portal/media',
    tooltip: {
      text: 'Media',
      shortcuts: ['G', 'M'],
    },
  },
  {
    id: 'posts',
    label: 'Posts',
    icon: 'i-heroicons-document-text',
    to: '/portal/posts',
    tooltip: {
      text: 'Referrals',
      shortcuts: ['G', 'R'],
    },
  },
  {
    id: 'editor-settings',
    label: 'Editor Settings',
    to: '/portal/editor/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'Page Editor',
        to: '/portal/editor/page-editor',
        exact: true,
      },
      {
        label: 'Post Editor',
        to: '/portal/editor/post-editor',
      },
      {
        label: 'Media Editor',
        to: '/portal/editor/media-editor',
      },
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S'],
    },
  },
]

const adminLinks = [
  {
    id: 'admin-dashboard',
    label: 'Admin Dashboard',
    icon: 'i-heroicons-home',
    to: '/portal/admin',
    tooltip: {
      text: 'Admin Dashboard',
      shortcuts: ['G', 'A'],
    },
  },
  {
    id: 'members',
    label: 'Members',
    icon: 'i-heroicons-user-group',
    to: '/portal/members',
    tooltip: {
      text: 'Members',
      shortcuts: ['G', 'M'],
    },
  },
  {
    id: 'admin-settings',
    label: 'Admin Settings',
    to: '/portal/admin/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'Site Settings',
        to: '/portal/admin/settings',
        exact: true,
      },
      {
        label: 'Member Approval',
        to: '/portal/admin/members',
      },
      {
        label: 'Security',
        to: '/portal/admin/security',
      },
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S'],
    },
  },
]

const footerLinks = [
  {
    label: 'Invite people',
    icon: 'i-heroicons-plus',
    to: '/portal/settings/members',
  },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => {
      isHelpSlideoverOpen.value = true
    },
  },
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: sharedLinks.map((link) => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts,
    })),
  },
  {
    key: 'help',
    label: 'Help',
    commands: [
      {
        id: 'support',
        label: 'Get support',
        icon: 'i-heroicons-lifebuoy',
        click: () => {
          window.open('mailto:support@elitebusinessconnections.com', '_blank')
        },
      },
    ],
  },
]

// const defaultColors = ref(
//   ['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map((color) => ({
//     label: color,
//     chip: color,
//     click: () => {
//       appConfig.ui.primary = color
//     },
//   }))
// )
// const colors = computed(() =>
//   defaultColors.value.map((color) => ({
//     ...color,
//     active: appConfig.ui.primary === color.label,
//   }))
// )
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="sharedLinks" />

        <UDivider />

        <UDashboardSidebarLinks :links="settingsLinks" />

        <!-- <UDivider /> -->

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="(colors) => (defaultColors = colors)"
        /> -->

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
