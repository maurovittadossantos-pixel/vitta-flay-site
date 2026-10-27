import { getIndustry, getPalette, getTone } from './catalog';
import type { SiteBrief, SiteCopy } from './generator';

/**
 * Optional AI copywriting pass.
 *
 * When OPENAI_API_KEY is configured, the model rewrites the headline,
 * subheadline and about copy for the client's business. Without a key (or if
 * the call fails) the catalog copy is used unchanged, so site generation always
 * returns a complete website.
 */
export async function refineCopy(
  brief: SiteBrief,
  base: SiteCopy,
): Promise<{ copy: SiteCopy; engine: 'ai' | 'template' }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { copy: base, engine: 'template' };

  const industry = getIndustry(brief.industry);
  const tone = getTone(brief.tone);
  const palette = getPalette(brief.palette);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are a senior web copywriter. Reply with JSON only, using the keys headline, subheadline, about, ctaText, closer, services (array of 3 objects with title and text). Never invent prices, phone numbers or addresses.',
          },
          {
            role: 'user',
            content: `Business: ${brief.businessName}
Industry: ${industry.label}
Tone: ${tone.label} (${tone.hint})
Colour mood: ${palette.label}
Client tagline: ${brief.tagline || '(none supplied)'}

Write the marketing copy for this business's new website.`,
          },
        ],
      }),
    });

    if (!response.ok) return { copy: base, engine: 'template' };

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = payload.choices?.[0]?.message?.content;
    if (!raw) return { copy: base, engine: 'template' };

    const parsed = JSON.parse(raw) as Partial<SiteCopy>;
    const services =
      Array.isArray(parsed.services) && parsed.services.length === 3
        ? parsed.services
            .filter((service) => service?.title && service?.text)
            .map((service) => ({ title: String(service.title), text: String(service.text) }))
        : base.services;

    return {
      engine: 'ai',
      copy: {
        ...base,
        headline: text(parsed.headline, base.headline),
        subheadline: text(parsed.subheadline, base.subheadline),
        about: text(parsed.about, base.about),
        ctaText: text(parsed.ctaText, base.ctaText),
        closer: text(parsed.closer, base.closer),
        services: services.length === 3 ? services : base.services,
      },
    };
  } catch {
    return { copy: base, engine: 'template' };
  } finally {
    clearTimeout(timer);
  }
}

function text(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}
