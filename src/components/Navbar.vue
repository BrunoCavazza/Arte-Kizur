<template>
  <q-header class="navbar-header" elevated :height-hint="64">
    <q-toolbar class="navbar-toolbar text-white q-px-md">
      <router-link to="/" class="navbar-logo row items-center no-wrap text-white">
        <q-avatar rounded size="40px" class="navbar-logo__mark">
          AK
        </q-avatar>
        <span class="navbar-logo__text q-ml-sm text-weight-bold">Arte Kizur</span>
      </router-link>

      <q-space />

      <!-- Menú centrado (desktop) -->
      <nav class="gt-md navbar-nav row items-center no-wrap q-gutter-x-sm">
        <router-link
          v-for="item in links"
          :key="item.name"
          :to="item.to"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <a
            :href="href"
            class="navbar-link"
            :class="{ 'navbar-link--active': isActive }"
            @click="(e) => onNavClick(e, navigate)"
          >
            {{ item.label }}
          </a>
        </router-link>
      </nav>

      <q-space class="gt-md" />

      <q-btn
        flat
        round
        dense
        color="white"
        icon="menu"
        aria-label="Abrir menú"
        class="lt-md"
        @click="drawerOpen = true"
      />
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="drawerOpen"
    side="right"
    overlay
    bordered
    behavior="mobile"
    class="bg-dark text-white"
  >
    <q-list padding class="q-pt-xl">
      <q-item
        v-for="item in links"
        :key="item.name"
        clickable
        v-ripple
        :active="$route.name === item.name"
        active-class="navbar-drawer-item--active"
        @click="go(item.to)"
      >
        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const drawerOpen = ref(false)

const links = [
  { name: 'home', to: '/', label: 'Inicio' },
  { name: 'obras', to: '/obras', label: 'Obras' },
  { name: 'muestras', to: '/muestras', label: 'Muestras' },
  { name: 'profesora', to: '/profesora', label: 'Profesora Moni' },
  { name: 'alumnos', to: '/alumnos', label: 'Alumnos' },
  { name: 'egresados', to: '/egresados', label: 'Egresados' },
  { name: 'inscripciones', to: '/inscripciones', label: 'Inscripciones' },
  { name: 'contacto', to: '/contacto', label: 'Contacto' },
]

watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false
  },
)

function go(to) {
  drawerOpen.value = false
  router.push(to)
}

function onNavClick(e, navigate) {
  e.preventDefault()
  navigate(e)
}
</script>

<style scoped lang="scss">
.navbar-header {
  background: #f2bb2d !important;
  position: sticky;
  top: 0;
  z-index: 2000;
}

.navbar-toolbar {
  min-height: 64px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.navbar-logo {
  text-decoration: none;
  transition: transform 0.35s ease-in-out;

  &:hover {
    transform: scale(1.04);
  }
}

.navbar-logo__text {
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}

.navbar-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.navbar-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 6px 10px;
  border-radius: 8px;
  transition:
    transform 0.35s ease-in-out,
    background-color 0.35s ease-in-out,
    color 0.25s ease;

  &:hover {
    transform: scale(1.08);
    background-color: rgba(255, 255, 255, 0.18);
  }

  &--active {
    background-color: rgba(255, 255, 255, 0.28);
  }
}

.navbar-logo__mark {
  background: transparent !important;
  color: #fff !important;
  border: 2px solid rgba(255, 255, 255, 0.92);
  font-weight: 700;
  font-size: 0.85rem;
}
</style>

<style lang="scss">
/* Drawer: ítem activo en blanco sobre fondo oscuro */
.navbar-drawer-item--active {
  color: #fff !important;
  background: rgba(242, 187, 45, 0.22) !important;
}
</style>
