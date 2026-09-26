import React, { useState } from 'react';
import { X, Database, Check, ExternalLink, ShieldCheck, Key, RefreshCw, AlertCircle } from 'lucide-react';
import { getSupabaseCredentials, saveCustomSupabaseCredentials, getSupabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface SupabaseSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionChanged: () => void;
}

export const SupabaseSettingsModal: React.FC<SupabaseSettingsModalProps> = ({
  isOpen,
  onClose,
  onConnectionChanged,
}) => {
  const { isConfigured, refreshAuth } = useAuth();
  const creds = getSupabaseCredentials();

  const [url, setUrl] = useState(creds.url || '');
  const [anonKey, setAnonKey] = useState(creds.anonKey || '');
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSaveAndTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setStatusMessage({ type: 'info', text: 'Validating connection to Supabase...' });

    try {
      saveCustomSupabaseCredentials(url, anonKey);
      refreshAuth();

      // Test ping
      const client = getSupabase();
      if (!client) {
        throw new Error('Could not initialize Supabase client. Please check the URL format.');
      }

      // Try reading from public tables
      const { error } = await client.from('reservations').select('id').limit(1);

      if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('does not exist'))) {
        setStatusMessage({
          type: 'info',
          text: 'Connected to Supabase! The tables have not been created yet. Please copy supabase_schema.sql and run it in your Supabase SQL Editor.',
        });
      } else if (error) {
        setStatusMessage({
          type: 'error',
          text: `Supabase returned: ${error.message}. Please check your anon public key.`,
        });
      } else {
        setStatusMessage({
          type: 'success',
          text: 'Connection verified and tables detected! Your application is now live on Supabase.',
        });
      }
      onConnectionChanged();
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Connection failed. Please verify your Project URL and anon public key.',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleClear = () => {
    saveCustomSupabaseCredentials('', '');
    setUrl('');
    setAnonKey('');
    refreshAuth();
    setStatusMessage({ type: 'info', text: 'Supabase credentials cleared. Using local offline mode.' });
    onConnectionChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7C6C63] hover:text-[#2D2521] rounded-full hover:bg-[#F2ECE3] transition-colors"
          aria-label="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#86756C] font-semibold block">
                Backend Connection
              </span>
              <h3 className="font-serif text-2xl text-[#2D2521]">
                Supabase Configuration
              </h3>
            </div>
          </div>
          <p className="text-xs text-[#7A6B63] leading-relaxed">
            Connect your live Supabase project to enable cloud authentication, persistent customer reservations, and concierge inquiries.
          </p>
        </div>

        {/* Current status pill */}
        <div className="mb-5 p-3 rounded-xl border flex items-center justify-between text-xs bg-white border-[#EAE2D8]">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="font-medium text-[#2D2521]">
              Status: {isConfigured ? 'Connected to Supabase' : 'Offline / Local Storage Mode'}
            </span>
          </div>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[#5A4D46] hover:underline flex items-center gap-1 font-medium"
          >
            <span>Supabase Dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl text-xs mb-5 flex items-start gap-2 border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveAndTest} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] flex items-center justify-between">
              <span>Project URL</span>
              <span className="text-[10px] text-[#9A877E] font-normal">e.g. https://your-ref.supabase.co</span>
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzabcdefghijklm.supabase.co"
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-xl focus:outline-none focus:border-[#5A4D46] text-[#2D2521] font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] flex items-center justify-between">
              <span>Anon Public Key</span>
              <span className="text-[10px] text-[#9A877E] font-normal">API Settings → Project API keys</span>
            </label>
            <input
              type="text"
              required
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-xl focus:outline-none focus:border-[#5A4D46] text-[#2D2521] font-mono"
            />
          </div>

          <div className="p-3.5 bg-[#FAF2EB] rounded-xl border border-[#F0E4DA] text-xs text-[#7A6B63] space-y-1.5">
            <div className="flex items-center gap-1.5 font-medium text-[#2D2521]">
              <Key className="w-3.5 h-3.5 text-[#5A4D46]" />
              <span>Database Schema Script</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              We have generated <strong>schema.sql</strong> in your project root. Open your Supabase SQL Editor, paste the contents of <strong>schema.sql</strong>, and click <strong>Run</strong> to create all tables, triggers, and Row Level Security policies.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl border border-[#E2D8CC] text-xs text-[#7A6B63] hover:text-[#2D2521] hover:bg-[#F2ECE3] transition-colors"
            >
              Reset to Local
            </button>

            <button
              type="submit"
              disabled={testing}
              className="flex-1 py-3 px-6 bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save &amp; Test Connection</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
