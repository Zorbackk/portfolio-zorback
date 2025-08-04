<template>
  <div>
    <!-- 🎯 Navigation globale (optionnelle) -->
    <nav class="p-4 bg-white shadow-sm">
      <NuxtLink to="/" class="font-bold">Alex Portfolio</NuxtLink>
    </nav>
    
    <!-- 📄 Le contenu des pages s'affiche ici -->
    <NuxtPage />
    
    <!-- 🦶 Footer global (optionnel) -->
    <footer class="p-4 text-center text-gray-500">
      © 2025 Zorback - Portfolio
    </footer>
  </div>
</template>