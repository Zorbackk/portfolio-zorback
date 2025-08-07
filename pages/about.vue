<script setup lang="ts">
// 🔧 Import nécessaire pour i18n
const { locale } = useI18n()

// 🔧 Récupère le contenu selon la locale
const { data: page, refresh } = await useAsyncData(`about-${locale.value}`, () => {
  return queryContent(`/${locale.value}/about`).findOne()
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
              <NuxtImg 
                :src="page.hero?.image || '/images/placeholder-profile.jpg'"
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

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white" v-if="page.cta">
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
</template>
