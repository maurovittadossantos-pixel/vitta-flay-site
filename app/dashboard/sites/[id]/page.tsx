import Link from 'next/link';
import { notFound } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import SiteActions from '@/components/SiteActions';
import { requireUser } from '@/lib/auth';
import { getIndustry, getPalette, getTone } from '@/lib/catalog';
import { getSite } from '@/lib/sites';

export const dynamic = 'force-dynamic';

export default async function SiteDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const site = await getSite(user.id, params.id);
  if (!site) notFound();

  const industry = getIndustry(site.industry);
  const palette = getPalette(site.palette);

  return (
    <div className="min-h-screen bg-ink-900/[0.02]">
      <DashboardHeader name={user.name} email={user.email} />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link href="/dashboard" className="text-sm text-ink-700/70 transition hover:text-ink-900">
          ← All websites
        </Link>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink-950">{site.business_name}</h1>
            <p className="mt-1.5 text-sm text-ink-700/70">
              {industry.label} · {getTone(site.tone).label} voice · {palette.label} palette ·{' '}
              {site.engine === 'ai' ? 'AI-written copy' : 'engine copy'}
            </p>
          </div>
          <SiteActions siteId={site.id} slug={site.slug} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-ink-900/5 px-4 py-3">
              <span className="text-sm font-medium text-ink-900">Live preview</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Published at /p/{site.slug}
              </span>
            </div>
            <div className="h-[620px] w-full bg-ink-900/[0.03] p-3">
              <iframe
                title={`${site.business_name} preview`}
                src={`/api/sites/${site.id}/html`}
                className="h-full w-full rounded-xl border border-ink-900/5 bg-white"
              />
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card">
              <h2 className="text-sm font-semibold text-ink-950">Brief</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-700/55">Tagline</dt>
                  <dd className="mt-1 text-ink-900">{site.tagline || industry.subheadline}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-700/55">Generated</dt>
                  <dd className="mt-1 text-ink-900">{new Date(site.created_at).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-700/55">Last updated</dt>
                  <dd className="mt-1 text-ink-900">{new Date(site.updated_at).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-700/55">Public address</dt>
                  <dd className="mt-1 break-all font-mono text-xs text-ink-800">/p/{site.slug}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card">
              <h2 className="text-sm font-semibold text-ink-950">What the engine produced</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-800">
                {industry.services.map((service) => (
                  <li key={service.title} className="flex gap-2.5">
                    <span className="mt-0.5 text-brand-500">•</span>
                    <span>{service.title}</span>
                  </li>
                ))}
                <li className="flex gap-2.5">
                  <span className="mt-0.5 text-brand-500">•</span>
                  <span>Stats, testimonial and contact sections</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-ink-700/60">
                Regenerate to refresh the copy, or download the HTML and edit it directly.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
