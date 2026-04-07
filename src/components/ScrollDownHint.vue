<!--
  Animación tipo "scroll down" (dotLottie de LottieFiles).
  Archivo: public/scroll-down.lottie — reemplazable por la descarga oficial de:
  https://lottiefiles.com/free-animation/simple-scroll-down-icon-585PXseBHO
-->
<template>
  <div
    class="scroll-hint-root"
    :class="{ 'scroll-hint-root--open': visible }"
    aria-hidden="true"
  >
    <div class="scroll-hint-root__inner">
      <DotLottieVue
        class="scroll-hint-root__lottie"
        src="/scroll-down.lottie"
        autoplay
        loop
        :speed="1"
        background-color="#00000000"
      />
      <span class="scroll-hint-root__sr">Desplazá hacia abajo para ver el contenido</span>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const props = defineProps({
  /** id del elemento cuyo ingreso al viewport oculta el hint (rejilla de cards) */
  targetId: {
    type: String,
    required: true,
  },
})

const visible = ref(true)
let observer

onMounted(() => {
  const target = document.getElementById(props.targetId)
  if (!target || typeof IntersectionObserver === 'undefined') {
    visible.value = false
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = !entry.isIntersecting
    },
    {
      root: null,
      threshold: 0,
      rootMargin: '0px 0px -12% 0px',
    },
  )

  observer.observe(target)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped lang="scss">
/* Altura máxima del bloque (Lottie 72px + márgenes); el colapso anima el “hueco” */
$scroll-hint-expanded: 118px;

.scroll-hint-root {
  width: 100%;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
  pointer-events: none;
  transition:
    max-height 0.6s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.45s ease,
    padding-bottom 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

.scroll-hint-root--open {
  max-height: $scroll-hint-expanded;
  opacity: 1;
  padding-bottom: 12px;
}

.scroll-hint-root__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
}

.scroll-hint-root__lottie {
  width: 72px;
  height: 72px;
  opacity: 0.95;
}

.scroll-hint-root__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
