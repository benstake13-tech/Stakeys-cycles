import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Shared Stakey's Cycles backend (the same Supabase project the staff
 * loyalty app uses). The anon key is a public key — safe to ship in a
 * static site — and access is governed by row level security.
 */
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://lhojocpygcnkxvkrcuxh.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxob2pvY3B5Z2Nua3h2a3JjdXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzU2MTYsImV4cCI6MjEwNTg1MTYxNn0.RuSrHufSCEd3bwOzF3kYD5MKx9gI1TKK9apF3HWJeZ8';

let instance: SupabaseClient | null = null;

/** Public, read-mostly client for the marketing site. No auth session. */
export function getSupabaseClient(): SupabaseClient {
  if (!instance) {
    instance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return instance;
}
