import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { deleteSite, getSite, regenerateSite } from '@/lib/sites';

export const dynamic = 'force-dynamic';

type Context = { params: { id: string } };

export async function GET(_request: Request, { params }: Context) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const site = await getSite(user.id, params.id);
  if (!site) return NextResponse.json({ error: 'Site not found.' }, { status: 404 });

  const { html, ...summary } = site;
  return NextResponse.json({ site: summary });
}

/** Regenerates the site from the same brief with the current engine. */
export async function POST(_request: Request, { params }: Context) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const site = await regenerateSite(user.id, params.id);
  if (!site) return NextResponse.json({ error: 'Site not found.' }, { status: 404 });

  const { html, ...summary } = site;
  return NextResponse.json({ site: summary });
}

export async function DELETE(_request: Request, { params }: Context) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const removed = await deleteSite(user.id, params.id);
  if (!removed) return NextResponse.json({ error: 'Site not found.' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
