// plugins/three.client.ts
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      THREE,
      GLTFLoader
    }
  }
})
