import { randomUUID } from 'node:crypto';
import { getIndustry, getPalette, getTone } from './catalog';
import { refineCopy } from './ai';
import { buildCopy, renderSiteHtml, slugify, type SiteBrief } from './generator';
import { getPool, type Site, type SiteSummary } from './db';

const SITE_COLUMNS =
  'id, user_id, slug, business_name, industry, tagline, tone, palette, engine, created_at, updated_at';

export type SiteInput = {
  businessName: string;
  industry: string;
  tagline: string;
  tone: string;
  palette: string;
};

export function parseSiteInput(body: unknown): { brief: SiteBrief; error?: string } {
  const data = (body ?? {}) as Record<string, unknown>;
  const businessName = typeof data.businessName === 'string' ? data.businessName.trim() : '';
  const industry = typeof data.industry === 'string' ? data.industry : '';
  const tone = typeof data.tone === 'string' ? data.tone : '';
  const palette = typeof data.palette === 'string' ? data.palette : '';
  const tagline = typeof data.tagline === 'string' ? data.tagline.trim().slice(0, 180) : '';

  if (businessName.length < 2) return { brief: { businessName, industry, tagline, tone, palette }, error: 'Enter your business name.' };
  if (!getIndustry(industry) || industry !== getIndustry(industry).id)
    return { brief: { businessName, industry, tagline, tone, palette }, error: 'Choose an industry.' };
  if (tone !== getTone(tone).id) return { brief: { businessName, industry, tagline, tone, palette }, error: 'Choose a tone.' };
  if (palette !== getPalette(palette).id)
    return { brief: { businessName, industry, tagline, tone, palette }, error: 'Choose a colour palette.' };

  return { brief: { businessName: businessName.slice(0, 80), industry, tagline, tone, palette } };
}

async function buildHtml(brief: SiteBrief): Promise<{ html: string; engine: string }> {
  const { copy, engine } = await refineCopy(brief, buildCopy(brief));
  return { html: renderSiteHtml(brief, copy), engine };
}

async function uniqueSlug(businessName: string): Promise<string> {
  const base = slugify(businessName);
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const candidate = `${base}-${randomUUID().slice(0, 4)}`;
    const { rowCount } = await getPool().query('SELECT 1 FROM sites WHERE slug = $1', [candidate]);
    if (rowCount === 0) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function createSite(userId: string, brief: SiteBrief): Promise<Site> {
  const { html, engine } = await buildHtml(brief);
  const slug = await uniqueSlug(brief.businessName);

  const { rows } = await getPool().query<Site>(
    `INSERT INTO sites (id, user_id, slug, business_name, industry, tagline, tone, palette, engine, html)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING ${SITE_COLUMNS}`,
    [
      randomUUID(),
      userId,
      slug,
      brief.businessName,
      brief.industry,
      brief.tagline,
      brief.tone,
      brief.palette,
      engine,
      html,
    ],
  );
  return rows[0];
}

export async function listSites(userId: string): Promise<SiteSummary[]> {
  const { rows } = await getPool().query<SiteSummary>(
    `SELECT ${SITE_COLUMNS} FROM sites WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId],
  );
  return rows;
}

export async function getSite(userId: string, siteId: string): Promise<Site | null> {
  const { rows } = await getPool().query<Site>(
    `SELECT ${SITE_COLUMNS}, html FROM sites WHERE id = $1 AND user_id = $2`,
    [siteId, userId],
  );
  return rows[0] ?? null;
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  const { rows } = await getPool().query<Site>('SELECT * FROM sites WHERE slug = $1', [slug]);
  return rows[0] ?? null;
}

export async function deleteSite(userId: string, siteId: string): Promise<boolean> {
  const { rowCount } = await getPool().query('DELETE FROM sites WHERE id = $1 AND user_id = $2', [
    siteId,
    userId,
  ]);
  return (rowCount ?? 0) > 0;
}

/** Rebuilds a site with the same brief (used by the "Regenerate" action). */
export async function regenerateSite(userId: string, siteId: string): Promise<Site | null> {
  const existing = await getSite(userId, siteId);
  if (!existing) return null;

  const brief: SiteBrief = {
    businessName: existing.business_name,
    industry: existing.industry,
    tagline: existing.tagline,
    tone: existing.tone,
    palette: existing.palette,
  };
  const { html, engine } = await buildHtml(brief);

  const { rows } = await getPool().query<Site>(
    `UPDATE sites SET html = $3, engine = $4, updated_at = now()
     WHERE id = $1 AND user_id = $2
     RETURNING ${SITE_COLUMNS}, html`,
    [siteId, userId, html, engine],
  );
  return rows[0] ?? null;
}
