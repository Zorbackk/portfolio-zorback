<script setup lang="ts">
// 🔧 Import nécessaire pour i18n
const { locale } = useI18n()

// 🔧 Récupère le contenu selon la locale
const { data: page, refresh } = await useAsyncData(`about-${locale.value}`, () => {
  return queryContent(`/${locale.value}/about`).findOne()
})

// 🔧 Récupère le contenu des services selon la locale
const { data: servicesData, refresh: refreshServices } = await useAsyncData(`services-${locale.value}`, () => {
  return queryContent(`/${locale.value}/services`).findOne()
})

// 🎯 Recharge quand la langue change
watch(locale, async () => {
  await refresh()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

// SEO
useSeoMeta({
  title: page.value.title || 'About',
  description: page.value.description || 'About Alex'
})

// Modal CV
const openModal = ref(false)

// Gestion du scroll quand modal ouverte
watch(openModal, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

</script>

<template>
  <div class="min-h-screen" v-if="page">
<!-- Hero Section -->
<section class="py-20">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-4xl font-bold mb-6">{{ page.hero?.title }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">{{ page.hero?.description }}</p>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{{ page.intro?.text }}</p>
      </div>
      
      <div class="flex justify-center">
        <div class="relative">
<!-- CV stylisé cliquable -->
<div 
  class="cursor-pointer group"
  @click="openModal = true"
  v-if="page.hero?.cv"
>
  <div class="relative">
    <div class="w-80 h-96 bg-white rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200">
      <!-- Header du "document" -->
      <div class="h-16 bg-blue-500 rounded-t-xl flex items-center justify-center">
        <UIcon name="i-heroicons-user-circle" class="text-3xl text-white mr-2" />
        <span class="text-white font-bold">CV</span>
      </div>
      
      <!-- "Lignes" du document -->
      <div class="p-6 space-y-3">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-300 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      
      <!-- Badge "Click" -->
      <div class="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm group-hover:bg-blue-600">
        {{ locale === 'fr' ? 'Voir' : 'View' }}
      </div>
    </div>
  </div>
</div>
          
          <!-- Fallback si pas de CV -->
          <div v-else>
            <NuxtImg 
              src="/images/placeholder-profile.jpg"
              :alt="locale === 'fr' ? 'Photo de profil' : 'Profile picture'"
              class="w-80 h-80 rounded-2xl object-cover shadow-2xl"
              width="320"
              height="320"
            />
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center">
              <UIcon name="i-heroicons-code-bracket" class="text-3xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bouton téléchargement CV -->
    <div class="text-center mt-12" v-if="page.hero?.cv">
      <UButton 
        :to="page.hero.cv.pdf"
        target="_blank"
        variant="outline"
        size="lg"
        icon="i-heroicons-arrow-down-tray"
        class="group"
      >
        {{ locale === 'fr' ? 'Télécharger mon CV' : 'Download my CV' }}
      </UButton>
    </div>
  </div>
</section>

    <!-- Parcours -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800" v-if="page.journey?.items">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ page.journey.title }}
        </h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            <div 
              v-for="item in page.journey.items" 
              :key="item.year"
              class="flex gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <UIcon :name="item.icon" class="text-xl text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <div class="flex-grow">
                <div class="flex items-center gap-3 mb-2">
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full">
                    {{ item.year }}
                  </span>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ item.title }}</h3>
                </div>
                
                <p v-if="item.company" class="text-gray-600 dark:text-gray-400 font-medium mb-2">{{ item.company }}</p>
                <p class="text-gray-700 dark:text-gray-300">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compétences -->
    <section class="py-16" v-if="page.skills?.categories">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ page.skills.title }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="category in page.skills.categories" 
            :key="category.name"
            class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-3 mb-6">
              <div :class="`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900 rounded-lg flex items-center justify-center`">
                <UIcon :name="category.icon" :class="`text-xl text-${category.color}-600 dark:text-${category.color}-400`" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h3>
            </div>
            
            <div class="space-y-4">
              <div v-for="skill in category.items" :key="skill.name">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">{{ skill.name }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    :class="`h-2 bg-${category.color}-500 rounded-full transition-all duration-1000`"
                    :style="`width: ${skill.level}%`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Valeurs -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800" v-if="page.values?.items">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ page.values.title }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="value in page.values.items" 
            :key="value.title"
            class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
          >
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon :name="value.icon" class="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-lg font-bold mb-3 text-gray-900 dark:text-white">{{ value.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Hobbies -->
    <section class="py-16" v-if="page.hobbies?.items">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ page.hobbies.title }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div 
            v-for="hobby in page.hobbies.items" 
            :key="hobby.name"
            class="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl hover:shadow-md transition-all hover:scale-105"
          >
            <UIcon :name="hobby.icon" class="text-3xl text-purple-600 dark:text-purple-400 mb-4" />
            <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">{{ hobby.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ hobby.description }}</p>
          </div>
        </div>
      </div>
    </section>

<!-- Section Services + CTA combinée -->
<section class="py-16">
  <!-- Services d'abord -->
  <div v-if="servicesData?.services" class="mb-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        {{ servicesData.title }}
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <ServiceCard
          v-for="service in servicesData.services"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </div>

  <!-- CTA en dessous avec fond coloré -->
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16" v-if="page.cta">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">{{ page.cta.title }}</h2>
      <p class="text-xl mb-8 opacity-90">{{ page.cta.description }}</p>
      
      <UButton 
        :to="page.cta.button?.to"
        variant="white"
        size="xl"
        icon="i-heroicons-chat-bubble-left-right"
      >
        {{ page.cta.button?.text }}
      </UButton>
    </div>
  </div>
</section>
  </div>

  <!-- Loading fallback -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ locale === 'fr' ? 'Chargement... 🔄' : 'Loading... 🔄' }}
      </h1>
    </div>
  </div>

<!-- Modal CV -->
<div 
  v-if="openModal" 
  class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
  @click="openModal = false"
>
  <!-- Contenu de la modal -->
  <div 
    class="relative w-full max-w-5xl max-h-full flex flex-col items-center"
    @click.stop
  >
    <!-- Header modal avec boutons -->
    <div class="flex justify-between items-center w-full mb-4">
      <h3 class="text-white text-xl font-semibold">
        {{ page?.hero?.cv?.alt }}
      </h3>
      
      <div class="flex gap-4">
        <!-- Bouton télécharger -->
        <UButton 
          :to="page?.hero?.cv?.pdf"
          target="_blank"
          variant="white"
          size="sm"
          icon="i-heroicons-arrow-down-tray"
        >
          {{ locale === 'fr' ? 'Télécharger' : 'Download' }}
        </UButton>
        
        <!-- Bouton fermer -->
        <button 
          @click="openModal = false"
          class="text-white hover:text-gray-300 transition-colors text-2xl"
        >
          ✕
        </button>
      </div>
    </div>
    
    <!-- CV agrandi -->
    <div class="w-full flex justify-center overflow-auto">
      <img 
      :src="page?.hero?.cv?.preview" 
      :alt="page?.hero?.cv?.alt"
        class="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
      >
    </div>
    
    <!-- Instructions -->
    <p class="text-gray-300 text-sm mt-4 text-center">
      {{ locale === 'fr' ? 'Cliquez en dehors ou appuyez sur Échap pour fermer' : 'Click outside or press Escape to close' }}
    </p>
  </div>
</div>
</template>
