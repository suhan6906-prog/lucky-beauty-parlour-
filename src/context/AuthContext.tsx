import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import type { User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string) => Promise<{ error: Error | null; message?: string }>;
  signUpWithEmailPassword: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null; user?: User | null }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null; user?: User | null }>;
  signOut: () => Promise<void>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  isConfigured: false,
  signInWithEmail: async () => ({ error: null }),
  signUpWithEmailPassword: async () => ({ error: null }),
  signInWithPassword: async () => ({ error: null }),
  signOut: async () => {},
  refreshAuth: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [configured, setConfigured] = useState<boolean>(isSupabaseConfigured());

  const checkUser = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setUser(null);
      setLoading(false);
      setConfigured(false);
      return;
    }

    setConfigured(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('Error checking Supabase auth:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const refreshAuth = () => {
    checkUser();
  };

  const signInWithEmail = async (email: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: new Error('Supabase is not configured yet. Please configure your project URL and key.') };
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error, message: error ? undefined : 'Magic sign-in link dispatched to your inbox.' };
  };

  const signUpWithEmailPassword = async (email: string, password: string, fullName?: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: new Error('Supabase is not configured yet.') };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (data.user) setUser(data.user);
    return { error, user: data.user };
  };

  const signInWithPassword = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: new Error('Supabase is not configured yet.') };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user) setUser(data.user);
    return { error, user: data.user };
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: configured,
        signInWithEmail,
        signUpWithEmailPassword,
        signInWithPassword,
        signOut,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
