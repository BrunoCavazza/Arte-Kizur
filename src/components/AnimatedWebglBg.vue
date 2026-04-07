<template>
  <canvas ref="canvasRef" class="animated-webgl-bg" aria-hidden="true" />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createRibbonBackground } from 'src/utils/webglRibbonBackground.js'

const canvasRef = ref(null)
let api = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  api = createRibbonBackground(canvas)
})

onBeforeUnmount(() => {
  api?.destroy()
  api = null
})

</script>

<style scoped>
.animated-webgl-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none; /* no bloquear clics en la UI encima */
  touch-action: none;
}
</style>
