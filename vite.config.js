import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700, // optional (warning reduce)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase'],
          motion: ['framer-motion'],
          swiper: ['swiper'],
          icons: ['react-icons'],
        },
      },
    },
  },
})