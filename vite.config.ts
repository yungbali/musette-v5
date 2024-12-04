import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './amplify_outputs.json': '/src/amplify_outputs.json'
    }
  },
  json: {
    stringify: true
  }
});
