import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPool, type User } from './db';

export const SESSION_COOKIE = 'vfs_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sessionSecret(): string {
  return process.env.SESSION_SECRET || 'base44-dev-placeholder-session-secret-change-me';
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function sign(payload: string): string {
  return createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
}

export function createSessionToken(userId: string): { value: string; maxAge: number } {
  const payload = `${userId}.${Date.now() + SESSION_MAX_AGE * 1000}`;
  return { value: `${payload}.${sign(payload)}`, maxAge: SESSION_MAX_AGE };
}

export function readSessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [userId, expiresAt, signature] = parts;
  const payload = `${userId}.${expiresAt}`;
  const expected = Buffer.from(sign(payload));
  const provided = Buffer.from(signature);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return null;
  if (Number(expiresAt) < Date.now()) return null;
  return userId;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
};

export async function getCurrentUser(): Promise<User | null> {
  const userId = readSessionToken(cookies().get(SESSION_COOKIE)?.value);
  if (!userId) return null;

  const { rows } = await getPool().query<User>(
    'SELECT id, email, name, company, created_at FROM users WHERE id = $1',
    [userId],
  );
  return rows[0] ?? null;
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateCredentials(email: string, password: string): string | null {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Enter a valid email address.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}
