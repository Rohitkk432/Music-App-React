import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  await supabase.auth.getSession()

  return res
}

// Protect all routes except auth-related ones
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/callback|login).*)']
} 