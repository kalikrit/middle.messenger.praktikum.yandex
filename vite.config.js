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
      input: {
        index: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        registration: resolve(__dirname, 'src/pages/registration/registration.html'),
        chatlist: resolve(__dirname, '/src/pages/chatlist/chatlist.html'),
        usersettings: resolve(__dirname, '/src/pages/usersettings/usersettings.html'),
        error404: resolve(__dirname, '/src/pages/errors/404.html'),
        error500: resolve(__dirname, '/src/pages/errors/500.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: 'index.html'
  }
})
