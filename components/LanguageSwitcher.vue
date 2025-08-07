<script setup>
const { locale, setLocale } = useI18n()

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
