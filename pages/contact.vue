<script setup lang="ts">
// Récupération du contenu
const { data: page } = await useAsyncData('contact-page', () => {
  return queryContent('/contact').findOne()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page contact introuvable'
  })
}

// État du formulaire
const form = reactive({
  name: '',
  email: '',
  subject: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)

// Options pour les selects
const subjectOptions = [
  { label: '💼 Projet freelance', value: 'freelance' },
  { label: '🏢 Opportunité CDI', value: 'job' },
  { label: '🤝 Collaboration', value: 'collaboration' },
  { label: '❓ Question technique', value: 'question' },
  { label: '💬 Autre', value: 'other' }
]

const budgetOptions = [
  { label: 'Moins de 1 000€', value: '<1k' },
  { label: '1 000€ - 5 000€', value: '1k-5k' },
  { label: '5 000€ - 10 000€', value: '5k-10k' },
  { label: 'Plus de 10 000€', value: '>10k' },
  { label: 'À discuter', value: 'discuss' }
]

// Gestion de l'envoi
// async function onSubmit() {
//   isSubmitting.value = true
  
//   try {
//     // Simuler l'envoi (remplace par ton API)
//     await new Promise(resolve => setTimeout(resolve, 2000))
    
//     // Toast de succès
//     const toast = useToast()
//     toast.add({
//       title: 'Message envoyé !',
//       description: 'Je vous répondrai dans les plus brefs délais.',
//       color: 'green'
//     })
    
//     // Reset du formulaire
//     Object.keys(form).forEach(key => {
//       form[key] = ''
//     })
    
//   } catch (error) {
//     const toast = useToast()
//     toast.add({
//       title: 'Erreur',
//       description: 'Une erreur est survenue. Réessayez plus tard.',
//       color: 'red'
//     })
//   } finally {
//     isSubmitting.value = false
//   }
// }

// SEO
useSeoMeta({
  title: page.value.title || 'Contact - Alex',
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

    <div class="container mx-auto px-4 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- Informations de contact -->
        <div>
          <h2 class="text-2xl font-bold mb-8">Mes informations</h2>
          
          <div class="space-y-6">
            <div 
              v-for="info in page?.contact_info" 
              :key="info.type"
              class="flex items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <UIcon :name="info.icon" class="text-xl text-blue-600" />
              </div>
              
              <div class="flex-grow">
                <h3 class="font-semibold text-gray-900">{{ info.label }}</h3>
                <p class="text-gray-600">{{ info.value }}</p>
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
          <div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span class="font-semibold text-green-800">Disponible pour de nouveaux projets</span>
            </div>
            <p class="text-green-700 mt-2">
              Je suis actuellement ouvert à de nouvelles opportunités freelance ou CDI.
            </p>
          </div>
        </div>

        <!-- Formulaire de contact -->
        <div>
          <h2 class="text-2xl font-bold mb-2">{{ page?.form?.title }}</h2>
          <p class="text-gray-600 mb-8">{{ page?.form?.subtitle }}</p>
          
          <UForm :state="form" @submit="onSubmit" class="space-y-6">
            <!-- Nom -->
            <UFormGroup label="Nom complet" name="name" required>
              <UInput 
                v-model="form.name" 
                placeholder="Votre nom complet"
                size="lg"
              />
            </UFormGroup>

            <!-- Email -->
            <UFormGroup label="Email" name="email" required>
              <UInput 
                v-model="form.email" 
                type="email" 
                placeholder="votre@email.com"
                size="lg"
              />
            </UFormGroup>

            <!-- Sujet -->
            <UFormGroup label="Sujet" name="subject" required>
              <USelect 
                v-model="form.subject"
                :options="subjectOptions"
                placeholder="Choisissez un sujet"
                size="lg"
              />
            </UFormGroup>

            <!-- Budget (optionnel) -->
            <UFormGroup label="Budget estimé (optionnel)" name="budget">
              <USelect 
                v-model="form.budget"
                :options="budgetOptions"
                placeholder="Sélectionnez votre budget"
                size="lg"
              />
            </UFormGroup>

            <!-- Message -->
            <UFormGroup label="Message" name="message" required>
              <UTextarea 
                v-model="form.message" 
                placeholder="Décrivez votre projet ou votre demande..."
                :rows="6"
                size="lg"
              />
            </UFormGroup>

            <!-- Bouton d'envoi -->
            <UButton 
              type="submit" 
              :loading="isSubmitting"
              :disabled="isSubmitting"
              size="lg" 
              class="w-full"
              icon="i-heroicons-paper-airplane"
            >
              {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>


