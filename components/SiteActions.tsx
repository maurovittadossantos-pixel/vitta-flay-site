'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SiteActions({ siteId, slug }: { siteId: string; slug: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<'regenerate' | 'delete' | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publicUrl = `/p/${slug}`;

  async function copyLink() {
    const absolute = `${window.location.origin}${publicUrl}`;
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Copy failed — select the link and copy it manually.');
    }
  }

  async function regenerate() {
    setBusy('regenerate');
    setError(null);
    const response = await fetch(`/api/sites/${siteId}`, { method: 'POST' });
    setBusy(null);
    if (!response.ok) {
      setError('Regeneration failed. Please try again.');
      return;
    }
    router.refresh();
  }

  async function remove() {
    if (!window.confirm('Delete this site? The public preview link will stop working.')) return;
    setBusy('delete');
    setError(null);
    const response = await fetch(`/api/sites/${siteId}`, { method: 'DELETE' });
    if (!response.ok) {
      setBusy(null);
      setError('We could not delete this site. Please try again.');
      return;
    }
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`${publicUrl}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium text-ink-800 transition hover:border-ink-900/25"
      >
        Open live page
      </a>
      <a
        href={`/api/sites/${siteId}/html?download=1`}
        className="rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium text-ink-800 transition hover:border-ink-900/25"
      >
        Download HTML
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium text-ink-800 transition hover:border-ink-900/25"
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
      <button
        type="button"
        onClick={regenerate}
        disabled={busy !== null}
        className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {busy === 'regenerate' ? 'Regenerating…' : 'Regenerate'}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={busy !== null}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-60"
      >
        {busy === 'delete' ? 'Deleting…' : 'Delete'}
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </div>
  );
}
