import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      'rxjs',
      'zone.js'
    ],
    exclude: [
      '@angular/animations/browser'
    ]
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {
      external: ['@angular/animations/browser'],
      output: {
        manualChunks: {
          vendor: ['@angular/core', '@angular/common'],
          rxjs: ['rxjs']
        }
      }
    }
  }
});
