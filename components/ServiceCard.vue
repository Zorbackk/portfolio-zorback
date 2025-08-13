<script setup>
const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const borderColorClass = computed(() => {
  // Adapte les couleurs de bordure pour le mode sombre
  const colorMap = {
    'border-gray-900': 'border-gray-900 dark:border-gray-600',
    'border-amber-500': 'border-amber-500 dark:border-amber-400',
    'border-teal-600': 'border-teal-600 dark:border-teal-400'
  }
  return colorMap[props.service.borderColor] || props.service.borderColor
})

const handleClick = (service) => {
  // Navigation
  console.log(`Clic sur le service: ${service.title}`)
}
</script>

<template>
  <div class="relative border-2 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-200"
       :class="borderColorClass">
    <!-- Tag -->
    <div class="inline-block px-3 py-1 text-xs font-medium text-white rounded mb-4"
         :class="service.tagColor">
      {{ service.tag }}
    </div>
    
    <!-- Titre -->
    <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
      {{ service.title }}
    </h3>
    
    <!-- Description -->
    <p class="text-gray-600 dark:text-gray-300 mb-6">
      {{ service.description }}
    </p>
    
    <!-- Features -->
    <ul class="space-y-3 mb-8">
      <li 
        v-for="feature in service.features" 
        :key="feature"
        class="flex items-start"
      >
        <UIcon 
          name="i-heroicons-check" 
          class="text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0"
        />
        <span class="text-gray-700 dark:text-gray-300 text-sm">{{ feature }}</span>
      </li>
    </ul>
    
    <!-- Button -->
    <button 
      class="w-full text-white py-3 px-4 rounded font-medium hover:opacity-90 transition-opacity"
      :class="service.buttonColor"
      @click="handleClick(service)"
    >
      {{ service.buttonText }}
    </button>
  </div>
</template>


