export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'cool',
    button: {
      variant: {
        'color': {
          'white': {
            'solid': 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-primary-500 hover:bg-primary-600 disabled:bg-white dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
            'ghost': 'text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          },
        },
      },
      formGroup: {
        help: 'text-xs',
        'container': 'mt-1 mb-3 relative',
      },
      notifications: {
        position: 'top-0 bottom-auto',
      },
    },
  },
})
