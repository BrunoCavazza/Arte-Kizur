<template>
  <section class="hero-video">
    <video
      ref="videoRef"
      class="hero-video__media"
      autoplay
      muted
      loop
      playsinline
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
      :poster="posterUrl"
    >
      <!-- Colocá tu archivo en /public/hero.mp4 -->
      <source src="/hero.mp4" type="video/mp4" />
      <!-- Fallback demo si aún no hay video local -->
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        type="video/webm"
      />
    </video>
    <div class="hero-video__overlay" />
    <div class="hero-video__content">
      <transition appear name="hero-title">
        <h1 class="hero-video__title">Academia de Artes Visuales</h1>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  posterUrl: {
    type: String,
    default: '',
  },
})

const videoRef = ref(null)

onMounted(() => {
  const v = videoRef.value
  if (v) {
    v.play().catch(() => {
      /* autoplay bloqueado: el usuario puede interactuar después */
    })
  }
})
</script>

<style scoped lang="scss">
.hero-video {
  position: relative;
  width: 100%;
  margin: 0;
  min-height: min(72vh, 640px);
  max-height: 85vh;
  overflow: hidden;
}

.hero-video__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  pointer-events: none;

  /* Menos UI nativa del reproductor en el hero */
  &::-webkit-media-controls {
    display: none !important;
  }
}

.hero-video__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 12, 0.45) 0%,
    rgba(10, 10, 12, 0.62) 55%,
    rgba(10, 10, 12, 0.78) 100%
  );
  pointer-events: none;
}

.hero-video__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: min(72vh, 640px);
  padding: 2rem 1.25rem;
  text-align: center;
}

.hero-video__title {
  margin: 0;
  max-width: 18ch;
  font-family: 'Arizonia', cursive;
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  line-height: 1.05;
  font-weight: 400;
  color: #fff;
  text-shadow:
    0 4px 32px rgba(0, 0, 0, 0.45),
    0 0 40px rgba(242, 187, 45, 0.25);
  letter-spacing: 0.02em;
}
</style>
