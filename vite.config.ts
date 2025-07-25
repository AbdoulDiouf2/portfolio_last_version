import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this matches your GitHub Pages subdirectory
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
