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
    <!-- 🔥 HERO SECTION TECH - SANS PARTICULES -->
    <section class="relative min-h-screen tech-bg grid-pattern flex items-center overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          
          <!-- Photo Tech (si elle existe) -->
          <div class="mb-8" v-if="page.hero?.image">
            <div class="relative inline-block">
              <div class="w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 mx-auto relative">
                <!-- Cadre tech autour de la photo -->
                <div class="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse"></div>
                <div class="absolute inset-2 rounded-full border border-purple-400 opacity-60"></div>
                
<NuxtImg 
  :src="page.hero.image" 
  :alt="`Portrait de ${page.hero?.name || 'Alex'}`"
  class="w-full h-full rounded-full object-cover shadow-2xl relative z-10"
/>
                
                <!-- Coins tech -->
                <div class="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
                <div class="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-400"></div>
              </div>
            </div>
          </div>

          <!-- Titre avec effet tech -->
          <div class="mb-8">
            
            <h1 class="font-tech text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              {{ locale === 'fr' ? 'Salut, c\'est' : 'Hi, I\'m' }} 
              <span class="gradient-text pulse-neon">
                {{ page.hero?.name || 'Alex' }}
              </span>
  
            </h1>
            
            <!-- Ligne de séparation tech -->
            <div class="flex justify-center items-center space-x-4 mb-6">
              <div class="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div class="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <div class="h-px w-20 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>

          <!-- Subtitle Tech -->
<h2 class="font-tech text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
  <span class="text-purple-400">></span> {{ page.hero?.title || 'Développeur Full-Stack' }}
</h2>

<p class="font-mono text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
  {{ page.hero?.description || 'Passionné par la création d\'expériences web modernes' }}
</p>

          <!-- Boutons Tech -->
<div class="flex flex-col sm:flex-row gap-6 justify-center mb-12" v-if="page.hero?.buttons && page.hero.buttons.length > 0">
<UButton 
  v-for="(button, index) in page.hero.buttons"
  :key="index"
  :to="button.to"
  :variant="button.variant || 'solid'"
  size="lg"
  class="group glow-box font-tech 
        text-gray-700 hover:text-white hover:bg-gray-700 
         border border-fray-700
         dark:text-cyan-400 dark:hover:text-black dark:hover:bg-cyan-400 
         dark:border-cyan-400
         transition-all duration-300 glitch"
>
    <template #leading>
      <UIcon name="i-heroicons-arrow-right" class="group-hover:translate-x-1 transition-transform" />
    </template>
    {{ button.text }}
  </UButton>
</div>

          <!-- Boutons fallback -->
          <div v-else class="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button class="group glow-box px-8 py-4 rounded-lg font-tech font-semibold text-cyan-400 hover:text-black hover:bg-cyan-400 transition-all duration-300 glitch border border-cyan-400">
              <span class="flex items-center justify-center gap-2">
                {{ locale === 'fr' ? 'Me connaître' : 'Know me' }}
                <span class="text-lg">🚀</span>
              </span>
            </button>

            <button class="group glow-box px-8 py-4 rounded-lg font-tech font-semibold text-cyan-400 hover:text-black hover:bg-cyan-400 transition-all duration-300 glitch border border-cyan-400">
              <span class="flex items-center justify-center gap-2">
                {{ locale === 'fr' ? 'Voir mes projets' : 'View my projects' }}
                <span class="text-lg">🚀</span>
              </span>
            </button>
            
            <button class="group border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-lg font-tech transition-all duration-300">
              <span class="flex items-center justify-center gap-2">
                {{ locale === 'fr' ? 'Me contacter' : 'Contact me' }}
                <span class="text-lg">📧</span>
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- 🔧 TECHNOLOGIES SECTION AVEC COMPONENT -->
<section class="py-20 tech-bg" v-if="page.technologies?.items && page.technologies.items.length > 0">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-tech text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ page.technologies?.title || 'Technologies' }}
      </h2>
      <div class="w-24 h-px bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
    </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <TechCard 
            v-for="(tech, index) in page.technologies.items"
            :key="index"
            :tech="tech"
            :index="index"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
}

.animate-wave {
  animation: wave 1s ease-in-out;
}

.animate-wave:hover {
  animation: wave 0.6s ease-in-out infinite;
}
</style>
