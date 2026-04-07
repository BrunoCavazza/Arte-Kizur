import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from 'layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue'),
        meta: { title: 'Inicio' },
      },
      {
        path: 'obras',
        name: 'obras',
        component: () => import('pages/Obras.vue'),
        meta: { title: 'Obras' },
      },
      {
        path: 'muestras',
        name: 'muestras',
        component: () => import('pages/Muestras.vue'),
        meta: { title: 'Muestras' },
      },
      {
        path: 'profesora',
        name: 'profesora',
        component: () => import('pages/Profesora.vue'),
        meta: { title: 'Profesora Moni' },
      },
      {
        path: 'alumnos',
        name: 'alumnos',
        component: () => import('pages/Alumnos.vue'),
        meta: { title: 'Alumnos' },
      },
      {
        path: 'egresados',
        name: 'egresados',
        component: () => import('pages/Egresados.vue'),
        meta: { title: 'Egresados' },
      },
      {
        path: 'inscripciones',
        name: 'inscripciones',
        component: () => import('pages/Inscripciones.vue'),
        meta: { title: 'Inscripciones' },
      },
      {
        path: 'contacto',
        name: 'contacto',
        component: () => import('pages/Contacto.vue'),
        meta: { title: 'Contacto' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

router.afterEach((to) => {
  const base = 'Arte Kizur'
  document.title = to.meta.title ? `${to.meta.title} · ${base}` : base
})

export default router
