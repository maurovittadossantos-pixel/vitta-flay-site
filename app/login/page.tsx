import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { BrandMark } from '@/components/SiteHeader';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/dashboard');

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <BrandMark />
          <h1 className="mt-10 text-3xl font-semibold tracking-tight text-ink-950">Welcome back</h1>
          <p className="mt-2 text-sm text-ink-700/75">
            Log in to see your generated sites and start a new one.
          </p>
          <div className="mt-8">
            <AuthForm mode="login" />
          </div>
          <p className="mt-8 text-center text-xs text-ink-700/60">
            <Link href="/" className="hover:text-ink-900">
              ← Back to the homepage
            </Link>
          </p>
        </div>
      </div>

      <aside className="hidden bg-ink-950 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <blockquote className="max-w-md">
          <p className="text-2xl font-medium leading-snug">
            “We replaced a six-week website project with a four-minute brief.”
          </p>
          <footer className="mt-6 text-sm text-white/60">
            Íris Domingos — Partner, Studio Vale
          </footer>
        </blockquote>
        <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {[
            ['10', 'Industry playbooks'],
            ['6', 'Palettes'],
            ['1', 'Minute to brief'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="text-2xl font-semibold">{value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-white/50">{label}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </main>
  );
}
