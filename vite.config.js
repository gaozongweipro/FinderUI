import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等

      imports: ['vue'],

      // 生成自动导入的类型声明文件

      dts: 'src/auto-imports.d.ts',

      // 自动导入目录下的模块

      dirs: ['src/composables/**', 'src/stores/**'],

      // 配置文件生成位置

      eslintrc: {
        enabled: true,

        filepath: './.eslintrc-auto-import.json',

        globalsPropValue: true
      }
    })
  ],

  root: './',

  server: {
    port: 3000,

    open: true,

    deps: {
      inline: ['element-plus']
    }
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
