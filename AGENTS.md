# Vita Fly Sites — working notes

This repository was created by importing an empty GitHub repo into Base44, so it carries a
sandbox runbook (`docker-compose.base44.yml`, `.base44/environment.json`) alongside the app code.

## Running the app in Base44

```bash
docker compose -f docker-compose.base44.yml up -d --build   # web on http://localhost:3000
docker compose -f docker-compose.base44.yml ps -a
docker compose -f docker-compose.base44.yml logs -f web
```

Service roles:

- `db` — PostgreSQL 16, data in the `db_data` volume. Credentials are local development values
  written inline in the compose file (not user secrets).
- `deps` — one-shot `npm ci` into the `app_node_modules` volume, run after the bind mount is
  available. `web` and `migrate` wait for it. After adding a dependency, re-run it:
  `docker compose -f docker-compose.base44.yml run --rm deps`.
- `web` — `next dev` from the bind-mounted source (live reload). Runs as `node:20`; the sandbox
  host has no Node runtime, so run every script with
  `docker compose -f docker-compose.base44.yml exec -T web <command>`.
- `migrate` — one-shot `node scripts/migrate.mjs`, applies `db/schema.sql` (idempotent). The app
  returns errors on every DB-backed page until it has completed at least once.

## Environment

- `SESSION_SECRET` signs the login cookie. Real value comes from the app's secrets via
  `/run/base44/app.env` (listed last in `env_file`, so it wins); `.env.base44-defaults` holds a
  committed development placeholder so the stack boots on a fresh checkout.
- `OPENAI_API_KEY` is optional: when present, `lib/ai.ts` asks the model to rewrite the headline,
  subheadline, about and CTA copy. Without it the built-in catalog in `lib/catalog.ts` supplies
  the copy, so generation always returns a complete site.
- `BASE44_PREVIEW_MODE` is passed through from the platform and is read only by
  `next.config.mjs`-adjacent sandbox wiring; app behaviour is unchanged when it is unset.

## How it fits together

- `lib/catalog.ts` — 10 industry playbooks, 5 tones, 6 palettes.
- `lib/generator.ts` — builds the copy and renders a self-contained HTML site (inline CSS, no
  external assets).
- `lib/sites.ts` — persistence for sites (create, list, get, regenerate, delete).
- `lib/auth.ts` — scrypt password hashing plus an HMAC-signed session cookie (`vfs_session`).
- `app/api/*` — auth and site JSON endpoints; `app/api/sites/[id]/html` also serves the download.
- `app/p/[slug]/route.ts` — public address of every generated site.

## Verifying changes

- No test suite in the repo. The check that covers the app code is the type checker:
  `docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit`.
- End-to-end: open `http://localhost:3000`, create an account at `/signup`, then generate a site
  from `/dashboard/new`. The generated site is served at `/p/<slug>` and inside the dashboard
  preview iframe (`/api/sites/<id>/html`); `/p/<unknown-slug>` returns 404.
- The "Delete" action opens a native browser confirmation dialog, which blocks headless preview
  automation at that point — the delete handler itself can still be exercised through
  `DELETE /api/sites/<id>`.

## Gotchas

- `next dev` must bind `0.0.0.0:3000` (see the `dev` script) and needs `WATCHPACK_POLLING=true`
  for hot reload over the bind mount.
- Sample marketing copy in `app/page.tsx` (pricing tiers, testimonials, FAQ) is placeholder
  content, not the project's real commercial terms.
