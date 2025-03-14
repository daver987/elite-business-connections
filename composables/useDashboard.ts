import { createSharedComposable } from '@vueuse/core'

export const isNotificationsSlideoverOpenState = () =>
  useState('isNotificationsSlideoverOpen', () => false)
export const isHelpSlideoverOpenState = () =>
  useState('isHelpSlideoverOpen', () => false)

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isNotificationsSlideoverOpen = isNotificationsSlideoverOpenState()
  const isHelpSlideoverOpen = isHelpSlideoverOpenState()

  const navigateHome = () => router.push('/portal')
  const navigateInbox = () => router.push('/portal/inbox')
  const navigateUsers = () => router.push('/portal/users')
  const navigateSettings = () => router.push('/portal/settings')

  const openHelp = () => {
    isHelpSlideoverOpen.value = true
  }

  const openNotifications = () => {
    isNotificationsSlideoverOpen.value = true
  }

  const handleRouteChange = () => {
    isHelpSlideoverOpen.value = false
    isNotificationsSlideoverOpen.value = false
  }

  defineShortcuts({
    'g-h': navigateHome,
    'g-i': navigateInbox,
    'g-u': navigateUsers,
    'g-s': navigateSettings,
    '?': openHelp,
    n: openNotifications,
  })

  watch(() => route.fullPath, handleRouteChange)
}

export const useDashboard = createSharedComposable(_useDashboard)
