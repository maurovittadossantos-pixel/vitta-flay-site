import MockEditor from '@/components/MockEditor';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

const features = [
  {
    title: 'Brief it in plain language',
    text: 'Tell us the business name, the industry and what makes you different. No templates to wrestle, no page builder to learn.',
  },
  {
    title: 'Industry-aware copywriting',
    text: 'Headlines, service descriptions, social proof and calls to action written for your sector and your chosen tone of voice.',
  },
  {
    title: 'Responsive by default',
    text: 'Every generated site is built on a fluid layout that reads well on a phone, a tablet and a wide desktop screen.',
  },
  {
    title: 'Palettes that look considered',
    text: 'Six curated colour systems with matched accents and contrast, applied consistently across every section.',
  },
  {
    title: 'Yours to keep',
    text: 'Export the complete HTML, publish it from the dashboard address, or hand it to your developer as a starting point.',
  },
  {
    title: 'Regenerate, don’t rebuild',
    text: 'Change the tone or palette and regenerate. Your brief stays saved, so nothing is ever lost in the process.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Describe the business',
    text: 'Name, industry and a sentence about what you do. That is the entire brief.',
  },
  {
    number: '02',
    title: 'Choose voice and colour',
    text: 'Pick a tone and a palette. The engine adapts the writing and the visual system around them.',
  },
  {
    number: '03',
    title: 'Generate and publish',
    text: 'A complete multi-section site appears in seconds — ready to preview, share, download or refine.',
  },
];

const templates = [
  {
    name: 'Restaurant & Café',
    headline: 'Food made fresh, every single day',
    gradient: 'from-amber-100 via-orange-50 to-white',
    accent: 'bg-orange-500',
  },
  {
    name: 'Fitness & Wellness',
    headline: 'Training that fits your week',
    gradient: 'from-emerald-100 via-teal-50 to-white',
    accent: 'bg-emerald-600',
  },
  {
    name: 'Creative Agency',
    headline: 'Brands people actually remember',
    gradient: 'from-violet-100 via-indigo-50 to-white',
    accent: 'bg-violet-600',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$0',
    cadence: 'forever',
    blurb: 'For trying the engine and shipping your first page.',
    points: ['1 generated website', 'All industries and palettes', 'Public preview link', 'HTML export'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$19',
    cadence: 'per month',
    blurb: 'For a business that keeps its site current.',
    points: [
      '10 generated websites',
      'Unlimited regeneration',
      'Custom domain connection',
      'Priority generation queue',
    ],
    featured: true,
  },
  {
    name: 'Studio',
    price: '$49',
    cadence: 'per month',
    blurb: 'For agencies producing for several clients.',
    points: ['Unlimited websites', 'Client workspaces', 'White-label export', 'Email support within a day'],
    featured: false,
  },
];

const testimonials = [
  {
    quote:
      'We had a landing page live before lunch. The copy read like a person wrote it, not a template.',
    author: 'Marta Nunes',
    role: 'Owner, Café Aurora',
  },
  {
    quote:
      'I regenerate the site whenever our timetable changes. It takes four minutes and it still looks designed.',
    author: 'Daniel Okafor',
    role: 'Director, Northline Fitness',
  },
  {
    quote:
      'We use it to present concepts to clients. They see a real site instead of a mood board.',
    author: 'Íris Domingos',
    role: 'Partner, Studio Vale',
  },
];

const faqs = [
  {
    question: 'Do I need any technical skills?',
    answer:
      'No. You describe the business and pick a style; the engine writes and lays out the whole site. Developers who want to take over can export the HTML at any point.',
  },
  {
    question: 'Can I edit what it generates?',
    answer:
      'Yes. Change the tone or palette and regenerate, or export the HTML and edit it directly. Your brief is saved so you can iterate as often as you like.',
  },
  {
    question: 'What happens to my content?',
    answer:
      'Your briefs and generated sites live in your own account. Nothing is shared publicly unless you hand out the preview link for that site.',
  },
  {
    question: 'Does it work for any industry?',
    answer:
      'Ten industry playbooks ship with the engine — from restaurants and clinics to SaaS platforms and creative studios — and each brings its own copy structure and section order.',
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
      <section className="relative overflow-hidden border-b border-ink-900/5">
        <div className="glow-ring pointer-events-none absolute inset-x-0 -top-40 h-[520px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              AI website creation, in minutes
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl lg:text-[3.4rem]">
              A complete website, generated around your business.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700/75">
              Vita Fly Sites turns a one-minute brief into a polished, responsive website — with the
              words, the structure and the colour system already thought through.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
              >
                Build my site free
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-ink-900/10 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900/25"
              >
                See how it works
              </a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-900/5 pt-6">
              {[
                ['10', 'Industry playbooks'],
                ['6', 'Design palettes'],
                ['60s', 'Brief to live site'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-semibold text-ink-950">{value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wide text-ink-700/60">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <MockEditor />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            Everything a launch needs, nothing it doesn’t
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-700/75">
            The engine handles the parts that usually stall a website project: the writing, the layout,
            the mobile behaviour and the visual consistency.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card transition hover:-translate-y-0.5"
            >
              <h3 className="text-base font-semibold text-ink-950">{feature.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-700/75">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-ink-900/5 bg-ink-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps between an idea and a published site
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                <span className="text-sm font-semibold text-brand-300">{step.number}</span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              Sections that suit the business
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700/75">
              A restaurant opens with a menu and a reservation call to action. A clinic leads with
              specialties and appointment times. The engine orders the page accordingly.
            </p>
          </div>
          <a href="/signup" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Try a template →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {templates.map((template) => (
            <article key={template.name} className="overflow-hidden rounded-2xl border border-ink-900/5 shadow-card">
              <div className={`bg-gradient-to-br ${template.gradient} p-6`}>
                <div className="rounded-xl bg-white/85 p-5 shadow-sm backdrop-blur">
                  <div className={`h-2 w-10 rounded-full ${template.accent}`} />
                  <p className="mt-4 text-lg font-semibold leading-snug text-ink-950">
                    {template.headline}
                  </p>
                  <div className="mt-4 space-y-2">
                    <span className="block h-2 w-full rounded-full bg-ink-900/10" />
                    <span className="block h-2 w-4/5 rounded-full bg-ink-900/10" />
                    <span className="block h-2 w-3/5 rounded-full bg-ink-900/10" />
                  </div>
                  <div className="mt-5 flex gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${template.accent}`}>
                      Get started
                    </span>
                    <span className="rounded-full border border-ink-900/10 px-3 py-1 text-xs font-semibold text-ink-800">
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white px-6 py-5">
                <h3 className="text-sm font-semibold text-ink-950">{template.name}</h3>
                <p className="mt-1 text-xs text-ink-700/60">Industry playbook</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-y border-ink-900/5 bg-ink-900/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              Straightforward plans
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700/75">
              Start free and generate your first site today. Upgrade when you need more sites or a
              custom domain.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-7 ${
                  plan.featured
                    ? 'border-brand-500/40 bg-white shadow-glow'
                    : 'border-ink-900/5 bg-white shadow-card'
                }`}
              >
                {plan.featured && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-ink-950">{plan.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-ink-950">{plan.price}</span>
                  <span className="text-sm text-ink-700/60">{plan.cadence}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700/75">{plan.blurb}</p>
                <ul className="mt-6 space-y-3 text-sm text-ink-800">
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="mt-0.5 text-brand-500">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/signup"
                  className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    plan.featured
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'border border-ink-900/10 text-ink-900 hover:border-ink-900/25'
                  }`}
                >
                  {plan.name === 'Starter' ? 'Start free' : `Choose ${plan.name}`}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
          Businesses already flying
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="rounded-2xl border border-ink-900/5 bg-white p-7 shadow-card">
              <blockquote className="text-base leading-relaxed text-ink-900">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-ink-950">{testimonial.author}</span>
                <span className="block text-ink-700/60">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-ink-900/5 bg-ink-900/[0.02] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-950">Questions, answered</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700/75">
              Still unsure? Write your first brief — it takes a minute and you can regenerate as often
              as you like.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-ink-900/5 bg-white px-6 py-5 shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink-950">
                  {faq.question}
                  <span className="text-brand-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-700/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid-backdrop overflow-hidden rounded-3xl bg-ink-950 px-8 py-14 text-center text-white sm:px-14">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your website is one brief away
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Create an account, describe the business, and watch a finished site appear in under a
            minute. Nothing to install, nothing to configure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/signup"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
            >
              Create my free account
            </a>
            <a
              href="/login"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
            >
              I already have one
            </a>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
