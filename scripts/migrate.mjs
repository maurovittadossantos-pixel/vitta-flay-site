// One-shot migration runner: applies db/schema.sql (idempotent) and exits.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import pg from 'pg';

const here = path.dirname(fileURLToPath(import.meta.url));
const connectionString =
  process.env.DATABASE_URL || 'postgresql://vita:vita_dev_password@db:5432/vita_fly_sites';

async function main() {
  const sql = await readFile(path.join(here, '..', 'db', 'schema.sql'), 'utf8');
  const client = new pg.Client({ connectionString });

  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      await client.connect();
      break;
    } catch (error) {
      if (attempt === 20) throw error;
      console.log(`waiting for database (attempt ${attempt})...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  await client.query(sql);
  await client.end();
  console.log('database schema is up to date');
}

main().catch((error) => {
  console.error('migration failed:', error.message);
  process.exit(1);
});
