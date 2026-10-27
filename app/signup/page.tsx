import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { BrandMark } from '@/components/SiteHeader';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const benefits = [
  'Generate your first complete website free',
  'Ten industry playbooks with copy included',
  'Preview, publish and export the HTML',
  'Regenerate as often as your business changes',
];

export default async function SignupPage() {
  if (await getCurrentUser()) redirect('/dashboard');

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <BrandMark />
          <h1 className="mt-10 text-3xl font-semibold tracking-tight text-ink-950">
            Build your website
          </h1>
          <p className="mt-2 text-sm text-ink-700/75">
            Create an account and generate your first site in about a minute.
          </p>
          <div className="mt-8">
            <AuthForm mode="signup" />
          </div>
          <p className="mt-8 text-center text-xs text-ink-700/60">
            <Link href="/" className="hover:text-ink-900">
              ← Back to the homepage
            </Link>
          </p>
        </div>
      </div>

      <aside className="hidden bg-ink-950 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <h2 className="text-2xl font-semibold">What you get straight away</h2>
        <ul className="mt-8 max-w-md space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm text-white/75">
              <span className="mt-0.5 text-brand-300">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="mt-14 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm leading-relaxed text-white/75">
            Every generated site is a self-contained page — no plugins, no lock-in. Take the HTML
            anywhere you like.
          </p>
        </div>
      </aside>
    </main>
  );
}
