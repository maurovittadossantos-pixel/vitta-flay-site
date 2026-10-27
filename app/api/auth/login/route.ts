import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPool } from '@/lib/db';
import {
  SESSION_COOKIE,
  createSessionToken,
  normalizeEmail,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
  }

  const { rows } = await getPool().query<{
    id: string;
    email: string;
    name: string;
    company: string | null;
    password_hash: string;
  }>('SELECT id, email, name, company, password_hash FROM users WHERE email = $1', [email]);

  const user = rows[0];
  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: 'Those credentials did not match an account.' }, { status: 401 });
  }

  const session = createSessionToken(user.id);
  cookies().set({ name: SESSION_COOKIE, value: session.value, ...sessionCookieOptions, maxAge: session.maxAge });

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, company: user.company },
  });
}
