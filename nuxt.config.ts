// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-16',

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/seo'
  ],


  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  nitro: {
    preset: 'netlify',
    alias: {
      'tailwindcss/colors': 'tailwindcss/colors.js'
    },
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      }
    ]
  },

  content: {
    experimental: {
      search: false
    }
  },

  i18n: {
    // Set up English as the default locale
    locales: [{ code: 'en', name: 'English' }],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  site: {
    url: 'https://grey.software',
    name: 'Grey Software',
    description: 'Open Products, Open Education! Curated software development resources.',
    defaultLocale: 'en',
  },

  devtools: { enabled: false }
})
