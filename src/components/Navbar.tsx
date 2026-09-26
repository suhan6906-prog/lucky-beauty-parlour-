import React from 'react';
import { Phone, User, Calendar, Sparkles, Image as ImageIcon, Flower2, Compass, Database } from 'lucide-react';
import { TabType } from '../types';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenConcierge: () => void;
  onOpenReservations: () => void;
  onOpenAuth: () => void;
  onOpenSupabaseSettings: () => void;
  reservationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenConcierge,
  onOpenReservations,
  onOpenAuth,
  onOpenSupabaseSettings,
  reservationCount,
}) => {
  const { user, isConfigured } = useAuth();

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EFE8DF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Brand Wordmark with new official logo */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center text-left focus:outline-none group hover:opacity-90 transition-opacity"
            aria-label="Lucky Beauty Parlour Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wider font-sans font-medium text-[#655750]">
            <button
              onClick={() => onSelectTab('home')}
              className={`hover:text-[#2D2521] transition-colors relative py-1 ${
                currentTab === 'home' ? 'text-[#2D2521] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#5A4D46]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('services')}
              className={`hover:text-[#2D2521] transition-colors relative py-1 ${
                currentTab === 'services' ? 'text-[#2D2521] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#5A4D46]' : ''
              }`}
            >
              Services Menu
            </button>
            <button
              onClick={() => onSelectTab('rituals')}
              className={`hover:text-[#2D2521] transition-colors relative py-1 ${
                currentTab === 'rituals' ? 'text-[#2D2521] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#5A4D46]' : ''
              }`}
            >
              Rituals & Philosophy
            </button>
            <button
              onClick={() => onSelectTab('gallery')}
              className={`hover:text-[#2D2521] transition-colors relative py-1 ${
                currentTab === 'gallery' ? 'text-[#2D2521] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#5A4D46]' : ''
              }`}
            >
              Sanctuary Gallery
            </button>
          </nav>

          {/* Top Actions: Phone Concierge, Supabase Cloud Status, User Account, and Desktop Book CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Supabase Connection Indicator & Modal trigger */}
            <button
              onClick={onOpenSupabaseSettings}
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-full sm:rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                isConfigured
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800 hover:bg-emerald-100/70'
                  : 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100/70'
              }`}
              title="Supabase Backend Settings"
            >
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline text-[11px]">
                {isConfigured ? 'Supabase Live' : 'Connect Supabase'}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
            </button>

            <button
              onClick={onOpenConcierge}
              className="p-2 sm:p-2.5 rounded-full text-[#5A4D46] hover:bg-[#EFE8DF] transition-colors focus:outline-none"
              title="Atelier Concierge Inquiries"
              aria-label="Call Atelier Concierge"
            >
              <Phone className="w-4 h-4 stroke-[1.8]" />
            </button>

            {/* Auth / Account Profile Button */}
            <button
              onClick={onOpenAuth}
              className={`p-2 sm:p-2.5 rounded-full transition-colors focus:outline-none ${
                user
                  ? 'bg-[#EFE8DF] text-[#2D2521] border border-[#D5C7B8]'
                  : 'text-[#5A4D46] hover:bg-[#EFE8DF]'
              }`}
              title={user ? `Signed in as ${user.email}` : 'Sign In / Register'}
              aria-label="User Account"
            >
              <User className="w-4 h-4 stroke-[1.8]" />
            </button>

            {/* User Reservations Ledger Button */}
            <button
              onClick={onOpenReservations}
              className="relative p-2 sm:p-2.5 rounded-full text-white bg-[#5A4D46] hover:bg-[#463B35] transition-colors focus:outline-none shadow-xs"
              title="My Reservations & Atelier Pass"
              aria-label="View My Reservations"
            >
              <Calendar className="w-4 h-4 stroke-[1.8]" />
              {reservationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D17B69] text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-[#FAF7F2]">
                  {reservationCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('book')}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium bg-[#5A4D46] text-white hover:bg-[#443934] transition-all shadow-sm active:scale-95"
            >
              <span>Reserve Ritual</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Matches Image 1, 3, 5, 7 design stitch exactly!) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EAE3D9] py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors ${
              currentTab === 'home' ? 'text-[#2D2521] font-medium' : 'text-[#96867D] hover:text-[#5A4D46]'
            }`}
          >
            <Flower2 className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.2] text-[#2D2521]' : 'stroke-[1.5]'}`} />
            <span className="text-[10px] tracking-wide">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('services')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors ${
              currentTab === 'services' ? 'text-[#2D2521] font-medium' : 'text-[#96867D] hover:text-[#5A4D46]'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${currentTab === 'services' ? 'stroke-[2.2] text-[#2D2521]' : 'stroke-[1.5]'}`} />
            <span className="text-[10px] tracking-wide">Services</span>
          </button>

          <button
            onClick={() => onSelectTab('rituals')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors ${
              currentTab === 'rituals' ? 'text-[#2D2521] font-medium' : 'text-[#96867D] hover:text-[#5A4D46]'
            }`}
          >
            <Compass className={`w-5 h-5 ${currentTab === 'rituals' ? 'stroke-[2.2] text-[#2D2521]' : 'stroke-[1.5]'}`} />
            <span className="text-[10px] tracking-wide">Rituals</span>
          </button>

          <button
            onClick={() => onSelectTab('gallery')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors ${
              currentTab === 'gallery' ? 'text-[#2D2521] font-medium' : 'text-[#96867D] hover:text-[#5A4D46]'
            }`}
          >
            <ImageIcon className={`w-5 h-5 ${currentTab === 'gallery' ? 'stroke-[2.2] text-[#2D2521]' : 'stroke-[1.5]'}`} />
            <span className="text-[10px] tracking-wide">Gallery</span>
          </button>

          <button
            onClick={() => onSelectTab('book')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors relative ${
              currentTab === 'book' ? 'text-[#2D2521] font-medium' : 'text-[#96867D] hover:text-[#5A4D46]'
            }`}
          >
            <Calendar className={`w-5 h-5 ${currentTab === 'book' ? 'stroke-[2.2] text-[#2D2521]' : 'stroke-[1.5]'}`} />
            <span className="text-[10px] tracking-wide">Book</span>
            {reservationCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 bg-[#D17B69] rounded-full" />
            )}
          </button>

        </div>
      </nav>
    </>
  );
};
