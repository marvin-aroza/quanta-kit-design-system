import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lit', 'lit/directive-helpers.js'],
  },
  build: {
    rollupOptions: {
      external: ['lit', 'lit/directive-helpers.js'],
    },
  },
});
