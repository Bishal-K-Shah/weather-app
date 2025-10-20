import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Update base to your repository name for GitHub Pages
  // e.g., if your repo is https://github.com/username/weather-dashboard
  // then base should be '/weather-dashboard/'
  base: process.env.NODE_ENV === 'production' ? '/weather-app/' : '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
