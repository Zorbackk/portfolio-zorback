<script setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Navigation items
const navLinks = [
  { path: '/', label: 'nav.home' },
  { path: '/about', label: 'nav.about' },
  { path: '/projects', label: 'nav.projects' },
  { path: '/contact', label: 'nav.contact' }
]

// Mobile menu
const isMobileMenuOpen = ref(false)
</script>

<template>
  <nav class="tech-nav">
    <!-- Background ECG Lines -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-0 w-full h-px">
        <div class="ecg-line"></div>
      </div>
      <div class="absolute top-1/4 left-0 w-2 h-2 bg-cyan-400/30 rounded-full particle-1"></div>
      <div class="absolute bottom-1/4 right-0 w-1 h-1 bg-purple-400/40 rounded-full particle-2"></div>
    </div>

    <div class="container mx-auto px-4 py-4 relative z-10">
      <div class="flex items-center justify-between">
        
        <!-- Logo/Brand -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 border-2 border-cyan-400 rounded-lg flex items-center justify-center">
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <span class="font-bold text-xl gradient-text font-mono">
            ALEX.DEV
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex gap-4">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            class="nav-link font-bold text-white hover:text-cyan-400 transition-all duration-300 relative"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </div>

        <!-- Controls (Dark Mode + Language) -->
        <div class="flex items-center gap-3">
          <!-- Dark mode toggle - Ton UButton existant avec style tech -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            size="sm"
            color="gray"
            variant="ghost"
            class="tech-button text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 border border-transparent"
            @click="toggleDark"
          />
          
          <!-- Ton LanguageSwitcher existant -->
          <div class="tech-language-wrapper">
            <LanguageSwitcher />
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden tech-button p-2"
          >
            <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-2">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path" 
          class="block py-2 px-4 text-white hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-300"
          @click="isMobileMenuOpen = false"
        >
          {{ $t(link.label) }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.tech-nav {
  position: relative;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
}

/* === ECG ANIMATION === */
@keyframes ecg-pulse {
  0% { 
    transform: translateX(-100%);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { 
    transform: translateX(100vw);
    opacity: 0;
  }
}

.ecg-line {
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #00f5ff 15%,
    #00f5ff 20%,
    transparent 25%,
    transparent 40%,
    #00f5ff 45%,
    #00f5ff 50%,
    transparent 55%,
    transparent 75%,
    #a855f7 80%,
    #a855f7 85%,
    transparent 100%
  );
  animation: ecg-pulse 6s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
}

/* === PARTICLES === */
@keyframes particle-float-1 {
  0%, 100% { transform: translateX(0) translateY(0); opacity: 0.3; }
  50% { transform: translateX(100px) translateY(-10px); opacity: 0.8; }
}

@keyframes particle-float-2 {
  0%, 100% { transform: translateX(0) translateY(0); opacity: 0.4; }
  50% { transform: translateX(-80px) translateY(8px); opacity: 0.7; }
}

.particle-1 { animation: particle-float-1 6s ease-in-out infinite; }
.particle-2 { animation: particle-float-2 8s ease-in-out infinite; }

/* === NAV LINKS === */
.nav-link {
  position: relative;
  font-family: 'Fira Code', monospace;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f5ff, #a855f7);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link:hover {
  text-shadow: 0 0 10px #00f5ff;
}

/* === TECH BUTTON === */
.tech-button {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.tech-button:hover {
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
  transform: translateY(-1px);
}

/* === GRADIENT TEXT === */
.gradient-text {
  background: linear-gradient(135deg, #00f5ff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* === LANGUAGE WRAPPER === */
.tech-language-wrapper :deep(.toggle) {
  background-color: rgba(26, 26, 26, 0.8) !important;
  border-color: rgba(0, 245, 255, 0.5) !important;
}

.tech-language-wrapper :deep(.toggle:hover) {
  border-color: #00f5ff !important;
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.3) !important;
}
</style>
