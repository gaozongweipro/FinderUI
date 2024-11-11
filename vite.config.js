import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'



export default defineConfig({

  plugins: [vue()],

  root: './',

  server: {

    port: 3000,

    open: true

  },

  resolve: {

    alias: {

      '@': resolve(__dirname, 'src')

    }

  },

  build: {

    lib: {

      entry: resolve(__dirname, 'src/index.js'),

      name: 'FindUI',

      fileName: format => `find-ui.${format}.js`

    },

    rollupOptions: {

      external: ['vue', 'element-plus'],

      output: {

        globals: {

          vue: 'Vue',

          'element-plus': 'ElementPlus'

        }

      }

    }

  },

  test: {

    globals: true,

    environment: 'jsdom',

    setupFiles: ['./test/setup.js'],

    coverage: {

      provider: 'v8',

      reporter: ['text', 'json', 'html']

    },

    deps: {

      inline: ['element-plus']

    }

  }

}) 






























