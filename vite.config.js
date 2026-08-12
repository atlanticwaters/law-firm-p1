import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves the /api/chat serverless function during `vite dev` so the chat
// assistant works locally exactly as it does on Vercel. In production Vercel
// runs api/chat.js as a Function; Vite does not, hence this shim.
function apiDevServer(env) {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      // Make the server-side key available to the handler in dev. Vite loads
      // .env into `env` but not into process.env, so bridge it here.
      if (!process.env.ANTHROPIC_API_KEY && env.ANTHROPIC_API_KEY) {
        process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY
      }
      // Register directly (not via a returned function) so this runs before
      // Vite's SPA history fallback and /api/chat isn't rewritten to index.html.
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const { default: handler } = await import('./api/chat.js')
          await handler(req, res)
        } catch (err) {
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
