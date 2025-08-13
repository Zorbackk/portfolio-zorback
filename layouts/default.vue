<script setup>
const colorMode = useColorMode()

const backgroundClass = computed(() => {
  return colorMode.value === 'dark' 
    ? 'bg-dark-pattern' 
    : 'bg-light-pattern'
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div>
      <!-- 🎯 Navigation avec transition -->
      <TheNavigation />

      <!-- 🎭 Page avec transition pour masquer le flash -->
      <main class="text-gray-900 dark:text-white transition-colors duration-300" :class="backgroundClass">
        <NuxtPage />
      </main>
      
      <TheFooter />
    </div>
  </div>
</template>

<style scoped>
.bg-light-pattern {
  background-image: url('~/assets/images/bg-light.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.bg-dark-pattern {
  background-image: url('~/assets/images/bg-dark.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
