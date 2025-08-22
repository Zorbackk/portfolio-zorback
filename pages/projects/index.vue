<script setup lang="ts">
// 🔧 Interfaces TypeScript
interface ProjectPdf {
  title: string;
  file: string;
}

interface Project {
  title: string;
  description: string;
  image?: string;
  status: 'completed' | 'in-progress';
  technologies: string[];
  github?: string;
  live?: string;
  pdf?: ProjectPdf; // ← Optionnel
}

interface PageData {
  title: string;
  description?: string;
  hero?: {
    title: string;
    description: string;
  };
  projects?: Project[];
}

const { locale } = useI18n()

// 🔧 Récupère le contenu selon la locale
const { data: page, refresh } = await useAsyncData(`projects-${locale.value}`, () => {
  return queryContent(`/${locale.value}/projects`).findOne()
}) as { data: Ref<PageData>, refresh: () => Promise<void> }

// 🎯 Recharge quand la langue change
watch(locale, async () => {
  await refresh()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: locale.value === 'fr' ? 'Page projets introuvable' : 'Projects page not found'
  })
}

useSeoMeta({
  title: page.value.title || (locale.value === 'fr' ? 'Mes Projets - Alex' : 'My Projects - Alex'),
  description: page.value.description
})
</script>

<template>
  <div class="min-h-screen" v-if="page">
    <!-- Hero Section -->
    <section class="py-20 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{{ page.hero?.title }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ page.hero?.description }}
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-16" v-if="page.projects && page.projects.length > 0">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(project, index) in (page.projects as Project[])" 
            :key="`project-${index}-${project.title}`"
            class="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <!-- Image -->
            <div class="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
              <NuxtImg 
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
                width="400"
                height="200"
              />
              <UIcon v-else name="i-heroicons-photo" class="text-4xl text-gray-400" />

              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-blue-600 opacity-0 hover:opacity-20 transition-opacity"></div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
                <UBadge 
                  :color="project.status === 'completed' ? 'green' : 'yellow'"
                  size="xs"
                >
                  {{ project.status === 'completed' 
                    ? (locale === 'fr' ? 'Terminé' : 'Completed') 
                    : (locale === 'fr' ? 'En cours' : 'In Progress') 
                  }}
                </UBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{{ project.description }}</p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                <UBadge 
                  v-for="(tech, techIndex) in project.technologies" 
                  :key="`tech-${techIndex}-${tech}`"
                  variant="soft"
                  size="xs"
                  color="blue"
                >
                  {{ tech }}
                </UBadge>
              </div>

              <!-- Links -->
              <div class="flex flex-col gap-3">
                <!-- Première ligne : GitHub + Live -->
                <div class="flex gap-3">
                  <UButton 
                    v-if="project.github"
                    :to="project.github"
                    target="_blank"
                    variant="outline"
                    size="sm"
                    icon="i-simple-icons-github"
                    class="flex-1"
                  >
                    {{ locale === 'fr' ? 'Code' : 'Code' }}
                  </UButton>

                  <UButton 
                    v-if="project.live"
                    :to="project.live"
                    target="_blank"
                    size="sm"
                    icon="i-heroicons-arrow-top-right-on-square"
                    class="flex-1"
                  >
                    {{ locale === 'fr' ? 'Voir le site' : 'View Live' }}
                  </UButton>
                </div>

                <!-- 🎯 Deuxième ligne : PDF (téléchargement uniquement) -->
                <div v-if="project.pdf">
                  <UButton 
                    :to="project.pdf.file"
                    target="_blank"
                    size="sm"
                    icon="i-heroicons-arrow-down-tray"
                    class="w-full"
                    color="green"
                  >
                   {{ locale === 'fr' ? 'Télécharger' : 'Download' }} {{ project.pdf.title }}
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="py-20 text-center">
      <div class="container mx-auto px-4">
        <UIcon name="i-heroicons-folder-open" class="text-6xl text-gray-400 mb-4" />
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {{ locale === 'fr' ? 'Aucun projet pour le moment' : 'No projects yet' }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          {{ locale === 'fr' ? 'De nouveaux projets arrivent bientôt !' : 'New projects coming soon!' }}
        </p>
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
