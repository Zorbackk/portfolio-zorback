<script setup lang="ts">
const { locale } = useI18n()

const { data: page, refresh } = await useAsyncData(`contact-page-${locale.value}`, () => {
  return queryContent(`/${locale.value}/contact`).findOne()
})

watch(locale, async () => {
  await refresh()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: locale.value === 'fr' ? 'Page contact introuvable' : 'Contact page not found'
  })
}

const form = reactive({
  name: '',
  email: '',
  subject: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)

useSeoMeta({
  title: page.value.title || (locale.value === 'fr' ? 'Contact - Alex' : 'Contact - Alex'),
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

    <div class="container mx-auto px-4 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- Informations de contact -->
        <div>
          <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">{{ page.texts?.contactInfo }}</h2>
          
          <div class="space-y-6">
            <div 
              v-for="info in page.contact_info" 
              :key="info.type"
              class="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                <UIcon :name="info.icon" class="text-xl text-blue-600 dark:text-blue-400" />
              </div>
              
              <div class="flex-grow">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ info.label }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ info.value }}</p>
              </div>
              
              <UButton 
                v-if="info.link"
                :to="info.link"
                :target="info.type === 'email' || info.type === 'phone' ? '_self' : '_blank'"
                variant="ghost"
                size="sm"
                icon="i-heroicons-arrow-top-right-on-square"
                class="ml-2"
              />
            </div>
          </div>
          
          <!-- Disponibilité -->
          <div class="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span class="font-semibold text-green-800 dark:text-green-300">{{ page.texts?.available }}</span>
            </div>
            <p class="text-green-700 dark:text-green-400 mt-2">
              {{ page.texts?.availableDesc }}
            </p>
          </div>
        </div>

        <!-- Formulaire -->
        <div>
          <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{{ page.form?.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">{{ page.form?.subtitle }}</p>
          
          <UForm :state="form" class="space-y-6">
            <UFormGroup :label="page.texts?.fullName" name="name" required>
              <UInput 
                v-model="form.name" 
                :placeholder="page.texts?.fullNamePlaceholder"
                size="lg"
              />
            </UFormGroup>

            <UFormGroup :label="page.texts?.email" name="email" required>
              <UInput 
                v-model="form.email" 
                type="email" 
                :placeholder="page.texts?.emailPlaceholder"
                size="lg"
              />
            </UFormGroup>

            <UFormGroup :label="page.texts?.subject" name="subject" required>
              <USelect 
                v-model="form.subject"
                :options="page.options?.subjects"
                :placeholder="page.texts?.subjectPlaceholder"
                size="lg"
              />
            </UFormGroup>

            <UFormGroup :label="page.texts?.budget" name="budget">
              <USelect 
                v-model="form.budget"
                :options="page.options?.budgets"
                :placeholder="page.texts?.budgetPlaceholder"
                size="lg"
              />
            </UFormGroup>

            <UFormGroup :label="page.texts?.message" name="message" required>
              <UTextarea 
                v-model="form.message" 
                :placeholder="page.texts?.messagePlaceholder"
                :rows="6"
                size="lg"
              />
            </UFormGroup>

            <UButton 
              type="submit" 
              :loading="isSubmitting"
              :disabled="isSubmitting"
              size="lg" 
              class="w-full"
              icon="i-heroicons-paper-airplane"
            >
              {{ isSubmitting ? page.texts?.sending : page.texts?.sendMessage }}
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>
