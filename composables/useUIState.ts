export const isHeaderDialogOpenState = () =>
  useState('isHeaderDialogOpen', () => false)
export const isContentSearchModalOpenState = () =>
  useState('isContentSearchModalOpen', () => false)
export const isDashboardSidebarSlidoverOpenState = () =>
  useState('isDashboardSidebarSlidoverOpen', () => false)
export const isDashboardSearchModalOpenState = () =>
  useState('isDashboardSearchModalOpen', () => false)

export const useUIState = () => {
  const route = useRoute()

  const isHeaderDialogOpen = isHeaderDialogOpenState()
  const isContentSearchModalOpen = isContentSearchModalOpenState()
  const isDashboardSidebarSlidoverOpen = isDashboardSidebarSlidoverOpenState()
  const isDashboardSearchModalOpen = isDashboardSearchModalOpenState()

  function toggleContentSearch() {
    if (isHeaderDialogOpen.value) {
      isHeaderDialogOpen.value = false

      setTimeout(() => {
        isContentSearchModalOpen.value = !isContentSearchModalOpen.value
      }, 0)

      return
    }

    isContentSearchModalOpen.value = !isContentSearchModalOpen.value
  }

  function toggleDashboardSearch() {
    if (isDashboardSidebarSlidoverOpen.value) {
      isDashboardSidebarSlidoverOpen.value = false

      setTimeout(() => {
        isDashboardSearchModalOpen.value = !isDashboardSearchModalOpen.value
      }, 200)

      return
    }

    isDashboardSearchModalOpen.value = !isDashboardSearchModalOpen.value
  }

  watch(
    () => route.path,
    () => {
      isDashboardSidebarSlidoverOpen.value = false
    }
  )

  return {
    toggleContentSearch,
    toggleDashboardSearch,
  }
}
