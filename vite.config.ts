import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      'next/navigation': path.resolve(__dirname, 'src/mocks/next-router.ts'),
      'next/image': path.resolve(__dirname, 'src/mocks/next-image.tsx'),
    },
  },
  css: {
    postcss: './postcss.config.mjs',
  },
})
