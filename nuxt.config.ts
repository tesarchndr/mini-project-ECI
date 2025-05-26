// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/fonts', '@nuxtjs/tailwindcss'],
   tailwindcss: {
    config: {
      content: [
        'content/**/**.md'
      ]
    },
    editorSupport: true
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap'
        }
      ]
    }
  }
})