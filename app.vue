<template>

  
  <div>

      <div>
    <!-- Debug -->
    <div class="p-2 bg-red-100 text-xs">
      Locale actuelle: {{ $i18n.locale }}
    </div>
    <!-- 🎯 Navigation globale (optionnelle) -->
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
    
    <NuxtPage />
    
    <footer class="p-4 text-center text-gray-500">
      © 2025 Zorback - Portfolio
    </footer>
  </div>
  </div>
</template>
