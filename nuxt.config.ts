// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ],

  compatibilityDate: '2025-04-02',
})