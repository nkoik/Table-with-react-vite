/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      pages: path.resolve(__dirname, './src/pages'),
      types: `${path.resolve(__dirname, './src/types')}`,
      hooks: `${path.resolve(__dirname, './src/hooks')}`
    }
  },
  server: {
    port: 8080
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.ts'
  }
})
