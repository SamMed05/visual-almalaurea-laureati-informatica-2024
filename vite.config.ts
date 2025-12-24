import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/visual-almalaurea-laureati-informatica-2024/',
  plugins: [react()],
  server: {
    port: 5174,
  },
})
