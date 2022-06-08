import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString()
        }
      },
      // chunkFileNames: chunkInfo => {
      //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
      //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
      //   return `js/${fileName}/[name].[hash].js`
      // },
    },
  },
})
