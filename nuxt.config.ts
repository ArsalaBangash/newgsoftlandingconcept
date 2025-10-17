// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-16',

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
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
