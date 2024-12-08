import { supabase } from './supabase'

export const checkAdminAccess = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession()
  const email = session?.user?.email

  if (!email) return false

  // List of admin emails
  const ADMIN_EMAILS = [
    'rohitkodam4@gmail.com',
    // Add other admin emails here
  ]

  return ADMIN_EMAILS.includes(email)
} 