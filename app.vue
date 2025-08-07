
<template>
  <div>
    <div>
      <!-- 🎯 Navigation avec transition -->
      <nav class="p-4 bg-black shadow-sm flex items-center justify-between">
        <div class="flex gap-4">
          <NuxtLink to="/" class="font-bold text-white hover:text-gray-300">
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink to="/about" class="font-bold text-white hover:text-gray-300">
            {{ $t('nav.about') }}
          </NuxtLink>
          <NuxtLink to="/projects" class="font-bold text-white hover:text-gray-300">
            {{ $t('nav.projects') }}
          </NuxtLink>
          <NuxtLink to="/contact" class="font-bold text-white hover:text-gray-300">
            {{ $t('nav.contact') }}
          </NuxtLink>
        </div>
        
        <LanguageSwitcher />
      </nav>

      <!-- 🎭 Page avec transition pour masquer le flash -->
        <NuxtPage />

      
      <footer class="p-4 text-center text-gray-500">
        © 2025 Zorback - Portfolio
      </footer>
    </div>
  </div>
</template>
