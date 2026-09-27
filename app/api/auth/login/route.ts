import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const userClean = (username || '').trim().toLowerCase();
    const isUserValid =
      userClean === ADMIN_CREDENTIALS.username || userClean === ADMIN_CREDENTIALS.email;
    const isPassValid = password === ADMIN_CREDENTIALS.password;

    if (!isUserValid || !isPassValid) {
      return NextResponse.json(
        { message: 'Invalid credentials. Access restricted to authorized personnel.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      role: 'ADMIN',
      token: ADMIN_CREDENTIALS.token,
      email: ADMIN_CREDENTIALS.email,
      name: 'Knotix Administrator',
    });

    // Set cookie for SSR compatibility
    response.cookies.set('token', ADMIN_CREDENTIALS.token, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set('role', 'ADMIN', {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    console.error('Login error:', error);
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
