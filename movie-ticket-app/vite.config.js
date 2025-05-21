<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
=======
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
>>>>>>> origin/dev

export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()]
})
=======
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
>>>>>>> origin/dev
