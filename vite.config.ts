import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@aws-amplify/data-schema-types']
  },
  resolve: {
    alias: {
      './builder': '@aws-amplify/data-schema-types/lib-esm/builder.js',
      './client': '@aws-amplify/data-schema-types/lib-esm/client.js',
      './util': '@aws-amplify/data-schema-types/lib-esm/util.js'
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
