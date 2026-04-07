import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: [],

    css: ['app.scss'],

    extras: ['roboto-font', 'material-icons'],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari16'],
      },
      vueRouterMode: 'history',
    },

    extendViteConf(viteConf) {
      viteConf.build = viteConf.build || {}
      viteConf.build.target = 'es2022'
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {
        brand: {
          primary: '#F2BB2D',
          secondary: '#1a1a1a',
          accent: '#8B6914',
          dark: '#121212',
          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037',
        },
      },
      plugins: [],
    },
  }
})
