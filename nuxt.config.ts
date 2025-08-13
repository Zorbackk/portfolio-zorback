export default defineNuxtConfig({
  compatibilityDate: '2025-08-05',
  
  modules: [
    '@nuxt/ui',
    '@nuxt/content', 
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/i18n',
  ],

  app: {
    baseURL: '/portfolio-zorback/',
    head: {
      title: 'Alex - Développeur Full-Stack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio d\'Alex, développeur full-stack spécialisé en Vue.js, Java Spring Boot et technologies modernes' },
        { name: 'keywords', content: 'développeur full-stack, vue.js, nuxt, java, spring boot, react, portfolio' },
        { name: 'author', content: 'Alex' },
        { property: 'og:title', content: 'Alex - Développeur Full-Stack' },
        { property: 'og:description', content: 'Portfolio d\'Alex, développeur full-stack passionné' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },

  plugins: [
    '~/plugins/i18n-persistence.client.ts' 
  ],

  i18n: {
    locales: [
      { 
        code: 'fr', 
        name: 'Français',
        file: 'fr.json'
      },
      { 
        code: 'en', 
        name: 'English', 
        file: 'en.json'
      }
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix', 
    detectBrowserLanguage: {
      useCookie: false, 
      redirectOn: 'no prefix' 
    }
  },

  // 🎯 CHANGEMENTS ICI !
  ssr: true,  // ← Change ça !
  
  nitro: {
    prerender: {
      routes: [
        '/',
        '/about', 
        '/contact',
        '/projects'
      ]
    },
  },

  // 🎯 AJOUTE ÇA !
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true }, 
    '/projects': { prerender: true }
  },

  ui: {
    global: true
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  image: {
    quality: 80,
    formats: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },

  typescript: {
    typeCheck: false
  }
})
