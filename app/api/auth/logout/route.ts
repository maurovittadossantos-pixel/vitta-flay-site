import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  cookies().set({ name: SESSION_COOKIE, value: '', ...sessionCookieOptions, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
