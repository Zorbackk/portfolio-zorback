<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl font-bold mb-6">{{ page?.hero?.title }}</h1>
            <p class="text-xl text-gray-600 mb-8">{{ page?.hero?.description }}</p>
            <p class="text-lg leading-relaxed">{{ page?.intro?.text }}</p>
          </div>
          
          <div class="flex justify-center">
            <div class="relative">
              <NuxtImg 
                :src="page?.hero?.image || '/images/placeholder-profile.jpg'"
                alt="Photo de profil"
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
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ page?.journey?.title }}</h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            <div 
              v-for="item in page?.journey?.items" 
              :key="item.year"
              class="flex gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UIcon :name="item.icon" class="text-xl text-blue-600" />
                </div>
              </div>
              
              <div class="flex-grow">
                <div class="flex items-center gap-3 mb-2">
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {{ item.year }}
                  </span>
                  <h3 class="text-xl font-bold">{{ item.title }}</h3>
                </div>
                
                <p v-if="item.company" class="text-gray-600 font-medium mb-2">{{ item.company }}</p>
                <p class="text-gray-700">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compétences -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ page?.skills?.title }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="category in page?.skills?.categories" 
            :key="category.name"
            class="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-3 mb-6">
              <div :class="`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`">
                <UIcon :name="category.icon" :class="`text-xl text-${category.color}-600`" />
              </div>
              <h3 class="text-xl font-bold">{{ category.name }}</h3>
            </div>
            
            <div class="space-y-4">
              <div v-for="skill in category.items" :key="skill.name">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium">{{ skill.name }}</span>
                  <span class="text-sm text-gray-500">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
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
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ page?.values?.title }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="value in page?.values?.items" 
            :key="value.title"
            class="p-6 bg-white rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
          >
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon :name="value.icon" class="text-2xl text-blue-600" />
            </div>
            <h3 class="text-lg font-bold mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Hobbies -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ page?.hobbies?.title }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div 
            v-for="hobby in page?.hobbies?.items" 
            :key="hobby.name"
            class="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all hover:scale-105"
          >
            <UIcon :name="hobby.icon" class="text-3xl text-purple-600 mb-4" />
            <h3 class="text-lg font-bold mb-2">{{ hobby.name }}</h3>
            <p class="text-gray-600 text-sm">{{ hobby.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ page?.cta?.title }}</h2>
        <p class="text-xl mb-8 opacity-90">{{ page?.cta?.description }}</p>
        
        <UButton 
          :to="page?.cta?.button?.to"
          variant="white"
          size="xl"
          icon="i-heroicons-chat-bubble-left-right"
        >
          {{ page?.cta?.button?.text }}
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Récupération du contenu
const { data: page } = await useAsyncData('about-page', () => {
  return queryContent('/about').findOne()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page à propos introuvable'
  })
}

// SEO
useSeoMeta({
  title: page.value.title || 'À propos - Alex',
  description: page.value.description
})
</script>
