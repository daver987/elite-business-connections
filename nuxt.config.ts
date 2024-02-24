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
    'nuxt-icon',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/ui',
    [
      '@nuxtjs/sanity',
      {
        projectId: '1bmrd0be',
        dataset: 'production',
        apiVersion: '2023-10-04',
      },
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: true,
        },
      },
    ],
  ],
  nitro: {
    preset: process.env.NITRO_PRESET,
  },
  runtimeConfig: {
    DIRECTUS_SERVER_TOKEN: process.env.DIRECTUS_SERVER_TOKEN,
    DIRECTUS_URL: process.env.DIRECTUS_URL,
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
  tailwindcss: {
    viewer: false,
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
    sanity: {
      projectId: '1bmrd0be',
      dataset: 'production',
    },
  },
})
