/** Purely visual mock of the Vita Fly Sites builder for the landing hero. */
export default function MockEditor() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-brand-500/12 via-flare-500/10 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
        <div className="flex items-center gap-2 border-b border-ink-900/5 bg-ink-900/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] text-ink-700/70">
            vita-fly-sites.app/dashboard/new
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <div className="rounded-xl border border-ink-900/5 bg-ink-900/[0.02] p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-700/50">
                Your brief
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-800">
                “Café Aurora — a neighbourhood café in Lisbon. Seasonal menu, in-house roasting,
                bookings for private dinners.”
              </p>
            </div>

            <div className="rounded-xl border border-ink-900/5 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-700/50">Tone</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['Professional', 'Friendly', 'Bold'].map((tone, index) => (
                  <span
                    key={tone}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      index === 1 ? 'bg-brand-600 text-white' : 'bg-ink-900/[0.05] text-ink-800'
                    }`}
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-ink-900/5 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-700/50">Palette</p>
              <div className="mt-2 flex gap-2">
                {['#4f46e5', '#e2564a', '#12895a', '#7c3aed', '#0e7490'].map((colour, index) => (
                  <span
                    key={colour}
                    className={`h-6 w-6 rounded-full ring-2 ${
                      index === 0 ? 'ring-ink-900/30' : 'ring-transparent'
                    }`}
                    style={{ backgroundColor: colour }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-ink-950 p-3.5 text-white">
              <p className="text-[11px] text-white/60">Generating</p>
              <p className="mt-1 text-[12.5px] font-medium">Composing 6 sections…</p>
              <span className="mt-2.5 block h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <span className="block h-full w-4/5 rounded-full bg-gradient-to-r from-brand-400 to-flare-400" />
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-ink-900/5 bg-white">
            <div className="flex items-center justify-between border-b border-ink-900/5 px-3.5 py-2.5">
              <span className="text-[12px] font-semibold text-ink-950">Café Aurora</span>
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[10.5px] font-semibold text-white">
                Book a table
              </span>
            </div>
            <div className="space-y-3.5 p-4">
              <div>
                <p className="text-[15px] font-semibold leading-snug text-ink-950">
                  Food made fresh, every single day
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-700/70">
                  Seasonal dishes, small-batch roasting and a room that feels like home.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Seasonal menu', 'Private dining', 'Bakery'].map((label) => (
                  <div key={label} className="rounded-lg border border-ink-900/5 bg-ink-900/[0.02] p-2.5">
                    <span className="block h-1.5 w-6 rounded-full bg-brand-500" />
                    <p className="mt-2 text-[10.5px] font-semibold text-ink-900">{label}</p>
                    <span className="mt-1.5 block h-1.5 w-full rounded-full bg-ink-900/10" />
                    <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-ink-900/10" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-950 px-3.5 py-3">
                <div>
                  <p className="text-[10.5px] text-white/55">Average guest rating</p>
                  <p className="text-lg font-semibold text-white">4.9</p>
                </div>
                <div>
                  <p className="text-[10.5px] text-white/55">Open every week</p>
                  <p className="text-lg font-semibold text-white">7 days</p>
                </div>
                <div>
                  <p className="text-[10.5px] text-white/55">Seats</p>
                  <p className="text-lg font-semibold text-white">120</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-ink-700/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Preview ready · 6 sections · mobile checked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
