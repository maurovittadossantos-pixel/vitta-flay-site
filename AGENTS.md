# Repository notes

## What this repo contains

The repository was imported with only `README.md` — no application code, no
package manifest and no entry point, which is why the Base44 preview could never
start (nothing listened on port 3000). The Base44 setup added a minimal
**Vite** static site (`index.html` + `src/styles.css`) as a runnable starting
point.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Web entry point: <http://localhost:3000> — Vite dev server, live reload, source
  bind-mounted from the repo, so edits appear without rebuilding.
- `npm install` runs at container startup (see the compose `command`) and
  installs into the `web_node_modules` named volume, so the sandbox disk and the
  repo stay clean. Keep `package.json`/`package-lock.json` in the image's
  mounted source — they are part of the bind mount.
- One-off checks run inside the container, e.g.
  `docker compose -f docker-compose.base44.yml exec -T web npx vite build`.

## Sandbox-only overrides

- `BASE44_PREVIEW_MODE` is supplied by the platform and passed through bare; the
  compose file sets no default for it. Nothing in the app depends on it yet —
  the flag exists so sandbox-specific behaviour can be gated on
  `process.env.BASE44_PREVIEW_MODE === '1'` if it is ever needed.
- Reverse-proxy requests reach the container with a rotated external `Host`
  (`<port>-<sandbox id>.e2b.app`), so Vite must accept it: the platform sets
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (currently `.e2b.app`) and Vite >= 6.1
  appends it to `server.allowedHosts`. It is passed through bare in compose; with
  the variable unset, Vite keeps its default (localhost only) behaviour.

## Verifying the app works

```bash
curl -fsS http://localhost:3000/ | grep -q '<title>Vita Fly Site</title>'
```

A served page means the dev server booted. `docker compose -f
docker-compose.base44.yml ps` should show `web` as healthy.
