import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

// Environment variables
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Local storage override keys so users can configure Supabase directly in the UI if env vars aren't set yet!
const STORAGE_URL_KEY = 'lucky_custom_supabase_url';
const STORAGE_KEY_KEY = 'lucky_custom_supabase_anon_key';

export function getSupabaseCredentials(): { url: string; anonKey: string } {
  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_URL_KEY) || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) || '' : '';

  return {
    url: envUrl || localUrl,
    anonKey: envAnonKey || localKey,
  };
}

export function saveCustomSupabaseCredentials(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    if (url) localStorage.setItem(STORAGE_URL_KEY, url.trim());
    else localStorage.removeItem(STORAGE_URL_KEY);

    if (anonKey) localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    else localStorage.removeItem(STORAGE_KEY_KEY);
  }
  supabaseInstance = null; // Reset cached client instance
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey || !anonKey.trim() || anonKey.trim() === '""') {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(
    url &&
    anonKey &&
    url.trim().startsWith('http') &&
    anonKey.trim().length > 20 &&
    !anonKey.includes('""')
  );
}

export type { SupabaseClient, User };
