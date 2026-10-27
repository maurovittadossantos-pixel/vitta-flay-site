-- Vita Fly Sites schema. Applied idempotently by scripts/migrate.mjs.

CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY,
  email         text NOT NULL UNIQUE,
  name          text NOT NULL,
  company       text,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sites (
  id            uuid PRIMARY KEY,
  user_id       uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  slug          text NOT NULL UNIQUE,
  business_name text NOT NULL,
  industry      text NOT NULL,
  tagline       text NOT NULL,
  tone          text NOT NULL,
  palette       text NOT NULL,
  engine        text NOT NULL DEFAULT 'template',
  html          text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sites_user_id_idx ON sites (user_id, created_at DESC);
