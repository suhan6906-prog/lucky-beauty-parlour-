import React, { useState } from 'react';
import { TabType } from '../types';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { Logo } from './Logo';
import { createSubscriberInDb } from '../lib/databaseService';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConcierge }) => {
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      if (isConfigured) {
        await createSubscriberInDb(email);
      }
    } catch (err) {
      console.warn('Could not save newsletter subscriber to Supabase:', err);
    } finally {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#241E1A] text-[#D8CECA] pt-16 pb-24 md:pb-16 border-t border-[#3B322D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3B322D]">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none hover:opacity-90 transition-opacity"
            >
              <Logo size="md" light />
            </button>
            <p className="text-xs text-[#A69790] leading-relaxed">
              Where Parisian craft meets unhurried botanical care. An architectural sanctuary created for deep restoration and cellular luminescence.
            </p>
            <div className="pt-2 text-xs text-[#C5B8B2] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D19F87]" />
                <span>8 Rue de Grenelle, 75007 Paris</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D19F87]" />
                <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D19F87]" />
                <button onClick={onOpenConcierge} className="hover:underline text-left">
                  +33 1 42 68 55 00
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#FAF7F2] tracking-wider uppercase">
              Sanctuary Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#A69790]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  The Atelier Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Curated Offerings Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rituals')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Artistry & The Four Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Saint-Germain Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('book')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Reserve Your Ritual
                </button>
              </li>
            </ul>
          </div>

          {/* Signature Treatments */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#FAF7F2] tracking-wider uppercase">
              Signature Pillars
            </h4>
            <ul className="space-y-2 text-xs text-[#A69790]">
              <li>The Lumière Hydrating Facial (75m)</li>
              <li>Rose Quartz Gua Sha Contouring (50m)</li>
              <li>Aura Botanical Scalp Ritual (60m)</li>
              <li>Bridal Luminescence Atelier (120m)</li>
              <li>French Phytotherapy Back Purification</li>
            </ul>
          </div>

          {/* Gazette / Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#FAF7F2] tracking-wider uppercase">
              Atelier Gazette
            </h4>
            <p className="text-xs text-[#A69790] leading-relaxed">
              Seasonal botanical harvests, private reservation releases, and holistic facial choreography notes.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-[#362D27] text-emerald-400 rounded-lg text-xs">
                <Check className="w-4 h-4" />
                <span>Merci. You are welcomed to our private gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full text-xs px-3 py-2 bg-[#2D2521] border border-[#443831] rounded-l-lg text-[#FAF7F2] placeholder-[#7D6B62] focus:outline-none focus:border-[#D19F87]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#5A4D46] hover:bg-[#6F5F57] text-[#FAF7F2] text-xs font-medium rounded-r-lg transition-colors whitespace-nowrap"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-[#7D6B62] block">
                  Strictly discreet. Unsubscribe at any moment.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar with Press & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86756C]">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>&copy; {new Date().getFullYear()} Lucky Beauty Parlour. All rights reserved.</span>
            <span>·</span>
            <span>Paris 7e Saint-Germain-des-Prés</span>
            <span>·</span>
            <button onClick={onOpenConcierge} className="hover:underline">
              Concierge Care
            </button>
          </div>
          <div className="text-[11px] text-[#A69790] italic">
            &quot;The most serene botanical sanctuary in Saint-Germain.&quot; — Vogue Living France
          </div>
        </div>

      </div>
    </footer>
  );
};
