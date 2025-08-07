<script setup lang="ts">
const { locale } = useI18n()

// 🔧 Récupère le contenu selon la locale
const { data: page, refresh } = await useAsyncData(`homepage-${locale.value}`, () => {
  return queryContent(`/${locale.value}`).findOne()
})

// 🎯 Recharge quand la langue change
watch(locale, async () => {
  await refresh()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page introuvable'
  })
}

// SEO
useSeoMeta({
  title: page.value.seo?.title || 'Portfolio Alex',
  description: page.value.seo?.description || 'Développeur Full-Stack'
})
</script>

<template> 
  <div v-if="page">
    <!-- 🎯 HERO SECTION -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-4xl mx-auto px-4 text-center">
        
        <!-- Photo -->
        <div class="mb-8" v-if="page.hero?.image">
            <img 
              :src="page.hero.image" 
              :alt="`Portrait de ${page.hero?.name || 'Alex'}`"
              class="w-32 md:w-48 lg:w-64 rounded-full mx-auto shadow-lg object-cover"
            >
        </div>

        <!-- Titre avec salutation dynamique -->
        <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          {{ locale === 'fr' ? 'Salut, c\'est' : 'Hi, I\'m' }} 
          <span class="text-blue-600 dark:text-blue-400">
            {{ page.hero?.name || 'Alex' }}
          </span> 👋
        </h1>

        <!-- Subtitle -->
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {{ page.hero?.title || 'Développeur Full-Stack' }}
        </h2>

        <!-- Description -->
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {{ page.hero?.description || 'Passionné par la création d\'expériences web modernes' }}
        </p>

        <!-- Boutons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center" v-if="page.hero?.buttons && page.hero.buttons.length > 0">
          <UButton 
            v-for="(button, index) in page.hero.buttons"
            :key="index"
            :to="button.to"
            :variant="button.variant"
            size="xl" 
            class="px-8 py-4 text-lg"
          >
            {{ button.text }}
          </UButton>
        </div>

        <!-- Boutons fallback -->
        <div v-else class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton to="/projects" variant="solid" size="xl" class="px-8 py-4 text-lg">
            {{ locale === 'fr' ? 'Voir mes projets 🚀' : 'View my projects 🚀' }}
          </UButton>
          <UButton to="/contact" variant="outline" size="xl" class="px-8 py-4 text-lg">
            {{ locale === 'fr' ? 'Me contacter 📧' : 'Contact me 📧' }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- 🔧 TECHNOLOGIES SECTION -->
    <section class="py-20 bg-white dark:bg-gray-900" v-if="page.technologies?.items && page.technologies.items.length > 0">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ page.technologies?.title || 'Technologies' }}
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          <div 
            v-for="(tech, index) in page.technologies.items"
            :key="index"
            class="group"
          >
            <div class="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800">
              <div class="text-4xl mb-3 text-center">{{ tech.icon || '🔧' }}</div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-center">{{ tech.name || 'Tech' }}</h3>
              <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide block text-center">{{ tech.category || 'tech' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- 🚨 FALLBACK si pas de données -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ locale === 'fr' ? 'Chargement... 🔄' : 'Loading... 🔄' }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ locale === 'fr' ? 'Récupération du contenu en cours' : 'Getting content...' }}
      </p>
    </div>
  </div>
</template>
