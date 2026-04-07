<template>
  <q-page class="page-shell page-below-header bg-transparent q-px-md q-pb-md">
    <div class="page-shell__inner">
      <h1 class="page-title">Profesora</h1>
      <p class="page-lead">
        Biografía, enfoque docente y la mirada que guía las prácticas en el taller.
      </p>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped lang="scss">
.page-shell__inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
}

.page-lead {
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.65;
  margin: 0;
  font-size: 1.05rem;
}
</style>
