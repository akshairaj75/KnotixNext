import { NextRequest } from 'next/server';

export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@knotix.com',
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'KnotixAdmin2026!',
  token: process.env.ADMIN_TOKEN || 'admin-token',
};

/**
 * Validates whether the incoming Next.js request is authorized as an admin.
 * Matches Spring Boot logic: checks Bearer token == 'admin-token' or valid admin email/token.
 */
export function isAuthorizedAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Check cookies as fallback for server-rendered admin pages
    const cookieToken = request.cookies.get('token')?.value || request.cookies.get('knotix_token')?.value;
    if (cookieToken === 'admin-token' || cookieToken === ADMIN_CREDENTIALS.email) {
      return true;
    }
    return false;
  }

  const token = authHeader.substring(7).trim();
  if (token === 'admin-token' || token === ADMIN_CREDENTIALS.email) {
    return true;
  }

  return false;
}
