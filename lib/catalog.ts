/**
 * Copywriting catalog for the Vita Fly Sites generation engine.
 *
 * Each industry carries the structured marketing content used to compose a
 * complete website; tone and palette control voice and colour.
 */

export type Service = { title: string; text: string };
export type Stat = { value: string; label: string };
export type Testimonial = { quote: string; author: string; role: string };

export type IndustryContent = {
  id: string;
  label: string;
  blurb: string;
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
};

export const INDUSTRIES: IndustryContent[] = [
  {
    id: 'restaurant',
    label: 'Restaurant & Café',
    blurb: 'Menus, reservations and a warm welcome.',
    nav: ['Menu', 'Our story', 'Visit'],
    heroEyebrow: 'Open today',
    headline: 'Food made fresh, every single day',
    subheadline:
      'Seasonal dishes, small-batch roasting and a room that feels like home. Reserve a table or drop in for a coffee.',
    about:
      'Our kitchen works with local growers and changes the menu with the seasons. Everything is prepared to order, and the coffee is roasted in house each week.',
    services: [
      { title: 'Seasonal menu', text: 'A short, sharp menu that changes monthly around what is freshest.' },
      { title: 'Private dining', text: 'A separate room for celebrations, team dinners and small events.' },
      { title: 'Coffee & bakery', text: 'House-roasted beans, morning pastries and cakes baked on site.' },
    ],
    stats: [
      { value: '4.9', label: 'Average guest rating' },
      { value: '120', label: 'Seats inside and out' },
      { value: '7 days', label: 'Open every week' },
    ],
    testimonial: {
      quote: 'Easily the best meal we had all year, and the service made it feel effortless.',
      author: 'Marta Nunes',
      role: 'Regular guest',
    },
    ctaTitle: 'Reserve your table',
    ctaText: 'Tell us the date, the number of guests and anything we should know. We confirm within the hour.',
  },
  {
    id: 'fitness',
    label: 'Fitness & Wellness',
    blurb: 'Coaching, classes and steady progress.',
    nav: ['Programmes', 'Classes', 'Join'],
    heroEyebrow: 'First session free',
    headline: 'Training that actually fits your week',
    subheadline:
      'Coached strength, conditioning and mobility sessions for every level — with a plan you can keep up with.',
    about:
      'We start with an assessment, then build a programme around your goals, your schedule and your starting point. Small groups, real coaching, measurable progress.',
    services: [
      { title: 'Personal coaching', text: 'One-to-one sessions built around your goals and your calendar.' },
      { title: 'Small group classes', text: 'Capped at eight people so every rep gets real attention.' },
      { title: 'Nutrition support', text: 'Practical guidance that fits your routine instead of fighting it.' },
    ],
    stats: [
      { value: '400+', label: 'Members training weekly' },
      { value: '8:1', label: 'Maximum class size' },
      { value: '92%', label: 'Stay past six months' },
    ],
    testimonial: {
      quote: 'Twelve months in and I am stronger than I have ever been. The coaching is genuinely personal.',
      author: 'Daniel Okafor',
      role: 'Member since 2023',
    },
    ctaTitle: 'Start with a free session',
    ctaText: 'Come in, meet a coach, try a class. No contracts and no pressure to sign up on the spot.',
  },
  {
    id: 'beauty',
    label: 'Beauty & Salon',
    blurb: 'Treatments, styling and self-care.',
    nav: ['Treatments', 'Team', 'Booking'],
    heroEyebrow: 'Now taking bookings',
    headline: 'Look after yourself properly again',
    subheadline:
      'Hair, skin and nails in calm, unhurried surroundings — with a team that listens before it starts.',
    about:
      'Every appointment opens with a proper consultation, so the result suits you and holds up at home. We use gentle, professional-grade products and never rush the finishing touches.',
    services: [
      { title: 'Hair styling & colour', text: 'Cuts, balayage and colour work designed around your hair type.' },
      { title: 'Skin treatments', text: 'Facials and targeted care for texture, tone and hydration.' },
      { title: 'Nails & brows', text: 'Manicures, pedicures, brows and lashes in a relaxed studio.' },
    ],
    stats: [
      { value: '15', label: 'Specialists on the team' },
      { value: '2,000+', label: 'Clients looked after' },
      { value: '5.0', label: 'Rated by our clients' },
    ],
    testimonial: {
      quote: 'The only place I have ever left feeling like they did exactly what I asked for.',
      author: 'Sofia Mendes',
      role: 'Client since 2022',
    },
    ctaTitle: 'Book your appointment',
    ctaText: 'Tell us what you are after and when suits you best. We will confirm the time straight away.',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    blurb: 'Listings, viewings and local insight.',
    nav: ['Listings', 'Services', 'Valuation'],
    heroEyebrow: 'Local specialists',
    headline: 'Move with people who know the area',
    subheadline:
      'Buying, selling and letting guidance from a team that works this neighbourhood every day.',
    about:
      'We combine careful valuations with local data and honest advice, then handle viewings, negotiation and paperwork from start to finish.',
    services: [
      { title: 'Home valuation', text: 'A realistic, evidence-based figure for your property in 48 hours.' },
      { title: 'Sales & letting', text: 'Photography, marketing and viewings handled by one team.' },
      { title: 'Buyer representation', text: 'We search, shortlist and negotiate on your behalf.' },
    ],
    stats: [
      { value: '18 days', label: 'Average time to offer' },
      { value: '980', label: 'Properties handled' },
      { value: '99%', label: 'Of asking price achieved' },
    ],
    testimonial: {
      quote: 'They told us the honest number, then delivered above it. That is rare.',
      author: 'Paulo Cabral',
      role: 'Seller, 2024',
    },
    ctaTitle: 'Get a free valuation',
    ctaText: 'Share a few details about your property and we will come back with a realistic number and a plan.',
  },
  {
    id: 'legal',
    label: 'Legal & Consulting',
    blurb: 'Clear advice, practical outcomes.',
    nav: ['Practice areas', 'Approach', 'Contact'],
    heroEyebrow: 'Straightforward counsel',
    headline: 'Advice you can act on today',
    subheadline:
      'Commercial, contractual and regulatory support delivered in plain language and on a schedule that works.',
    about:
      'We keep engagements focused: scoped work, fixed quotes where possible, and documents written so the people running the business can use them.',
    services: [
      { title: 'Commercial contracts', text: 'Drafting, review and negotiation for day-to-day agreements.' },
      { title: 'Corporate structuring', text: 'Company formation, governance and shareholder arrangements.' },
      { title: 'Dispute resolution', text: 'Practical routes to resolution before matters escalate.' },
    ],
    stats: [
      { value: '20 yrs', label: 'Combined experience' },
      { value: '500+', label: 'Mandates completed' },
      { value: '48 hrs', label: 'Typical first response' },
    ],
    testimonial: {
      quote: 'They explained the risks in one page and saved us weeks of negotiation.',
      author: 'Helena Barros',
      role: 'Managing Director',
    },
    ctaTitle: 'Request a consultation',
    ctaText: 'Describe the matter briefly and we will confirm scope, timescale and fees before anything begins.',
  },
  {
    id: 'agency',
    label: 'Creative Agency',
    blurb: 'Brand, design and campaigns.',
    nav: ['Work', 'Services', 'Start a project'],
    heroEyebrow: 'Studio open for Q1',
    headline: 'Brands people actually remember',
    subheadline:
      'Strategy, identity and campaign work for teams who would rather be distinct than safe.',
    about:
      'A small senior team, no account layers. We build the strategy, design the identity and ship the assets your team needs to keep it alive.',
    services: [
      { title: 'Brand strategy', text: 'Positioning, naming and messaging grounded in real customer research.' },
      { title: 'Visual identity', text: 'Logos, type systems and guidelines built to scale across every channel.' },
      { title: 'Digital campaigns', text: 'Landing pages, content and paid creative that convert.' },
    ],
    stats: [
      { value: '140+', label: 'Launches shipped' },
      { value: '6 wks', label: 'Typical identity sprint' },
      { value: '3', label: 'Continents served' },
    ],
    testimonial: {
      quote: 'They rebuilt our brand and our confidence. Revenue followed within two quarters.',
      author: 'Íris Domingos',
      role: 'Chief Marketing Officer',
    },
    ctaTitle: 'Start a project',
    ctaText: 'Send us the brief, the budget shape and the deadline. We reply with a plan within two working days.',
  },
  {
    id: 'healthcare',
    label: 'Healthcare Clinic',
    blurb: 'Care, appointments and specialists.',
    nav: ['Specialties', 'Our clinic', 'Appointments'],
    heroEyebrow: 'Same-week appointments',
    headline: 'Care that takes its time with you',
    subheadline:
      'A calm clinic with experienced clinicians, longer consultations and follow-up that does not stop at the door.',
    about:
      'Appointments run to 30 minutes as standard, so nothing important is rushed. Our clinicians work together on each case and share notes with your consent.',
    services: [
      { title: 'General practice', text: 'Check-ups, diagnostics and ongoing care for the whole family.' },
      { title: 'Specialist referrals', text: 'Direct access to a trusted network of specialists.' },
      { title: 'Preventive screening', text: 'Structured screening programmes built around your age and history.' },
    ],
    stats: [
      { value: '30 min', label: 'Standard consultation' },
      { value: '12', label: 'Clinicians on site' },
      { value: '24 hrs', label: 'Results turnaround' },
    ],
    testimonial: {
      quote: 'The first doctor in years who let me finish a sentence and then explained everything.',
      author: 'Rui Vasconcelos',
      role: 'Patient',
    },
    ctaTitle: 'Book an appointment',
    ctaText: 'Choose the specialty and a preferred time. Our team confirms by phone or email within the day.',
  },
  {
    id: 'retail',
    label: 'E-commerce & Retail',
    blurb: 'Products, shipping and service.',
    nav: ['Shop', 'About', 'Help'],
    heroEyebrow: 'New arrivals in stock',
    headline: 'Things worth keeping',
    subheadline:
      'A carefully chosen range, honest product notes and shipping that does not keep you guessing.',
    about:
      'We stock fewer things and know them properly. Every product page tells you what it is made of, how it wears and how to look after it.',
    services: [
      { title: 'Curated range', text: 'A tight selection chosen for quality rather than volume.' },
      { title: 'Fast shipping', text: 'Orders dispatched same day, tracked, with free returns.' },
      { title: 'Real support', text: 'Advice from people who use the products they sell.' },
    ],
    stats: [
      { value: '24h', label: 'Dispatch time' },
      { value: '30 days', label: 'Free returns' },
      { value: '4.8', label: 'Average review score' },
    ],
    testimonial: {
      quote: 'Bought one item to test them, came back three times since. The quality is consistent.',
      author: 'Ana Ferreira',
      role: 'Customer',
    },
    ctaTitle: 'Join the list',
    ctaText: 'Get first access to new arrivals and occasional offers. One email a month, never more.',
  },
  {
    id: 'education',
    label: 'Education & Training',
    blurb: 'Courses, cohorts and outcomes.',
    nav: ['Courses', 'Outcomes', 'Enrol'],
    heroEyebrow: 'Next cohort enrolling',
    headline: 'Skills you can use on Monday',
    subheadline:
      'Practical courses taught by people who still do the work, with small cohorts and real feedback.',
    about:
      'Live sessions, recorded for revision, plus project work reviewed by a mentor. You finish with a portfolio, not just a certificate.',
    services: [
      { title: 'Live cohorts', text: 'Small groups, fixed schedule, direct access to the instructor.' },
      { title: 'Mentor review', text: 'Every project gets written feedback from a working practitioner.' },
      { title: 'Career support', text: 'Portfolio reviews and interview preparation included.' },
    ],
    stats: [
      { value: '14:1', label: 'Student to mentor ratio' },
      { value: '2,400', label: 'Learners trained' },
      { value: '87%', label: 'Move into related work' },
    ],
    testimonial: {
      quote: 'I finished with three portfolio projects that got me interviews within a month.',
      author: 'Tomás Almeida',
      role: 'Cohort graduate',
    },
    ctaTitle: 'Apply for the next cohort',
    ctaText: 'Tell us your background and what you want to achieve. We will confirm whether the course fits.',
  },
  {
    id: 'technology',
    label: 'Technology & SaaS',
    blurb: 'Product, platform and integrations.',
    nav: ['Platform', 'Pricing', 'Docs'],
    heroEyebrow: 'Live in minutes',
    headline: 'Software that gets out of the way',
    subheadline:
      'A focused platform for teams who need reliable automation, clear data and no surprise invoices.',
    about:
      'Built for busy teams: sensible defaults, an API that behaves, and a migration path that does not require a project plan.',
    services: [
      { title: 'Automated workflows', text: 'Connect the tools you already use and remove the manual steps.' },
      { title: 'Reporting & analytics', text: 'Dashboards your leadership team will actually read.' },
      { title: 'Open API', text: 'Documented endpoints, webhooks and SDKs for your own integrations.' },
    ],
    stats: [
      { value: '99.98%', label: 'Uptime over 12 months' },
      { value: '4 min', label: 'Median setup time' },
      { value: '5,000+', label: 'Teams onboarded' },
    ],
    testimonial: {
      quote: 'We replaced three tools and two spreadsheets in a single afternoon.',
      author: 'Kevin Machado',
      role: 'Head of Operations',
    },
    ctaTitle: 'Start your free trial',
    ctaText: 'Full access for 14 days, no card required. Keep your data if you stay, export everything if you go.',
  },
];

export const TONES = [
  {
    id: 'professional',
    label: 'Professional',
    hint: 'Measured, credible, corporate',
    ctaLabel: 'Request a consultation',
    closer: 'Trusted by clients who expect precision.',
  },
  {
    id: 'friendly',
    label: 'Friendly',
    hint: 'Warm, plain-spoken, approachable',
    ctaLabel: 'Say hello',
    closer: 'We would love to hear what you are planning.',
  },
  {
    id: 'bold',
    label: 'Bold',
    hint: 'Direct, confident, high contrast',
    ctaLabel: 'Start now',
    closer: 'Ready to lead your market?',
  },
  {
    id: 'elegant',
    label: 'Elegant',
    hint: 'Refined, calm, premium',
    ctaLabel: 'Enquire',
    closer: 'Crafted with care, made to last.',
  },
  {
    id: 'playful',
    label: 'Playful',
    hint: 'Bright, energetic, human',
    ctaLabel: "Let's chat",
    closer: 'Let us make something people talk about.',
  },
] as const;

export type Palette = {
  id: string;
  label: string;
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  line: string;
};

export const PALETTES: Palette[] = [
  {
    id: 'indigo',
    label: 'Midnight Indigo',
    bg: '#f7f8fc',
    surface: '#ffffff',
    ink: '#0f1430',
    muted: '#5a6285',
    accent: '#4f46e5',
    accentInk: '#ffffff',
    line: '#e3e6f2',
  },
  {
    id: 'coral',
    label: 'Sunset Coral',
    bg: '#fff8f5',
    surface: '#ffffff',
    ink: '#2b1416',
    muted: '#7a555a',
    accent: '#e2564a',
    accentInk: '#ffffff',
    line: '#f6dfd9',
  },
  {
    id: 'emerald',
    label: 'Emerald Leaf',
    bg: '#f4faf6',
    surface: '#ffffff',
    ink: '#0e2419',
    muted: '#4e6d5c',
    accent: '#12895a',
    accentInk: '#ffffff',
    line: '#d8ece1',
  },
  {
    id: 'violet',
    label: 'Royal Violet',
    bg: '#faf7ff',
    surface: '#ffffff',
    ink: '#241046',
    muted: '#665387',
    accent: '#7c3aed',
    accentInk: '#ffffff',
    line: '#e8defb',
  },
  {
    id: 'teal',
    label: 'Ocean Teal',
    bg: '#f4fbfc',
    surface: '#ffffff',
    ink: '#082a33',
    muted: '#4a6d78',
    accent: '#0e7490',
    accentInk: '#ffffff',
    line: '#d5e9ee',
  },
  {
    id: 'slate',
    label: 'Slate Mono',
    bg: '#f6f7f9',
    surface: '#ffffff',
    ink: '#12161c',
    muted: '#5b6470',
    accent: '#1f2937',
    accentInk: '#ffffff',
    line: '#e2e5ea',
  },
];

export function getIndustry(id: string): IndustryContent {
  return INDUSTRIES.find((industry) => industry.id === id) ?? INDUSTRIES[0];
}

export function getTone(id: string) {
  return TONES.find((tone) => tone.id === id) ?? TONES[0];
}

export function getPalette(id: string): Palette {
  return PALETTES.find((palette) => palette.id === id) ?? PALETTES[0];
}
