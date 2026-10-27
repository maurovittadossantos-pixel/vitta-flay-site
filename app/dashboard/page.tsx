import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import { requireUser } from '@/lib/auth';
import { getIndustry, getPalette, getTone } from '@/lib/catalog';
import { listSites } from '@/lib/sites';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await requireUser();
  const sites = await listSites(user.id);

  return (
    <div className="min-h-screen bg-ink-900/[0.02]">
      <DashboardHeader name={user.name} email={user.email} />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink-950">Your websites</h1>
            <p className="mt-1.5 text-sm text-ink-700/70">
              {sites.length === 0
                ? 'Nothing generated yet — your first site takes about a minute.'
                : `${sites.length} generated ${sites.length === 1 ? 'site' : 'sites'}.`}
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Generate a new site
          </Link>
        </div>

        {sites.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-ink-900/15 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-ink-950">No sites yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-700/70">
              Describe your business, pick a tone and a palette, and Vita Fly Sites will write and lay
              out a complete website for you.
            </p>
            <Link
              href="/dashboard/new"
              className="mt-6 inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              Start my first site
            </Link>
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => {
              const palette = getPalette(site.palette);
              return (
                <li key={site.id}>
                  <Link
                    href={`/dashboard/sites/${site.id}`}
                    className="block h-full overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card transition hover:-translate-y-0.5"
                  >
                    <div
                      className="flex h-28 items-end p-4"
                      style={{ background: `linear-gradient(135deg, ${palette.accent}22, ${palette.accent}05)` }}
                    >
                      <div className="flex gap-1.5">
                        {[palette.ink, palette.accent, palette.muted].map((colour) => (
                          <span
                            key={colour}
                            className="h-4 w-4 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: colour }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-ink-900/5 p-5">
                      <h2 className="truncate text-base font-semibold text-ink-950">{site.business_name}</h2>
                      <p className="mt-1 text-xs text-ink-700/60">
                        {getIndustry(site.industry).label} · {palette.label} · {getTone(site.tone).label}
                      </p>
                      <p className="mt-3 line-clamp-2 text-sm text-ink-700/75">{site.tagline || 'No tagline'}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-ink-700/55">
                        <span>{new Date(site.created_at).toLocaleDateString()}</span>
                        <span className="rounded-full bg-ink-900/[0.04] px-2.5 py-1 font-medium">
                          {site.engine === 'ai' ? 'AI copy' : 'Engine copy'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
