<script setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <div>
      <!-- 🎯 Navigation avec transition -->
      <nav class="p-4 bg-black dark:bg-gray-800 shadow-sm flex items-center justify-between transition-colors duration-300">
        <div class="flex gap-4">
          <NuxtLink to="/" class="font-bold text-white hover:text-gray-300 transition-colors">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/about" class="font-bold text-white hover:text-gray-300 transition-colors">
            {{ $t('nav.about') }}
          </NuxtLink>
          <NuxtLink to="/projects" class="font-bold text-white hover:text-gray-300 transition-colors">
            {{ $t('nav.projects') }}
          </NuxtLink>
          <NuxtLink to="/contact" class="font-bold text-white hover:text-gray-300 transition-colors">
            {{ $t('nav.contact') }}
          </NuxtLink>
        </div>
        
        <!-- Grouper les contrôles utilisateur -->
        <div class="flex items-center gap-3">
          <!-- Dark mode toggle -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            size="sm"
            color="gray"
            variant="ghost"
            class="text-white hover:bg-gray-700"
            @click="toggleDark"
          />
          
          <!-- Ton changement de langue existant -->
          <LanguageSwitcher />
        </div>
      </nav>

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


