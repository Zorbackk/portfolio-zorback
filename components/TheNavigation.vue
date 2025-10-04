<script setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  nextTick(() => {
    toggleDark()
    setTimeout(() => toggleDark(), 0)
  })
})

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
  <nav class="tech-nav-with-border">
    <div class="container mx-auto px-4 py-4 relative z-10">
      <div class="flex items-center justify-between">

        <!-- Logo/Brand avec lien vers home -->
          <NuxtLink 
            to="/" 
            class="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            @click="isMobileMenuOpen = false"
          >
            <!-- Wrapper du logo avec effet hover -->
            <div class="logo-wrapper">
              <NuxtImg 
                src="/images/logo.webp"
                alt="Nevezio logo"
                width="832"
                height="150"
                format="webp"
                class="logo-image"
                loading="eager"
                preload
              />
            </div>
          </NuxtLink>

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
          <!-- Dark mode toggle -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            size="sm"
            color="gray"
            variant="ghost"
            class="tech-button text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 border border-transparent"
            @click="toggleDark"
          />

          <!-- Language Switcher -->
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

    <!-- 🌊 BORDER TECH ANIMÉ -->
    <div class="nav-border-container">
      <div class="nav-tech-border"></div>
    </div>
  </nav>
</template>

<style scoped>
.tech-nav-with-border {
  position: relative;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
  overflow: visible;
}

/* === LOGO WRAPPER pour format horizontal 832x150 === */
.logo-wrapper {
  position: relative;
  width: 166px;  
  height: 30px;  
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.group:hover .logo-image {
  transform: scale(1.01);  
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))  
          drop-shadow(0 0 15px rgba(0, 245, 255, 0.2)); 
}

@keyframes border-glow {
  0%, 100% { 
    box-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  }
  50% { 
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
  }
}

/* 📱 Responsive - Logo plus petit sur mobile */
@media (max-width: 768px) {
  .logo-wrapper {
    width: 120px;  /* Logo plus petit sur mobile */
    height: 22px;
  }
}

/* === ANIMATED TECH BORDER === */
.nav-tech-border {
  position: absolute;
  bottom: 0;
  left: 0;
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
  animation: border-pulse 6s ease-in-out infinite;
  box-shadow: 
    0 0 10px rgba(0, 245, 255, 0.5),
    0 2px 20px rgba(0, 245, 255, 0.2);
}

@keyframes border-pulse {
  0% { 
    transform: translateX(-200px);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateX(calc(100vw + 200px));
    opacity: 0;
  }
}

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
