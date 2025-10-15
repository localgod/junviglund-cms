import {defineConfig} from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3333,
    strictPort: false,
    hmr: {
      clientPort: 3333,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3333,
  },
})
