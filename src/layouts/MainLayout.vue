<template>
  <div class="main-shell">
    <AnimatedWebglBg />

    <q-layout view="hhh Lpr fff" class="main-layout main-layout--flush-hero bg-transparent">
      <Navbar />

      <q-page-container class="main-layout__container q-pa-none">
        <router-view v-slot="{ Component }">
          <transition name="route-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import AnimatedWebglBg from 'components/AnimatedWebglBg.vue'
import Navbar from 'components/Navbar.vue'
</script>

<style scoped lang="scss">
.main-shell {
  position: relative;
  min-height: 100vh;
}

.main-layout {
  min-height: 100vh;
  background: transparent;
}

.main-layout__container {
  background: transparent;
}
</style>

<!-- El padding-top inline de Quasar deja una franja vacía (se ve solo el WebGL). -->
<style lang="scss">
.main-layout--flush-hero .q-page-container {
  padding-top: 0 !important;
}
</style>
