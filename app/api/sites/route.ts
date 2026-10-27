import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createSite, listSites, parseSiteInput } from '@/lib/sites';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  return NextResponse.json({ sites: await listSites(user.id) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { brief, error } = parseSiteInput(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const site = await createSite(user.id, brief);
  return NextResponse.json({ site }, { status: 201 });
}
