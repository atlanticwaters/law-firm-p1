import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves any /api/* serverless function during `vite dev` so API endpoints work
// locally exactly as they do on Vercel. In production Vercel runs api/*.js as
// Functions; Vite does not, hence this shim.
function apiDevServer(env) {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      // Make the server-side keys available to the handler in dev. Vite loads
      // .env into `env` but not into process.env, so bridge it here.
      if (!process.env.ANTHROPIC_API_KEY && env.ANTHROPIC_API_KEY) {
        process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY
      }
      if (!process.env.RESEND_API_KEY && env.RESEND_API_KEY) {
        process.env.RESEND_API_KEY = env.RESEND_API_KEY
      }
      if (!process.env.INQUIRY_TO_EMAIL && env.INQUIRY_TO_EMAIL) {
        process.env.INQUIRY_TO_EMAIL = env.INQUIRY_TO_EMAIL
      }
      if (!process.env.INQUIRY_FROM_EMAIL && env.INQUIRY_FROM_EMAIL) {
        process.env.INQUIRY_FROM_EMAIL = env.INQUIRY_FROM_EMAIL
      }
      // Register directly (not via a returned function) so this runs before
      // Vite's SPA history fallback and /api/* isn't rewritten to index.html.
      server.middlewares.use('/api', async (req, res, next) => {
        const name = req.url.split('?')[0].replace(/^\/+/, '').replace(/\/+$/, '')
        const file = `./api/${name}.js`
        try {
          const mod = await import(new URL(file, import.meta.url).pathname)
          await mod.default(req, res)
        } catch (err) {
          if (err && err.code === 'ERR_MODULE_NOT_FOUND') { next(); return }
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err?.message || 'Dev handler error.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), apiDevServer(env)],
  }
})
