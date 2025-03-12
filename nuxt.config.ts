export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },

  modules: [
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],

  nitro: {
    preset: process.env.NITRO_PRESET,
  },

  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },

  components: [
    { path: '~/components/sections', extensions: ['.vue'], pathPrefix: false },
    { path: '~/components/units', extensions: ['.vue'], pathPrefix: false },
    '~/components',
  ],

  css: ['~/assets/css/main.css', '@splidejs/vue-splide/css'],

  build: {
    transpile: ['@splidejs/vue-splide', '@sendgrid/mail'],
  },

  vue: {
    propsDestructure: true,
  },

  experimental: {
    viewTransition: true,
    clientNodeCompat: true,
    asyncContext: true,
  },

  image: {
    densities: [1, 2],
    format: ['avif', 'webp', 'jpeg', 'png'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
    domains: ['unsplash.com'],
  },

  vite: {
    optimizeDeps: {
      exclude: ['@prisma/client'],
    },
    resolve: {
      alias: {
        '.prisma/client/index-browser':
          './node_modules/.prisma/client/index-browser.js',
      },
    },
    ssr: {
      external: ['@prisma/client'],
    },
  },

  compatibilityDate: '2025-03-12',
})
