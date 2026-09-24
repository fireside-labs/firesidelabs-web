import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Two documents: index.html is the static homepage, app.html is the React app
// that serves every other route. In dev, send extension-less routes other than
// "/" to app.html, which is what the vercel.json rewrite does in production.
const toApp = (req: { url?: string }, _res: unknown, next: () => void) => {
  const path = (req.url ?? '/').split('?')[0]
  const isAppRoute =
    path !== '/' &&
    !path.includes('.') &&
    !path.startsWith('/@') &&
    !/^\/(src|node_modules|papers|film|home|wayward)\//.test(path)
  if (isAppRoute) req.url = '/app.html'
  next()
}

const appRoutes = (): Plugin => ({
  name: 'app-routes',
  configureServer(server) {
    server.middlewares.use(toApp)
  },
  configurePreviewServer(server) {
    server.middlewares.use(toApp)
  },
})

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [
    tailwindcss(),
    react(),
    appRoutes(),
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
      },
    },
  },
})
