'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardHeader({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <header className="border-b border-ink-900/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-flare-500 text-sm font-bold text-white">
            VF
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink-900">Vita Fly Sites</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-ink-900">{name}</p>
            <p className="text-xs text-ink-700/60">{email}</p>
          </div>
          <Link
            href="/dashboard/new"
            className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-800"
          >
            New site
          </Link>
          <button
            type="button"
            onClick={logout}
            disabled={pending}
            className="rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium text-ink-800 transition hover:border-ink-900/25 disabled:opacity-60"
          >
            {pending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </div>
    </header>
  );
}
