'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Mode = 'login' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = {
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    };
    if (mode === 'signup') {
      payload.name = String(form.get('name') ?? '');
      payload.company = String(form.get('company') ?? '');
    }

    try {
      const response = await fetch(`/api/auth/${mode === 'signup' ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        setPending(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('We could not reach the server. Please try again.');
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <>
          <Field label="Your name" name="name" type="text" autoComplete="name" required placeholder="Marta Nunes" />
          <Field
            label="Business name"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Café Aurora (optional)"
          />
        </>
      )}

      <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@business.com" />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        required
        minLength={mode === 'signup' ? 8 : undefined}
        placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
      />

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Working…' : mode === 'signup' ? 'Create my account' : 'Log in'}
      </button>

      <p className="text-center text-sm text-ink-700/70">
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Vita Fly Sites?{' '}
            <Link href="/signup" className="font-semibold text-brand-600 hover:text-brand-700">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  ...rest
}: { label: string; name: string; type: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-900">{label}</span>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-700/40 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        {...rest}
      />
    </label>
  );
}
