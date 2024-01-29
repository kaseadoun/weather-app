import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://kaseadoun.github.io/weather-app/",
  plugins: [react()]
})
