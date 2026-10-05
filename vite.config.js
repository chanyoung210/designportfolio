import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /designportfolio/; dev stays at /.
// Asset paths in src are relative (no leading slash) so they work under both.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/designportfolio/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
}))
