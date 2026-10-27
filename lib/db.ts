import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL || 'postgresql://vita:vita_dev_password@db:5432/vita_fly_sites';

// Reused across hot reloads so the dev server does not leak connections.
const globalForDb = globalThis as unknown as { vitaPool?: Pool };

export function getPool(): Pool {
  if (!globalForDb.vitaPool) {
    globalForDb.vitaPool = new Pool({ connectionString, max: 8 });
  }
  return globalForDb.vitaPool;
}

export type User = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  created_at: string;
};

export type Site = {
  id: string;
  user_id: string;
  slug: string;
  business_name: string;
  industry: string;
  tagline: string;
  tone: string;
  palette: string;
  engine: string;
  html: string;
  created_at: string;
  updated_at: string;
};

export type SiteSummary = Omit<Site, 'html'>;
