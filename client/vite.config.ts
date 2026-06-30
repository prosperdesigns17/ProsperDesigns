import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async') || id.includes('react-hot-toast')) {
              return 'vendor-react';
            }
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
})

