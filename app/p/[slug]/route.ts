import { getSiteBySlug } from '@/lib/sites';

export const dynamic = 'force-dynamic';

/** Public address of every site generated with Vita Fly Sites: /p/<slug> */
export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug);

  if (!site) {
    return new Response(
      `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>Site not found</title></head>
       <body style="font-family:system-ui,sans-serif;padding:64px;text-align:center">
         <h1>This site is no longer available</h1>
         <p style="color:#555">The address may have changed or been removed.</p>
       </body></html>`,
      { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } },
    );
  }

  return new Response(site.html, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}
