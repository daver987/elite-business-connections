/**
 * Interface for API responses from page content endpoints
 */
interface PageContentResponse<T> {
  statusCode: number
  data?: T
  error?: string
  message?: string
}

/**
 * Composable to fetch and manage page content from the CMS
 *
 * For simple cases, use useFetch directly in the component:
 * const { data } = await useFetch('/api/pages/home/testimonials')
 *
 * For more complex scenarios or when you need more control, use this composable with lazy option:
 * const { content, pending, refresh } = usePageContent('home', 'stats', defaultStats, { lazy: true })
 */
export const usePageContent = <T>(
  pageId: string,
  sectionId: string,
  defaultContent: T,
  options: { lazy?: boolean } = {}
) => {
  // Use useAsyncData for more control over the data fetching process
  const {
    data: apiResponse,
    pending,
    refresh,
    error,
    status,
  } = useAsyncData<PageContentResponse<T>>(
    `page-content-${pageId}-${sectionId}`,
    async () => {
      try {
        const response = await $fetch<PageContentResponse<T>>(
          `/api/pages/${pageId}/${sectionId}`
        )
        return response
      } catch (error) {
        console.error(`Error fetching ${pageId}/${sectionId} content:`, error)
        return {
          statusCode: 500,
          error: 'Failed to fetch content',
        }
      }
    },
    {
      lazy: options.lazy ?? false, // Only use lazy loading if explicitly requested
      default: () => ({
        statusCode: 200,
        data: defaultContent,
      }),
    }
  )

  // Create a computed property that handles the extraction of data with fallback
  const content = computed(() =>
    apiResponse.value?.data && apiResponse.value.statusCode === 200
      ? apiResponse.value.data
      : defaultContent
  )

  return {
    content,
    apiResponse, // For cases where the full response is needed
    pending, // Only relevant when lazy is true
    refresh,
    error,
    status,
  }
}
