import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./src/@/') },
      {
        find: '@/components',
        replacement: path.resolve('./src/@/components/'),
      },
      { find: '@/lib', replacement: path.resolve('./src/@/lib/') },
    ],
  },
  envDir: '../',
  server: {
    host: true,
    port: 5173,
  },
});
