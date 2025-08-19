<!-- components/AnimatedSun.vue -->
<template>
  <div 
    ref="container" 
    class="w-full h-64 flex items-center justify-center relative"
  />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface Props {
  darkMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false
})

const container = ref<HTMLElement>()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let sun: THREE.Object3D
let ambientLight: THREE.AmbientLight
let directionalLight: THREE.DirectionalLight
let animationId: number

// Couleurs selon le mode
const getColors = () => {
  if (props.darkMode) {
    return {
      sunColor: 0xF59E0B,      // Orange
      rayColor: 0x38BDF8,      // Cyan lumineux
      glowColor: 0xEF4444,     // Rouge pour la lueur
      ambientColor: 0x404040   // Gris sombre
    }
  } else {
    return {
      sunColor: 0xEAB308,      // Jaune
      rayColor: 0x06B6D4,      // Cyan
      glowColor: 0xFEF3C7,     // Jaune doux
      ambientColor: 0x808080   // Gris clair
    }
  }
}

const initThreeJS = () => {
  if (!container.value) return

  // Scène
  scene = new THREE.Scene()
  
  // Caméra
  camera = new THREE.PerspectiveCamera(50, 2, 0.1, 100)
  camera.position.z = 8
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  })
  renderer.setSize(400, 256) // Taille fixe pour le conteneur
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)
  
  // Éclairage
  setupLighting()
  
  // Charger le soleil
  loadSun()
}

const setupLighting = () => {
  const colors = getColors()
  
  // Lumière ambiante
  ambientLight = new THREE.AmbientLight(colors.ambientColor, 0.4)
  scene.add(ambientLight)
  
  // Lumière directionnelle
  directionalLight = new THREE.DirectionalLight(colors.sunColor, 1)
  directionalLight.position.set(1, 1, 0.5)
  scene.add(directionalLight)
}

const loadSun = () => {
  const loader = new GLTFLoader()
  
  loader.load('/models/sun.glb', (gltf) => {
    sun = gltf.scene
    sun.scale.set(1, 1, 1)
    sun.position.set(0, 0, 0)
    
    // Application des couleurs personnalisées
    updateSunColors()
    
    scene.add(sun)
  }, undefined, (error) => {
    console.error('Erreur lors du chargement du soleil:', error)
  })
}

const updateSunColors = () => {
  if (!sun) return
  
  const colors = getColors()
  
  sun.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Clone le matériau pour éviter les conflits
      child.material = child.material.clone()
      
      // Application des couleurs selon le nom/type de mesh
      if (child.name.includes('sun') || child.name.includes('core')) {
        child.material.color.setHex(colors.sunColor)
        child.material.emissive.setHex(colors.sunColor)
        child.material.emissiveIntensity = 0.2
      }
      
      if (child.name.includes('ray') || child.name.includes('corona')) {
        child.material.color.setHex(colors.rayColor)
        child.material.emissive.setHex(colors.rayColor)
        child.material.emissiveIntensity = 0.1
      }
    }
  })
}

const animateSun = () => {
  if (!sun) return
  
  const time = Date.now() * 0.001 // Vitesse d'animation
  
  // Rotation principale du soleil
  sun.rotation.y += 0.005
  
  // Oscillation subtile
  sun.position.y = Math.sin(time * 0.5) * 0.1
  sun.scale.setScalar(1 + Math.sin(time * 2) * 0.05) // Pulsation douce
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  animateSun()
  renderer.render(scene, camera)
}

// Mise à jour lors du changement de mode
const updateColors = () => {
  setupLighting()
  updateSunColors()
}

// Watcher pour les changements de mode
watch(() => props.darkMode, () => {
  updateColors()
})

onMounted(() => {
  initThreeJS()
  animate()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose()
    container.value?.removeChild(renderer.domElement)
  }
})
</script>
