import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuration for static build (GitHub Pages)
export default defineConfig({
  plugins: [react()],
  root: 'client',
  base: './', // Relative paths for GitHub Pages
  build: {
    outDir: '../dist-static',
    emptyOutDir: true,
    rollupOptions: {
      input: 'client/index.html'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'client/src/assets'),
    },
  },
  define: {
    global: 'globalThis',
  },
})