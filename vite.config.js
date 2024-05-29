import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Habilitar mapas de fuentes para la construcción
  },
  server: {
    ost: '127.0.0.1'
  }
})
