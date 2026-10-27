import Link from 'next/link';

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#templates', label: 'Templates' },
  { href: '/#pricing', label: 'Pricing' },
];

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-flare-500 text-sm font-bold text-white shadow-glow">
        VF
      </span>
      <span className={`text-[15px] font-semibold tracking-tight ${inverted ? 'text-white' : 'text-ink-900'}`}>
        Vita Fly Sites
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <BrandMark />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-700/70 transition hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-ink-800 transition hover:text-brand-600 sm:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-800"
          >
            Start free
          </Link>
        </div>
      </div>

      <details className="border-t border-ink-900/5 px-5 md:hidden">
        <summary className="cursor-pointer list-none py-2.5 text-sm font-medium text-ink-700">
          Menu
        </summary>
        <nav className="flex flex-col gap-3 pb-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-ink-700">
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="text-sm font-medium text-brand-600">
            Log in
          </Link>
        </nav>
      </details>
    </header>
  );
}
