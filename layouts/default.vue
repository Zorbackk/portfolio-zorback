<script setup>

</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div>
      <!-- 🎯 Navigation avec transition -->
      <TheNavigation />

      <!-- 🎭 Page avec transition pour masquer le flash -->
      <main class="text-gray-900 dark:text-white transition-colors duration-300">
        <NuxtPage />
      </main>
      
      <footer class="p-4 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
        © 2025 Zorback - Portfolio
      </footer>
    </div>
  </div>
</template>


