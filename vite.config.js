import { resolve } from 'path';
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
    context: {global: 'global'}
    })
  ],
  build: {
    rollupOptions: {
      outDir: resolve(__dirname, 'dist'),
      input: {
        index: resolve(__dirname, '/')
      }
    }
  },
  server: {
    port: 3000,
    open: '/'
  }
})
