<script setup lang="ts">
interface ProjectDetail {
  title: string;
  intro: string;
  teamWork: string;
  image: string;
  status: 'completed' | 'in-progress';
  technologies: string[];
  github?: string;
  live?: string;
  pdf?: {
    title: string;
    file: string;
  };
  
  // Sections détaillées
  screenshots?: {
    title: string;
    image: string;
    description?: string;
  }[];
  
  features?: {
    title: string;
    description: string;
  }[];
  
  otherInfo?: {
    duration?: string;
    team?: string;
    role?: string;
    client?: string;
    year?: string;
    challenges?: string[];
    results?: string[];
  };
}

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

// 📌 Récupère le projet détaillé
const { data: project } = await useAsyncData(
  `project-${slug}-${locale.value}`,
  () => queryContent(`/${locale.value}/projects/${slug}`).findOne()
) as { data: Ref<ProjectDetail> }

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: locale.value === 'fr' ? 'Projet introuvable' : 'Project not found'
  })
}

useSeoMeta({
  title: `${project.value.title} - ${locale.value === 'fr' ? 'Projets' : 'Projects'}`,
  description: project.value.intro
})
</script>

<template>
  <div class="min-h-screen py-12" v-if="project">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- 🔙 Bouton retour -->
      <UButton
        :to="localePath('/projects')"
        variant="ghost"
        icon="i-heroicons-arrow-left"
        class="mb-8 !ring-blue-500 !text-blue-600 hover:!bg-green-50 dark:!ring-green-500 dark:!text-green-400 dark:hover:!bg-green-950"
        size="lg"
      >
        {{ locale === 'fr' ? 'Retour aux projets' : 'Back to projects' }}
      </UButton>

      <!-- ==================== HEADER ==================== -->
      <div class="mb-12">
        <div class="flex items-center gap-4 mb-6">
          <h1 class="text-5xl font-bold text-gray-900 dark:text-white">
            {{ project.title }}
          </h1>
          <UBadge
            :color="project.status === 'completed' ? 'green' : 'yellow'"
            size="lg"
          >
            {{ project.status === 'completed'
              ? (locale === 'fr' ? 'Terminé' : 'Completed')
              : (locale === 'fr' ? 'En cours' : 'In Progress')
            }}
          </UBadge>
        </div>

        <!-- INTRO -->
        <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          {{ project.intro }}
        </p>
        <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          {{ project.teamWork }}
        </p>

        <!-- Boutons d'action principaux -->
        <div class="flex flex-wrap gap-4">
          <UButton
            v-if="project.live"
            :to="project.live"
            target="_blank"
            icon="i-heroicons-arrow-top-right-on-square"
            size="xl"
            class="!ring-blue-500 !text-blue-600 hover:!bg-green-50 dark:!ring-green-500 dark:!text-green-400 dark:hover:!bg-green-950"
            variant="outline"
          >
            {{ locale === 'fr' ? ' Voir le site' : ' View Live Site' }}
          </UButton>

          <UButton
            v-if="project.github"
            :to="project.github"
            target="_blank"
            icon="i-simple-icons-github"
            size="xl"
            class="!ring-blue-500 !text-blue-600 hover:!bg-green-50 dark:!ring-green-500 dark:!text-green-400 dark:hover:!bg-green-950"
            variant="outline"
          >
            {{ locale === 'fr' ? 'Code source' : 'Source Code' }}
          </UButton>

          <UButton
            v-if="project.pdf"
            :to="project.pdf.file"
            target="_blank"
            icon="i-heroicons-arrow-down-tray"
            size="xl"
            class="!ring-blue-500 !text-blue-600 hover:!bg-green-50 dark:!ring-green-500 dark:!text-green-400 dark:hover:!bg-green-950"
            variant="outline"
          >
            {{ project.pdf.title }}
          </UButton>
        </div>
      </div>

      <!-- ==================== IMAGE PRINCIPALE ==================== -->
      <div class="rounded-2xl overflow-hidden shadow-2xl mb-16 border-4 border-gray-200 dark:border-gray-700">
        <NuxtImg
          :src="project.image"
          :alt="project.title"
          class="w-full h-auto"
          width="1200"
          height="600"
        />
      </div>

      <!-- ==================== TECHNOLOGIES ==================== -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <UIcon name="i-heroicons-code-bracket" class="text-blue-500" />
          {{ locale === 'fr' ? 'Technologies utilisées' : 'Technologies Used' }}
        </h2>
        <div class="flex flex-wrap gap-3">
          <UBadge
            v-for="tech in project.technologies"
            :key="tech"
            size="lg"
            variant="soft"
            class="px-4 py-2 text-base !ring-blue-500 !text-blue-600 hover:!bg-green-50 dark:!ring-green-500 dark:!text-green-400 dark:hover:!bg-green-950"
          >
            {{ tech }}
          </UBadge>
        </div>
      </section>

      <!-- ==================== GALERIE DE SCREENSHOTS ==================== -->
      <section v-if="project.screenshots && project.screenshots.length > 0" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          {{ locale === 'fr' ? 'Captures d\'écran' : 'Screenshots' }}
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(screenshot, index) in project.screenshots"
            :key="index"
            class="space-y-3"
          >
          <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <NuxtImg
              :src="screenshot.image"
              :alt="screenshot.title"
              class="w-full h-auto"
              width="1912"
              height="867"
            />
          </div>
            <div>
              <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
                {{ screenshot.title }}
              </h3>
              <p v-if="screenshot.description" class="text-gray-600 dark:text-gray-400 text-sm">
                {{ screenshot.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== FONCTIONNALITÉS ==================== -->
      <section v-if="project.features && project.features.length > 0" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          {{ locale === 'fr' ? 'Fonctionnalités principales' : 'Key Features' }}
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(feature, index) in project.features"
            :key="index"
            class="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-blue-200 dark:border-green-500"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-blue-500 dark:bg-green-500 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-check" class="text-white text-xl" />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  {{ feature.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== AUTRES INFORMATIONS ==================== -->
      <section v-if="project.otherInfo" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <UIcon name="i-heroicons-information-circle" class="text-green-500" />
          {{ locale === 'fr' ? 'Informations complémentaires' : 'Additional Information' }}
        </h2>
        
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          <!-- Infos générales en grille -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            <div v-if="project.otherInfo.year" class="p-6 text-center">
              <div class="text-2xl font-bold text-blue-500 mb-2">{{ project.otherInfo.year }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ locale === 'fr' ? 'Année' : 'Year' }}
              </div>
            </div>
            
            <div v-if="project.otherInfo.duration" class="p-6 text-center">
              <div class="text-2xl font-bold text-purple-500 mb-2">{{ project.otherInfo.duration }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ locale === 'fr' ? 'Durée' : 'Duration' }}
              </div>
            </div>
            
            <div v-if="project.otherInfo.team" class="p-6 text-center">
              <div class="text-2xl font-bold text-green-500 mb-2">{{ project.otherInfo.team }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ locale === 'fr' ? 'Équipe' : 'Team' }}
              </div>
            </div>
            
            <div v-if="project.otherInfo.role" class="p-6 text-center">
              <div class="text-xl font-bold text-orange-500 mb-2">{{ project.otherInfo.role }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ locale === 'fr' ? 'Rôle' : 'Role' }}
              </div>
            </div>
          </div>

          <!-- Client -->
          <div v-if="project.otherInfo.client" class="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ locale === 'fr' ? 'Client :' : 'Client:' }}
              </span>
              <span class="text-gray-900 dark:text-white font-semibold">
                {{ project.otherInfo.client }}
              </span>
            </div>
          </div>

          <!-- Défis techniques -->
          <div v-if="project.otherInfo.challenges && project.otherInfo.challenges.length > 0" class="p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              {{ locale === 'fr' ? 'Défis techniques' : 'Technical Challenges' }}
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(challenge, index) in project.otherInfo.challenges"
                :key="index"
                class="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <UIcon name="i-heroicons-arrow-right" class="text-orange-500 flex-shrink-0 mt-1" />
                <span>{{ challenge }}</span>
              </li>
            </ul>
          </div>

          <!-- Résultats -->
          <div v-if="project.otherInfo.results && project.otherInfo.results.length > 0" class="p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          
              {{ locale === 'fr' ? 'Résultats' : 'Results' }}
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div
                v-for="(result, index) in project.otherInfo.results"
                :key="index"
                class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center border border-green-200 dark:border-green-800"
              >
                <p class="text-gray-700 dark:text-gray-300 font-medium">{{ result }}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ==================== CTA FINAL ==================== -->
      <section class="mt-16 p-8 bg-gradient-to-r bg-gray-800 dark:bg-gray-800 rounded-2xl text-center text-white">
        <h3 class="text-2xl font-bold mb-4">
          {{ locale === 'fr' ? 'Intéressé par ce projet ?' : 'Interested in this project?' }}
        </h3>
        <p class="mb-6 text-blue-100">
          {{ locale === 'fr' 
            ? 'N\'hésitez pas à découvrir le site en ligne.' 
            : 'Feel free to check out the live site.' 
          }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            v-if="project.live"
            :to="project.live"
            target="_blank"
            icon="i-heroicons-arrow-top-right-on-square"
            size="xl"
            variant="outline"
            class="!ring-blue-500 !text-blue-600 hover:!bg-green-50 dark:!ring-green-500 dark:!text-green-400 dark:hover:!bg-green-950"
          >
            {{ locale === 'fr' ? 'Voir le site' : 'View Live' }}
          </UButton>
        </div>
      </section>

    </div>
  </div>
</template>