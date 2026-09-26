import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, LogOut, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onOpenSettings }) => {
  const { user, isConfigured, signInWithPassword, signUpWithEmailPassword, signInWithEmail, signOut } = useAuth();
  
  const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'magic') {
        const { error, message: msg } = await signInWithEmail(email);
        if (error) throw error;
        setMessage({ type: 'success', text: msg || 'Magic link sent to your email.' });
      } else if (mode === 'signup') {
        const { error } = await signUpWithEmailPassword(email, password, fullName);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Atelier patron account created successfully!' });
        setTimeout(() => onClose(), 1500);
      } else {
        const { error } = await signInWithPassword(email, password);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Welcome back to Lucky Beauty Parlour.' });
        setTimeout(() => onClose(), 1200);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Authentication error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7C6C63] hover:text-[#2D2521] rounded-full hover:bg-[#F2ECE3] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="md" showText={false} />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#86756C] font-semibold block">
            Atelier Patron Sanctuary
          </span>
          <h3 className="font-serif text-2xl text-[#2D2521] mt-0.5 font-normal">
            {user ? 'Your Atelier Profile' : mode === 'signup' ? 'Create Patron Account' : 'Welcome to Lucky'}
          </h3>
          <p className="text-xs text-[#7A6B63] mt-1">
            {user
              ? 'Manage your bookings, VIP privileges, and skincare notes.'
              : 'Sign in to access your past reservations and personal prescription ledger.'}
          </p>
        </div>

        {/* If logged in */}
        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-[#EAE2D8] space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center font-serif font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-base text-[#2D2521] truncate">
                    {user.user_metadata?.full_name || 'Valued Patron'}
                  </h4>
                  <span className="text-xs text-[#7A6B63] truncate block">{user.email}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#F5EFE8] flex items-center justify-between text-xs text-[#5A4D46]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Authenticated via Supabase</span>
                </span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-3 px-4 rounded-xl border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-100/60 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Atelier</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isConfigured && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                <span className="font-semibold block">Supabase Backend Unconfigured:</span>
                <p className="text-[11px] leading-relaxed">
                  To enable cloud auth and live PostgreSQL storage,{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSettings();
                    }}
                    className="underline font-bold text-amber-900"
                  >
                    configure your Supabase credentials here
                  </button>
                  .
                </p>
              </div>
            )}

            {message && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
                  Full Name
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2D8CC] rounded-xl text-xs">
                  <UserIcon className="w-3.5 h-3.5 text-[#86756C]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Camille de Saint-Germain"
                    className="bg-transparent focus:outline-none w-full text-[#2D2521]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
                Email Address
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2D8CC] rounded-xl text-xs">
                <Mail className="w-3.5 h-3.5 text-[#86756C]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="bg-transparent focus:outline-none w-full text-[#2D2521]"
                />
              </div>
            </div>

            {mode !== 'magic' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
                  Password
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2D8CC] rounded-xl text-xs">
                  <Lock className="w-3.5 h-3.5 text-[#86756C]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent focus:outline-none w-full text-[#2D2521]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold shadow-sm transition-all disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : mode === 'signup'
                ? 'Create Atelier Account'
                : mode === 'magic'
                ? 'Send Magic Link'
                : 'Sign In to Atelier'}
            </button>

            {/* Mode switch */}
            <div className="pt-2 flex flex-col items-center gap-2 text-xs text-[#7A6B63]">
              {mode === 'signin' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="hover:text-[#2D2521] underline"
                  >
                    Don&apos;t have an atelier account? Register here
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('magic')}
                    className="text-[11px] text-[#86756C] hover:underline"
                  >
                    Sign in with Magic Link instead
                  </button>
                </>
              ) : mode === 'signup' ? (
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="hover:text-[#2D2521] underline"
                >
                  Already registered? Sign in
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="hover:text-[#2D2521] underline"
                >
                  Return to email &amp; password sign in
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
