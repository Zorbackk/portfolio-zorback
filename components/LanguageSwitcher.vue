<script setup>
  /**
   * Utilisation de l'API de localisation de Nuxt.js pour gérer la langue de l'application.
   *
   * @description Définit une propriété `isEnglish` qui permet de switcher entre les langues anglaise et française.
   */

  const { locale, setLocale } = useI18n()

  /**
   * Propriété calculée qui permet de switcher entre les langues anglaise et française.
   *
   * @computed
   * @returns {boolean} - True si la langue est anglaise, false si elle est française.
   */
  const isEnglish = computed({
    get: () => locale.value === 'en',
    set: (value) => setLocale(value ? 'en' : 'fr')
  })
</script>

<template>
  <div class="flex items-center gap-2">
    <span :class="{ 'text-white': !isEnglish, 'text-gray-500': isEnglish }" class="text-sm font-medium">
      FR
    </span>
    <UToggle 
  v-model="isEnglish" 
  size="sm"
  :ui="{ 
    base: 'transition-all duration-200 ease-in-out'
  }"
/>
    <span :class="{ 'text-white': isEnglish, 'text-gray-500': !isEnglish }" class="text-sm font-medium">
      EN
    </span>
  </div>
</template>
