<template>
  <div 
    class="group tech-card glow-box p-6 rounded-lg hover:scale-105 transition-all duration-300 text-center relative"
    :style="{ 'animation-delay': `${index * 100}ms` }"
  >
    <!-- Effet scan line -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div class="scan-line h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
    </div>
    
    <!-- Icône/Logo Tech -->
    <div class="tech-icon-container mb-4">
      <!-- Si c'est une image (logo) -->
      <img 
        v-if="tech.logo" 
        :src="tech.logo" 
        :alt="`Logo ${tech.name}`"
        class="w-12 h-12 mx-auto filter brightness-75 group-hover:brightness-100 transition-all duration-300"
      >
      
      <!-- Sinon emoji fallback -->
      <div v-else class="text-4xl group-hover:animate-pulse transition-all duration-300">
        {{ tech.icon || '🔧' }}
      </div>
    </div>

    <!-- Nom Tech -->
    <h3 class="font-tech font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
      {{ tech.name || 'Tech' }}
    </h3>
    
    <!-- Catégorie -->
    <span class="font-mono text-xs text-cyan-400 uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
      {{ tech.category || 'tech' }}
    </span>
    
    <!-- Level indicator (nouveau) -->
    <div class="mt-3 flex justify-center space-x-1">
      <div 
        v-for="i in 5"
        :key="i"
        class="w-1 h-3 rounded-full transition-all duration-300"
        :class="i <= (tech.level || 3) 
          ? 'bg-gradient-to-t from-cyan-400 to-purple-400 shadow-sm shadow-cyan-400' 
          : 'bg-gray-600'"
      ></div>
    </div>

    <!-- Badges optionnels -->
    <div v-if="tech.badges" class="flex flex-wrap gap-1 mt-3 justify-center">
      <span 
        v-for="badge in tech.badges"
        :key="badge"
        class="px-2 py-1 text-xs bg-gray-800 text-cyan-300 rounded-full font-mono border border-cyan-500/30"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Corners tech -->
    <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  tech: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.tech-card {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 245, 255, 0.2);
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(15, 15, 15, 0.9) 100%);
}

.tech-card:hover {
  border-color: rgba(0, 245, 255, 0.5);
  box-shadow: 
    0 0 20px rgba(0, 245, 255, 0.2),
    inset 0 0 20px rgba(0, 245, 255, 0.05);
}

.tech-icon-container {
  position: relative;
}

.tech-icon-container::before {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, rgba(0, 245, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-card:hover .tech-icon-container::before {
  opacity: 1;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  animation: scan 2s ease-in-out infinite;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
