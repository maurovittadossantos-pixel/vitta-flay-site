import { getCurrentUser } from '@/lib/auth';
import { getSite } from '@/lib/sites';

export const dynamic = 'force-dynamic';

/** Serves the generated website for the dashboard preview iframe and downloads. */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return new Response('Not signed in', { status: 401 });

  const site = await getSite(user.id, params.id);
  if (!site) return new Response('Not found', { status: 404 });

  const download = new URL(request.url).searchParams.has('download');

  return new Response(site.html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      ...(download
        ? { 'content-disposition': `attachment; filename="${site.slug}.html"` }
        : {}),
    },
  });
}
