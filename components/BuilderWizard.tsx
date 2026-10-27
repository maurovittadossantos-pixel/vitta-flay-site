'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { INDUSTRIES, PALETTES, TONES } from '@/lib/catalog';

const STEPS = ['The business', 'Voice & colour', 'Review'] as const;

const PROGRESS = [
  'Reading your brief…',
  'Choosing the section order…',
  'Writing the copy…',
  'Applying the palette…',
  'Checking the mobile layout…',
];

export default function BuilderWizard({ company }: { company: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState(company);
  const [industry, setIndustry] = useState(INDUSTRIES[0].id);
  const [tagline, setTagline] = useState('');
  const [tone, setTone] = useState<string>(TONES[1].id);
  const [palette, setPalette] = useState(PALETTES[0].id);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!generating) return;
    const timer = setInterval(() => setProgress((value) => Math.min(value + 1, PROGRESS.length - 1)), 1400);
    return () => clearInterval(timer);
  }, [generating]);

  const selectedIndustry = INDUSTRIES.find((item) => item.id === industry) ?? INDUSTRIES[0];
  const selectedTone = TONES.find((item) => item.id === tone) ?? TONES[0];
  const selectedPalette = PALETTES.find((item) => item.id === palette) ?? PALETTES[0];

  function next() {
    if (step === 0 && businessName.trim().length < 2) {
      setError('Please enter the business name.');
      return;
    }
    setError(null);
    setStep((value) => Math.min(value + 1, STEPS.length - 1));
  }

  async function generate() {
    setGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ businessName: businessName.trim(), industry, tagline, tone, palette }),
      });
      const data = (await response.json()) as { site?: { id: string }; error?: string };

      if (!response.ok || !data.site) {
        setError(data.error ?? 'Generation failed. Please try again.');
        setGenerating(false);
        return;
      }

      router.push(`/dashboard/sites/${data.site.id}`);
      router.refresh();
    } catch {
      setError('We could not reach the server. Please try again.');
      setGenerating(false);
    }
  }

  if (generating) {
    return (
      <div className="rounded-2xl border border-ink-900/5 bg-white p-10 text-center shadow-card">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-flare-500 text-lg font-bold text-white">
          VF
        </span>
        <h2 className="mt-6 text-lg font-semibold text-ink-950">
          Building {businessName || 'your site'}…
        </h2>
        <p className="mt-2 text-sm text-ink-700/70">{PROGRESS[progress]}</p>
        <span className="mx-auto mt-6 block h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-ink-900/10">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-flare-500 transition-all duration-700"
            style={{ width: `${((progress + 1) / PROGRESS.length) * 100}%` }}
          />
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink-900/5 bg-white shadow-card">
      <ol className="flex flex-wrap gap-3 border-b border-ink-900/5 px-6 py-4">
        {STEPS.map((label, index) => (
          <li key={label} className="flex items-center gap-2 text-sm">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${
                index <= step ? 'bg-brand-600 text-white' : 'bg-ink-900/[0.06] text-ink-700/60'
              }`}
            >
              {index + 1}
            </span>
            <span className={index === step ? 'font-semibold text-ink-950' : 'text-ink-700/65'}>{label}</span>
            {index < STEPS.length - 1 && <span className="text-ink-900/15">—</span>}
          </li>
        ))}
      </ol>

      <div className="p-6">
        {step === 0 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-900">Business name</span>
              <input
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Café Aurora"
                className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </label>

            <div>
              <span className="mb-2 block text-sm font-medium text-ink-900">Industry</span>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {INDUSTRIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndustry(item.id)}
                    className={`rounded-xl border px-3.5 py-3 text-left transition ${
                      industry === item.id
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-ink-900/10 hover:border-ink-900/25'
                    }`}
                  >
                    <span className="block text-sm font-medium text-ink-950">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-ink-700/60">{item.blurb}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-900">
                What makes you different? <span className="text-ink-700/50">(optional)</span>
              </span>
              <textarea
                value={tagline}
                onChange={(event) => setTagline(event.target.value)}
                rows={3}
                maxLength={180}
                placeholder="Seasonal dishes, small-batch roasting and a room that feels like home."
                className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
              <span className="mt-1 block text-xs text-ink-700/50">{tagline.length}/180 characters</span>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="mb-2 block text-sm font-medium text-ink-900">Tone of voice</span>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {TONES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id)}
                    className={`rounded-xl border px-3.5 py-3 text-left transition ${
                      tone === item.id ? 'border-brand-500 bg-brand-50' : 'border-ink-900/10 hover:border-ink-900/25'
                    }`}
                  >
                    <span className="block text-sm font-medium text-ink-950">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-ink-700/60">{item.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-ink-900">Colour palette</span>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {PALETTES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPalette(item.id)}
                    className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                      palette === item.id ? 'border-brand-500 bg-brand-50' : 'border-ink-900/10 hover:border-ink-900/25'
                    }`}
                  >
                    <span className="flex gap-1">
                      {[item.accent, item.ink, item.muted].map((colour) => (
                        <span
                          key={colour}
                          className="h-5 w-5 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: colour }}
                        />
                      ))}
                    </span>
                    <span className="text-sm font-medium text-ink-950">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ['Business', businessName],
                ['Industry', selectedIndustry.label],
                ['Tone', selectedTone.label],
                ['Palette', selectedPalette.label],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-ink-900/5 bg-ink-900/[0.02] px-4 py-3">
                  <dt className="text-xs uppercase tracking-wide text-ink-700/55">{label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink-950">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-xl border border-ink-900/5 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-ink-700/55">Your tagline</p>
              <p className="mt-1 text-sm text-ink-900">
                {tagline.trim() || selectedIndustry.subheadline}
              </p>
            </div>
            <p className="text-sm text-ink-700/70">
              The engine will compose {selectedIndustry.services.length + 4} sections, write the copy in a{' '}
              {selectedTone.label.toLowerCase()} voice and apply the {selectedPalette.label} palette.
            </p>
          </div>
        )}

        {error && (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink-900/5 pt-6">
          <button
            type="button"
            onClick={() => setStep((value) => Math.max(value - 1, 0))}
            disabled={step === 0}
            className="rounded-full border border-ink-900/10 px-5 py-2.5 text-sm font-medium text-ink-800 transition hover:border-ink-900/25 disabled:opacity-40"
          >
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={generate}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Generate my website
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
