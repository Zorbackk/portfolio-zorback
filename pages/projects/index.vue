<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryContent('/projects').findOne()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page projets introuvable'
  })
}

useSeoMeta({
  title: page.value.title || 'Mes Projets - Alex',
  description: page.value.description
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="py-20 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">{{ page?.hero?.title }}</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ page?.hero?.description }}
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in page?.projects" 
            :key="project.title"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <!-- Image -->
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <UIcon name="i-heroicons-photo" class="text-4xl text-gray-400" />
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-semibold">{{ project.title }}</h3>
                <UBadge 
                  :color="project.status === 'completed' ? 'green' : 'yellow'"
                  size="xs"
                >
                  {{ project.status === 'completed' ? 'Terminé' : 'En cours' }}
                </UBadge>
              </div>
              
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              
              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                <UBadge 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  variant="soft"
                  size="xs"
                >
                  {{ tech }}
                </UBadge>
              </div>
              
              <!-- Links -->
              <div class="flex gap-3">
                <UButton 
                  v-if="project.github"
                  :to="project.github"
                  target="_blank"
                  variant="outline"
                  size="sm"
                  icon="i-simple-icons-github"
                >
                  Code
                </UButton>
                
                <UButton 
                  v-if="project.live"
                  :to="project.live"
                  target="_blank"
                  size="sm"
                  icon="i-heroicons-arrow-top-right-on-square"
                >
                  Demo
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>