import { defineConfig } from 'vite'

// The Base44 sandbox preview expects the dev server to listen on port 3000 and
// accept requests from outside the container. Allowed hostnames are supplied by
// the platform through __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS, which Vite >= 6.1
// appends to `server.allowedHosts`.
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
})
