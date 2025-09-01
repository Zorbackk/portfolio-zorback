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

// 🎯 Types définis proprement
interface FormData {
  name: string
  email: string
  subject: string
  budget: string
  message: string
}

interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  type?: 'email'
  pattern?: RegExp
  message: string
}

interface FormErrors {
  name?: string[]
  email?: string[]
  subject?: string[]
  message?: string[]
}

const form = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)
const errors = ref<FormErrors>({})

// 🔧 Règles de validation avec typage correct
const validationRules: Record<keyof FormData, ValidationRule[]> = {
  name: [
    { 
      required: true, 
      message: locale.value === 'fr' ? 'Le nom est requis' : 'Name is required' 
    },
    { 
      min: 2, 
      message: locale.value === 'fr' ? 'Le nom doit contenir au moins 2 caractères' : 'Name must be at least 2 characters' 
    },
    {
      max: 50,
      message: locale.value === 'fr' ? 'Le nom ne peut pas dépasser 50 caractères' : 'Name cannot exceed 50 characters'
    },
    {
      pattern: /^[a-zA-ZÀ-ÿ\s\-']+$/,
      message: locale.value === 'fr' ? 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes' : 'Name can only contain letters, spaces, hyphens and apostrophes'
    }
  ],
  email: [
    { 
      required: true, 
      message: locale.value === 'fr' ? 'L\'email est requis' : 'Email is required' 
    },
    {
      type: 'email',
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: locale.value === 'fr' ? 'Adresse email invalide' : 'Invalid email address'
    }
  ],
  subject: [
    { 
      required: true, 
      message: locale.value === 'fr' ? 'Le sujet est requis' : 'Subject is required' 
    }
  ],
  message: [
    { 
      required: true, 
      message: locale.value === 'fr' ? 'Le message est requis' : 'Message is required' 
    },
    {
      min: 10,
      message: locale.value === 'fr' ? 'Le message doit contenir au moins 10 caractères' : 'Message must be at least 10 characters'
    },
    {
      max: 1000,
      message: locale.value === 'fr' ? 'Le message ne peut pas dépasser 1000 caractères' : 'Message cannot exceed 1000 characters'
    }
  ],
  budget: [] // Pas de validation pour budget (optionnel)
}

// 🔍 Fonction de validation avec gestion correcte des types
const validateField = (fieldName: keyof FormData, value: string): string[] => {
  const fieldRules = validationRules[fieldName]
  const fieldErrors: string[] = []

  for (const rule of fieldRules) {
    // Vérification required
    if (rule.required && (!value || value.trim() === '')) {
      fieldErrors.push(rule.message)
      break // Si requis et vide, pas besoin de vérifier le reste
    }
    
    // Si pas de valeur et pas requis, on passe
    if (!value || value.trim() === '') {
      continue
    }
    
    // Vérification longueur minimum
    if (rule.min !== undefined && value.length < rule.min) {
      fieldErrors.push(rule.message)
    }
    
    // Vérification longueur maximum
    if (rule.max !== undefined && value.length > rule.max) {
      fieldErrors.push(rule.message)
    }
    
    // Vérification pattern regex
    if (rule.pattern && !rule.pattern.test(value)) {
      fieldErrors.push(rule.message)
    }
  }

  return fieldErrors
}

// ✅ VERSION CORRIGÉE - Validation du formulaire complet
const validateForm = (): boolean => {
  const formErrors: FormErrors = {}
  let isValid = true

  // 🔧 Solution propre : On définit explicitement les champs à valider
  const fieldsWithValidation = {
    name: form.name,
    email: form.email,
    subject: form.subject,
    message: form.message
  } as const

  // 🔧 Itération sûre avec Object.entries
  Object.entries(fieldsWithValidation).forEach(([fieldName, fieldValue]) => {
    const typedFieldName = fieldName as keyof typeof fieldsWithValidation
    
    // Validation du champ
    const fieldErrors = validateField(typedFieldName, fieldValue)
    
    if (fieldErrors.length > 0) {
      // Assignation sûre des erreurs
      switch (typedFieldName) {
        case 'name':
          formErrors.name = fieldErrors
          break
        case 'email':
          formErrors.email = fieldErrors
          break
        case 'subject':
          formErrors.subject = fieldErrors
          break
        case 'message':
          formErrors.message = fieldErrors
          break
      }
      isValid = false
    }
  })

  errors.value = formErrors
  return isValid
}

// 🧹 Sanitisation des données
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') 
    .replace(/<[^>]*>/g, '') 
    .trim() 
}

// Constantes pour envoie du formulaire
const success = ref(false)
const error = ref('')
const pending = ref(false)

// 📤 Soumission du formulaire
const handleSubmit = async () => {

  if (!validateForm()) {
    return 
  }

  pending.value = true
  error.value = ''
  success.value = false 

  try {
    
    const sanitizedData = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      subject: sanitizeInput(form.subject),
      budget: form.budget, 
      message: sanitizeInput(form.message)
    }

    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: sanitizedData
    })

    if (response.success) {
  
      success.value = true
      errors.value = {} 
      
      // Reset du formulaire
      Object.assign(form, {
        name: '',
        email: '',
        subject: '',
        budget: '',
        message: ''
      })
    }

  } catch (err: any) {
    console.error('Erreur envoi:', err)
    error.value = err.data?.message || 'Une erreur est survenue'
  } finally {
    pending.value = false
  }
}

// 👀 Validation en temps réel - VERSION SIMPLIFIÉE
const clearFieldError = (fieldName: keyof FormErrors) => {
  if (errors.value[fieldName]) {
    const newErrors = { ...errors.value }
    delete newErrors[fieldName]
    errors.value = newErrors
  }
}

// Watchers simplifiés
watch(() => form.name, (newVal) => {
  if (errors.value.name && newVal.trim() !== '') {
    const fieldErrors = validateField('name', newVal)
    if (fieldErrors.length === 0) {
      clearFieldError('name')
    }
  }
})

watch(() => form.email, (newVal) => {
  if (errors.value.email && newVal.trim() !== '') {
    const fieldErrors = validateField('email', newVal)
    if (fieldErrors.length === 0) {
      clearFieldError('email')
    }
  }
})

watch(() => form.message, (newVal) => {
  if (errors.value.message && newVal.trim() !== '') {
    const fieldErrors = validateField('message', newVal)
    if (fieldErrors.length === 0) {
      clearFieldError('message')
    }
  }
})

useSeoMeta({
  title: page.value?.title || (locale.value === 'fr' ? 'Contact - Alex' : 'Contact - Alex'),
  description: page.value?.description
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
                class="ml-2 text-blue-600 dark:text-green-400"
              />
            </div>
          </div>
          
          <!-- Disponibilité -->
          <div class="mt-8 p-6 bg-blue-500/20 dark:bg-green-900/20 border border-blue-600 dark:border-green-800 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-full mr-3"></div>
              <span class="font-semibold text-dark dark:text-green-300">{{ page.texts?.available }}</span>
            </div>
            <p class="text-dark dark:text-green-400 mt-2">
              {{ page.texts?.availableDesc }}
            </p>
          </div>
        </div>

        <!-- Formulaire -->
        <div>
          <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{{ page.form?.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">{{ page.form?.subtitle }}</p>
          
          <UForm 
            :state="form" 
            class="space-y-6"
            @submit="handleSubmit"
          >
            <UFormGroup 
              :label="page.texts?.fullName" 
              name="name" 
              required
              :error="errors.name?.[0]"
            >
              <UInput 
                v-model="form.name" 
                :placeholder="page.texts?.fullNamePlaceholder"
                size="lg"
                maxlength="50"
                :color="errors.name ? 'red' : 'blue'"
              />
            </UFormGroup>

            <UFormGroup 
              :label="page.texts?.email" 
              name="email" 
              required
              :error="errors.email?.[0]"
            >
              <UInput 
                v-model="form.email" 
                type="email" 
                :placeholder="page.texts?.emailPlaceholder"
                size="lg"
                autocomplete="email"
                :color="errors.email ? 'red' : 'blue'"
              />
            </UFormGroup>

            <UFormGroup 
              :label="page.texts?.subject" 
              name="subject" 
              required
              :error="errors.subject?.[0]"
            >
              <USelect 
                v-model="form.subject"
                :options="page.options?.subjects"
                :placeholder="page.texts?.subjectPlaceholder"
                size="lg"
                :color="errors.subject ? 'red' : 'blue'"
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

            <UFormGroup 
              :label="page.texts?.message" 
              name="message" 
              required
              :error="errors.message?.[0]"
            >
              <UTextarea 
                v-model="form.message" 
                :placeholder="page.texts?.messagePlaceholder"
                :rows="6"
                size="lg"
                maxlength="1000"
                :color="errors.message ? 'red' : 'blue'"
              />
              <div class="text-right text-sm text-gray-500 mt-1">
                {{ form.message.length }}/1000
              </div>
            </UFormGroup>

            <UButton
              class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              type="submit" 
              :loading="isSubmitting"
              :disabled="isSubmitting"
              size="lg" 
              icon="i-heroicons-paper-airplane"
            >
              {{ isSubmitting ? page.texts?.sending : page.texts?.sendMessage }}
            </UButton>
          </UForm>
            <!-- ✅ Succès -->
  <UAlert 
    v-if="success" 
    color="green" 
    variant="subtle" 
    title="Message envoyé !" 
    description="Je reviendrai vers vous rapidement."
  />
  
  <!-- ❌ Erreur -->
  <UAlert 
    v-if="error" 
    color="red" 
    variant="subtle" 
    :title="error"
  />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
:deep(input),
:deep(textarea),
:deep(select) {
  @apply bg-blue-500/20 dark:bg-green-900/20 border border-gray-200 dark:border-green-800;
}
</style>