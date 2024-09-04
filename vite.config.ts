import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode }) => {
  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 5174,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true,
        },
      }
    },
    
  }
})
