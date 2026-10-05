import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.prod-runtime.all-hands.dev'],
  },
  preview: {
    host: '0.0.0.0',
    port: 12000,
    allowedHosts: ['.prod-runtime.all-hands.dev'],
  },
});
