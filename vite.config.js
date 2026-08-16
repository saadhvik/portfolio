import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'terser',
    // Drop chatty logs but keep console.warn/error: three.js reports shader
    // compile failures through them, and silencing those hides real breakage.
    terserOptions: { compress: { pure_funcs: ['console.log', 'console.debug', 'console.info'] } },
    rollupOptions: {
      output: {
        // Keep three/r3f out of the entry chunk so the hero text paints first.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
