import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/resend-verification',
  '/auth/verify',
  '/auth/welcome',
  '/help',
  '/planes',
]
const privateRoutes = [
  '/dashboard',
  '/dashboard/blog',
  '/dashboard/mensajes',
  '/dashboard/questions',
]

const roleBasedRoutes: Record<string, string[]> = {
  admin: ['/dashboard/admin', '/dashboard/settings'],
  user: ['/dashboard', '/profile'],
}

export async function middleware(request: NextRequest) {
  const session = await auth()

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (privateRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const userRole = session.user.role as string
  const allowedRoutes = roleBasedRoutes[userRole] || []

  if (allowedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|public).*)',
  ],
}