import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise chunk size warning threshold (large images are expected)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('@emailjs')) {
            return 'vendor-emailjs';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
