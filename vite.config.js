import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/wa-api': {
        target: 'https://7105.api.greenapi.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wa-api/, '')
      },
      '/api': {
        target: 'https://api.green-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
