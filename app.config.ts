export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'cool',
    button: {
      variant: {
        solid: 'shadow-sm text-white dark:text-white-900 bg-{color}-500 hover:bg-{color}-600 dark:hover:text-white disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400',
      },
    },

  },
})
