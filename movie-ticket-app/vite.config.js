// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proxy': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/proxy/, '')
      }
    }
  }
});
