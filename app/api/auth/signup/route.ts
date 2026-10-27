import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { getPool } from '@/lib/db';
import {
  SESSION_COOKIE,
  createSessionToken,
  hashPassword,
  normalizeEmail,
  sessionCookieOptions,
  validateCredentials,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, 120) : '';
  const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }

  const invalid = validateCredentials(email, password);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const pool = getPool();
  const existing = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
  if (existing.rowCount) {
    return NextResponse.json(
      { error: 'That email already has an account. Try logging in instead.' },
      { status: 409 },
    );
  }

  const { rows } = await pool.query<{ id: string; email: string; name: string; company: string | null }>(
    `INSERT INTO users (id, email, name, company, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, name, company`,
    [randomUUID(), email, name.slice(0, 80), company || null, hashPassword(password)],
  );

  const user = rows[0];
  const session = createSessionToken(user.id);
  cookies().set({ name: SESSION_COOKIE, value: session.value, ...sessionCookieOptions, maxAge: session.maxAge });

  return NextResponse.json({ user }, { status: 201 });
}
