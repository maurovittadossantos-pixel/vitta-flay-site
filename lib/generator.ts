import {
  getIndustry,
  getPalette,
  getTone,
  type Service,
  type Stat,
  type Testimonial,
} from './catalog';

export type SiteBrief = {
  businessName: string;
  industry: string;
  tagline: string;
  tone: string;
  palette: string;
};

export type SiteCopy = {
  nav: string[];
  heroEyebrow: string;
  headline: string;
  subheadline: string;
  about: string;
  services: Service[];
  stats: Stat[];
  testimonial: Testimonial;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  closer: string;
  contact: { email: string; phone: string; address: string };
};

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'site'
  );
}

/** Builds the website copy from the industry catalog plus the client's brief. */
export function buildCopy(brief: SiteBrief): SiteCopy {
  const industry = getIndustry(brief.industry);
  const tone = getTone(brief.tone);
  const slug = slugify(brief.businessName);

  return {
    nav: industry.nav,
    heroEyebrow: industry.heroEyebrow,
    headline: industry.headline,
    subheadline: brief.tagline.trim() || industry.subheadline,
    about: industry.about,
    services: industry.services,
    stats: industry.stats,
    testimonial: industry.testimonial,
    ctaTitle: industry.ctaTitle,
    ctaText: industry.ctaText,
    ctaLabel: tone.ctaLabel,
    closer: tone.closer,
    contact: {
      email: `hello@${slug}.com`,
      phone: '+1 (555) 010-2000',
      address: '123 Main Street, Your City',
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders a self-contained, responsive website for the generated copy.
 * The output has no external dependencies so it can be published anywhere.
 */
export function renderSiteHtml(brief: SiteBrief, copy: SiteCopy): string {
  const palette = getPalette(brief.palette);
  const name = escapeHtml(brief.businessName);
  const year = new Date().getFullYear();

  const navLinks = copy.nav
    .map((item, index) => `<a href="#s${index + 1}">${escapeHtml(item)}</a>`)
    .join('');

  const services = copy.services
    .map(
      (service, index) => `
        <article class="card" id="s${index + 1}">
          <span class="card-num">0${index + 1}</span>
          <h3>${escapeHtml(service.title)}</h3>
          <p>${escapeHtml(service.text)}</p>
        </article>`,
    )
    .join('');

  const stats = copy.stats
    .map(
      (stat) => `
        <div class="stat">
          <strong>${escapeHtml(stat.value)}</strong>
          <span>${escapeHtml(stat.label)}</span>
        </div>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${name} — ${escapeHtml(copy.headline)}</title>
<meta name="description" content="${escapeHtml(copy.subheadline)}" />
<style>
  :root {
    --bg: ${palette.bg};
    --surface: ${palette.surface};
    --ink: ${palette.ink};
    --muted: ${palette.muted};
    --accent: ${palette.accent};
    --accent-ink: ${palette.accentInk};
    --line: ${palette.line};
    --radius: 16px;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6; -webkit-font-smoothing: antialiased; }
  h1, h2, h3 { line-height: 1.15; margin: 0 0 16px; letter-spacing: -0.02em; }
  p { margin: 0 0 16px; color: var(--muted); }
  a { color: inherit; }
  .wrap { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 24px; }
  header { position: sticky; top: 0; z-index: 10; background: rgba(255,255,255,0.86);
    backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
  .nav { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 16px 0; }
  .brand { font-weight: 700; font-size: 1.15rem; letter-spacing: -0.02em; }
  .nav-links { display: flex; gap: 22px; font-size: 0.94rem; }
  .nav-links a { text-decoration: none; color: var(--muted); }
  .nav-links a:hover { color: var(--ink); }
  .btn { display: inline-block; padding: 13px 24px; border-radius: 999px; background: var(--accent);
    color: var(--accent-ink); text-decoration: none; font-weight: 600; font-size: 0.95rem;
    border: 1px solid transparent; }
  .btn.ghost { background: transparent; color: var(--ink); border-color: var(--line); }
  .hero { padding: 84px 0 64px; }
  .eyebrow { display: inline-block; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); font-weight: 700; margin-bottom: 18px; }
  .hero h1 { font-size: clamp(2.2rem, 5.4vw, 3.6rem); max-width: 18ch; }
  .hero p { font-size: 1.1rem; max-width: 56ch; }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
  section { padding: 72px 0; }
  .section-head { max-width: 60ch; margin-bottom: 40px; }
  .section-head h2 { font-size: clamp(1.7rem, 3.2vw, 2.3rem); }
  .grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
    padding: 28px; }
  .card-num { font-size: 0.8rem; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; }
  .card h3 { margin-top: 14px; font-size: 1.2rem; }
  .card p { margin-bottom: 0; font-size: 0.96rem; }
  .stats { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .stat { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 24px; }
  .stat strong { display: block; font-size: 1.9rem; letter-spacing: -0.03em; }
  .stat span { color: var(--muted); font-size: 0.9rem; }
  .split { display: grid; gap: 40px; grid-template-columns: 1.1fr 0.9fr; align-items: start; }
  blockquote { margin: 0; background: var(--surface); border: 1px solid var(--line);
    border-radius: var(--radius); padding: 32px; }
  blockquote p { color: var(--ink); font-size: 1.1rem; }
  blockquote footer { font-size: 0.9rem; color: var(--muted); }
  blockquote cite { font-style: normal; font-weight: 600; color: var(--ink); }
  .cta { background: var(--ink); color: #fff; border-radius: 24px; padding: 56px; }
  .cta h2 { color: #fff; }
  .cta p { color: rgba(255,255,255,0.78); max-width: 52ch; }
  .cta .btn { background: var(--accent); color: var(--accent-ink); }
  .contact { list-style: none; padding: 0; margin: 24px 0 0; font-size: 0.95rem; color: var(--muted); }
  .contact li { margin-bottom: 8px; }
  footer.site { border-top: 1px solid var(--line); padding: 32px 0; font-size: 0.88rem; color: var(--muted); }
  footer.site .wrap { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; }
  @media (max-width: 860px) {
    .split { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .cta { padding: 36px 24px; }
    .hero { padding: 56px 0 40px; }
    section { padding: 52px 0; }
  }
</style>
</head>
<body>
<header>
  <div class="wrap nav">
    <span class="brand">${name}</span>
    <nav class="nav-links">${navLinks}</nav>
    <a class="btn" href="#contact">${escapeHtml(copy.ctaLabel)}</a>
  </div>
</header>

<main>
  <section class="hero">
    <div class="wrap">
      <span class="eyebrow">${escapeHtml(copy.heroEyebrow)}</span>
      <h1>${escapeHtml(copy.headline)}</h1>
      <p>${escapeHtml(copy.subheadline)}</p>
      <div class="hero-actions">
        <a class="btn" href="#contact">${escapeHtml(copy.ctaLabel)}</a>
        <a class="btn ghost" href="#services">See what we do</a>
      </div>
    </div>
  </section>

  <section id="services">
    <div class="wrap">
      <div class="section-head">
        <h2>What we do</h2>
        <p>${escapeHtml(copy.about)}</p>
      </div>
      <div class="grid">${services}</div>
    </div>
  </section>

  <section>
    <div class="wrap stats">${stats}</div>
  </section>

  <section>
    <div class="wrap split">
      <div>
        <h2>${escapeHtml(copy.closer)}</h2>
        <p>${escapeHtml(copy.ctaText)}</p>
      </div>
      <blockquote>
        <p>“${escapeHtml(copy.testimonial.quote)}”</p>
        <footer><cite>${escapeHtml(copy.testimonial.author)}</cite> — ${escapeHtml(copy.testimonial.role)}</footer>
      </blockquote>
    </div>
  </section>

  <section id="contact">
    <div class="wrap">
      <div class="cta">
        <h2>${escapeHtml(copy.ctaTitle)}</h2>
        <p>${escapeHtml(copy.ctaText)}</p>
        <p style="margin-top:24px"><a class="btn" href="mailto:${copy.contact.email}">${escapeHtml(copy.ctaLabel)}</a></p>
        <ul class="contact">
          <li>${escapeHtml(copy.contact.email)}</li>
          <li>${escapeHtml(copy.contact.phone)}</li>
          <li>${escapeHtml(copy.contact.address)}</li>
        </ul>
      </div>
    </div>
  </section>
</main>

<footer class="site">
  <div class="wrap">
    <span>© ${year} ${name}. All rights reserved.</span>
    <span>Website generated with Vita Fly Sites</span>
  </div>
</footer>
</body>
</html>`;
}
