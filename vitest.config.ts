import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'languine.json': path.resolve(__dirname, 'languine.json'),
    },
  },
  test: {
    environment: 'node',
  },
})
