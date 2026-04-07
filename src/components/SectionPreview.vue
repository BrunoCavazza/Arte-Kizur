<template>
  <div ref="wrapRef" class="section-preview-wrap reveal-on-scroll">
    <q-card class="section-preview bg-dark text-white" flat bordered>
      <div class="section-preview__image-wrap">
        <img class="section-preview__image" :src="image" :alt="title" loading="lazy" />
        <div class="section-preview__shine" />
      </div>

      <q-card-section class="q-pt-lg">
        <h2 class="text-h5 text-weight-bold q-mb-sm font-section-title">{{ title }}</h2>
        <p class="text-body2 text-grey-4 q-mb-md section-preview__desc">{{ description }}</p>
        <q-btn
          unelevated
          color="primary"
          text-color="dark"
          :label="ctaLabel"
          class="section-preview__btn text-weight-bold"
          :to="to"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRevealOnScroll } from 'src/composables/useRevealOnScroll.js'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  to: { type: [String, Object], required: true },
  ctaLabel: { type: String, default: 'Ver más' },
})

const wrapRef = ref(null)
useRevealOnScroll(wrapRef)
</script>

<style scoped lang="scss">
.section-preview-wrap {
  height: 100%;
}

.section-preview {
  border-radius: 18px !important;
  overflow: hidden;
  height: 100%;
  border-color: rgba(242, 187, 45, 0.35) !important;
  transition:
    transform 0.45s ease-in-out,
    box-shadow 0.45s ease-in-out,
    border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow:
      0 22px 48px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(242, 187, 45, 0.45);
    border-color: rgba(242, 187, 45, 0.65) !important;
  }
}

.section-preview__image-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.section-preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease-in-out;
  filter: saturate(1.05) contrast(1.05);

  .section-preview:hover & {
    transform: scale(1.06);
  }
}

.section-preview__shine {
  pointer-events: none;
  position: absolute;
  inset: -40% -60%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.12) 50%,
    transparent 60%
  );
  transform: translateX(-30%);
  transition: transform 0.8s ease;

  .section-preview:hover & {
    transform: translateX(30%);
  }
}

.section-preview__desc {
  line-height: 1.55;
  min-height: 4.5em;
}

.section-preview__btn {
  border-radius: 999px;
  padding: 6px 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
