<script setup lang="ts">
type UserRole = 'member' | 'editor' | 'admin'
type BasePortal = {
  id: string
  label: string
  avatar: {
    src: string
  }
  requiredRole: UserRole
}

type PortalWithClick = BasePortal & {
  click: () => void
}

type Action = {
  label: string
  icon: string
  click: () => void
}

// Mock auth function - to be replaced with actual auth later
const mockUserRole = ref<UserRole>('member')

// Available portals configuration
const allPortals: BasePortal[] = [
  {
    id: 'member-portal',
    label: 'EBC Member Portal',
    avatar: {
      src: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', // User/member icon
    },
    requiredRole: 'member',
  },
  {
    id: 'admin-portal',
    label: 'EBC Admin Portal',
    avatar: {
      src: 'https://cdn-icons-png.flaticon.com/512/2206/2206248.png', // Admin/settings gear icon
    },
    requiredRole: 'admin',
  },
  {
    id: 'content-editor',
    label: 'EBC Content Editor',
    avatar: {
      src: 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png', // Edit/pencil icon
    },
    requiredRole: 'editor',
  },
]

// Role access mapping
const roleAccess: Record<UserRole, string[]> = {
  member: ['member-portal'],
  editor: ['member-portal', 'content-editor'],
  admin: ['member-portal', 'admin-portal', 'content-editor'],
}

// Computed available portals based on user role
const availablePortals = computed<PortalWithClick[]>(() => {
  const allowedPortalIds = roleAccess[mockUserRole.value] || []
  return allPortals
    .filter((portal) => allowedPortalIds.includes(portal.id))
    .map((portal) => ({
      ...portal,
      click: () => {
        selectedPortal.value = portal
      },
    }))
})

// Actions available to all users plus admin-specific actions
const managementActions = computed<Action[]>(() => {
  const actions: Action[] = [
    {
      label: 'Back to Website',
      icon: 'i-heroicons-home',
      click: () => {
        // This can be replaced with actual navigation logic
        window.location.href = '/'
      },
    },
  ]

  if (mockUserRole.value === 'admin') {
    actions.push({
      label: 'Manage Portals',
      icon: 'i-heroicons-cog-8-tooth',
      click: () => {
        // This can be replaced with actual portal management logic
        console.log('Opening portal management')
      },
    })
  }

  return actions
})

// Initialize with first available portal
const selectedPortal = ref<BasePortal | null>(availablePortals.value[0] || null)
</script>

<template>
  <UDropdown
    class="w-full"
    v-slot="{ open }"
    mode="hover"
    :items="[availablePortals, managementActions]"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      class="w-full"
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
    >
      <UAvatar
        v-if="selectedPortal"
        :src="selectedPortal.avatar.src"
        size="2xs"
      />

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{
        selectedPortal?.label || 'Select Portal'
      }}</span>
    </UButton>
  </UDropdown>
</template>
