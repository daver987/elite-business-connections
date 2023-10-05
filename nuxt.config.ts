// https://nuxt.com/docs/api/configuration/nuxt-config
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
  components: [
    { path: '~/components/sections', extensions: ['.vue'], pathPrefix: false },
    { path: '~/components/units', extensions: ['.vue'], pathPrefix: false },
    '~/components',
  ],
  css: ['~/assets/css/main.css', '@splidejs/vue-splide/css'],
  build: {
    transpile: ['@splidejs/vue-splide'],
  },
  vue: {
    propsDestructure: true,
    defineModel: true,
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
  },
  runtimeConfig: {
    CONTENT_DELIVERY_ACCESS_TOKEN: process.env.CONTENT_DELIVERY_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  },
})
