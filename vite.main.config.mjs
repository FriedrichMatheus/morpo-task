import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['better-sqlite3'], // <- impede Vite de tentar empacotar o módulo nativo
    },
  },
});;
