import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('super-secret-key');

export async function middleware(request: NextRequest) {
  const authorizationHeaders = request.headers.get('Authorization');

  if (!authorizationHeaders) {
    return new NextResponse(
      JSON.stringify({
        status: 'fail',
        message: 'You are not Admin to perform the action',
      })
    );
  }

  const [_, token] = authorizationHeaders.split(' ');

  if (token === 'undefined') {
    return new NextResponse(
      JSON.stringify({
        status: 'fail',
        message: 'You are not Admin to perform the action',
      })
    );
  }

  console.log('hello from middleware');

  await jwtVerify(token, secret);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/add-product',
    '/api/admin/delete-product',
    '/api/admin/update-product',
    '/api/cart/:path*',
  ],
};
