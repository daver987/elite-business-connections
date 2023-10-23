import { defineFormKitConfig } from '@formkit/vue'
// import { generateClasses } from '@formkit/themes'
import '@formkit/themes/genesis'
import { genesisIcons } from '@formkit/icons'
// import { tailwindTheme } from './tailwind-theme.js'
import { createProPlugin, inputs } from '@formkit/pro'

export default defineFormKitConfig(() => {
  // here we can access `useRuntimeConfig` because
  // Nuxt will call our function.
  // const config = useRuntimeConfig()

  // and we can use the variables to import secrets.
  //
  // ⚠️ this is just an example — if you want to use FormKit Pro,
  // you will need to install the @formkit/pro-dependency.
  const pro = createProPlugin('fk-750f4261f3', inputs)

  return {
    plugins: [pro],
    icons: { ...genesisIcons },
    // config: {
    //   classes: generateClasses(tailwindTheme),
    // },
  }
})
