import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: false,
    hmr: {
      overlay: true,
      timeout: 30000
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    middlewareMode: false,
    cors: true
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    force: true
  },
  esbuild: {
    logLevel: 'warning',
    treeShaking: true
  }
})
