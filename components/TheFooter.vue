<template>
  <footer class="tech-footer-with-border">
    <!-- BORDER TECH ANIMÉ (en haut) -->
    <div class="footer-border-container">
      <div class="footer-tech-border"></div>
    </div>

    <div class="container mx-auto px-4 py-6 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Logo/Brand (même que navbar) -->
        <div class="flex items-center gap-3">
            <div class="logo-wrapper">
              <NuxtImg 
                src="/images/logo-simple.webp"
                alt="Nevezio logo"
                width="333"
                height="200"
                format="webp"
                class="logo-image"
                loading="eager"
                preload
              />
            </div>
        </div>

        <!-- Copyright -->
        <div class="flex items-center gap-2 text-gray-400 text-sm font-mono">
          <span>© 2025</span>
          <span class="hover:text-cyan-400 transition-colors duration-300">
            Portfolio
          </span>
    <span class="hover:text-purple-400 transition-colors duration-300">
      - {{ $t('footer.rights') }}
    </span>
    <span class="hover:text-purple-400 transition-colors duration-300">
      - {{ $t('footer.chrysalide') }}
    </span>
        </div>

        <!-- Social/Tech indicator -->
<div class="flex items-center gap-2">
  <NuxtLink 
    to="/legal-notices" 
    class="text-sm font-mono text-gray-400 hover:text-gray-700 transition-colors duration-300"
  >
    Mentions légales
  </NuxtLink>
</div>
      </div>

    </div>

  </footer>
</template>

<style scoped>
.tech-footer-with-border {
  position: relative;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-top: 2px solid rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
  overflow: hidden;
  margin-top: auto;
}


.logo-wrapper {
  position: relative;
  width: 66px;  
  height: 40;  
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}


.footer-tech-border {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 2px;
  background: linear-gradient(270deg, 
    transparent 0%, 
    #a855f7 15%,
    #a855f7 20%,
    transparent 25%,
    transparent 40%,
    #00f5ff 45%,
    #00f5ff 50%,
    transparent 55%,
    transparent 75%,
    #00f5ff 80%,
    #00f5ff 85%,
    transparent 100%
  );
  animation: footer-border-pulse 8s ease-in-out infinite;
  animation-delay: 2s; 
  box-shadow: 
    0 0 8px rgba(168, 85, 247, 0.4),
    0 -2px 15px rgba(0, 245, 255, 0.2);
}

@keyframes footer-border-pulse {
  0% { 
    transform: translateX(150px);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateX(calc(-100vw - 150px));
    opacity: 0;
  }
}


.gradient-text {
  background: linear-gradient(135deg, #00f5ff 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}



@media (max-width: 768px) {
  .footer-tech-border {
    width: 100px;
  }
}
</style>
