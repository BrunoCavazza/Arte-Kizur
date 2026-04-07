<template>
  <q-page class="home-page bg-transparent">
    <HeroVideo />

    <q-card class="home-intro-card" flat bordered>
      <q-card-section class="home-intro-card__section q-py-lg q-px-md">
        <p class="text-center text-h6 text-weight-medium text-grey-9 q-mb-none home-intro-card__text">
          Explorá cada espacio de la academia: práctica, muestras, comunidad y formación.
        </p>
      </q-card-section>
    </q-card>

    <div class="home-scroll-hint-wrap">
      <ScrollDownHint target-id="home-previews" />
    </div>

    <section id="home-previews" class="home-sections q-px-md q-py-xl">
      <div class="home-sections__inner">
        <div class="row q-col-gutter-lg">
          <div
            v-for="(block, index) in previews"
            :key="block.title"
            class="col-12 col-sm-6 col-lg-4"
          >
            <SectionPreview
              v-bind="block"
              :style="{ transitionDelay: `${index * 60}ms` }"
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import HeroVideo from 'components/HeroVideo.vue'
import ScrollDownHint from 'components/ScrollDownHint.vue'
import SectionPreview from 'components/SectionPreview.vue'

const previews = [
  {
    title: 'Obras',
    description:
      'Producciones y piezas que atraviesan técnicas clásicas y contemporáneas.',
    image: 'https://picsum.photos/seed/arteobras/800/500',
    to: { name: 'obras' },
  },
  {
    title: 'Muestras',
    description: 'Exhibiciones, salas y momentos donde el trabajo cobra presencia pública.',
    image: 'https://picsum.photos/seed/muestrasak/800/500',
    to: { name: 'muestras' },
  },
  {
    title: 'Profesora',
    description: 'Trayectoria, mirada pedagógica y acompañamiento en el taller.',
    image: 'https://picsum.photos/seed/profesora/800/500',
    to: { name: 'profesora' },
  },
  {
    title: 'Alumnos',
    description: 'Voces del taller: proceso, experimentación y crecimiento cotidiano.',
    image: 'https://picsum.photos/seed/alumnosak/800/500',
    to: { name: 'alumnos' },
  },
  {
    title: 'Egresados',
    description: 'Historias de quienes siguieron creando más allá de la academia.',
    image: 'https://picsum.photos/seed/egresados/800/500',
    to: { name: 'egresados' },
  },
  {
    title: 'Inscripciones',
    description: 'Cupos, modalidades y primeros pasos para sumarte al espacio.',
    image: 'https://picsum.photos/seed/inscripciones/800/500',
    to: { name: 'inscripciones' },
  },
  {
    title: 'Contacto',
    description: 'Escribinos: ubicación, redes y canal directo con el taller.',
    image: 'https://picsum.photos/seed/contactoarte/800/500',
    to: { name: 'contacto' },
  },
]
</script>

<style scoped lang="scss">
.home-page {
  overflow-x: hidden;
}

.home-sections__inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* Banda crema a todo el ancho: separa el video del fondo animado */
.home-intro-card {
  width: 100%;
  max-width: none;
  border-radius: 0;
  background: #faf7ef;
  border-color: rgba(60, 48, 30, 0.08) !important;
  box-shadow:
    0 -6px 24px rgba(0, 0, 0, 0.12),
    0 4px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 1;
}

.home-intro-card__section {
  max-width: 42rem;
  margin: 0 auto;
}

.home-intro-card__text {
  line-height: 1.55;
  letter-spacing: 0.01em;
}

/* El padding vertical del hint lo anima ScrollDownHint (evita salto al ocultarse) */
.home-scroll-hint-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 2;
  pointer-events: none;
}
</style>
