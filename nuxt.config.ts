
export default defineNuxtConfig({

  compatibilityDate: '2025-07-30',
  // Modules installés
  modules: [
    '@nuxt/ui',
    '@nuxt/content', 
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint'
  ],

  // SEO et métadonnées
  app: {
    // baseURL: '/portfolio-zorback/',
    head: {
      title: 'Alex - Portfolio Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio d\'Alex, développeur full-stack passionné' },
        { name: 'keywords', content: 'développeur, vue.js, nuxt, portfolio, Java, Spring Boot, React' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

    // Mode statique
nitro: {
  prerender: {
    crawlLinks: true,    // ← Génère toutes les pages
    routes: ['/']        // ← Force la génération de l'accueil
  }
},

  // Configuration des images
  image: {
    quality: 80,
    format: ['webp']
  },

  // Mode de rendu
  ssr: true, 

  // TypeScript
  typescript: {
    typeCheck: true
  }
})
