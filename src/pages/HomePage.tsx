import React from 'react';
import { ArrowRight, Star, Scissors, Sparkles, HeartHandshake, VolumeX, Coffee, Calendar, Phone } from 'lucide-react';
import { TabType } from '../types';
import { heroWomanImg, sanctuaryInteriorImg } from '../data/treatments';

interface HomePageProps {
  onNavigate: (tab: TabType, treatmentId?: string) => void;
  onOpenConcierge: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConcierge }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* 1. Hero Section (Matches Image 1) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 text-center">
        
        {/* Parisian Craft Botanical Care Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCECE4] text-[#86594C] text-xs uppercase tracking-[0.18em] font-sans font-medium mb-6 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D48972]" />
          <span>Parisian Craft • Botanical Care</span>
        </div>

        {/* Arch Hero Frame */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] mb-8">
          <div className="relative overflow-hidden mask-arch aspect-[4/5] shadow-lg border-4 border-[#FDFBF7] bg-[#EAE2D8]">
            <img
              src={heroWomanImg}
              alt="Radiant client portrait at Lucky Beauty Parlour"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Luminescence Badge */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/60">
              <span className="w-2 h-2 rounded-full bg-[#D19F87] animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5A4D46]">
                Luminescence
              </span>
            </div>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2D2521] font-normal leading-[1.15] tracking-tight">
            The Art of Radiant <br className="hidden sm:inline" />
            <span className="italic">Well-Being</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6F6057] font-sans leading-relaxed max-w-md mx-auto">
            Where bespoke botanical treatments meet refined Parisian salon craft and warm, tranquil spaces.
          </p>
        </div>

        {/* Primary Hero CTA */}
        <div className="mt-7">
          <button
            onClick={() => onNavigate('book')}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-sm font-medium tracking-wide shadow-md transition-all active:scale-[0.98]"
          >
            <span>Reserve Your Ritual</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Curated Pillars (Matches Image 1 Signature Offerings) */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-4 border-b border-[#EAE3D9] pb-2">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#9A877E] font-medium block">
              Signature Offerings
            </span>
            <h2 className="font-serif text-2xl text-[#2D2521] font-normal">
              Curated Pillars
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-serif text-[#5A4D46] hover:text-[#2D2521] hover:underline flex items-center gap-1"
          >
            <span>Full Menu</span>
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <div className="space-y-3">
          {/* Pillar 1: Skin */}
          <div
            onClick={() => onNavigate('services', 'lumiere-hydrating-facial')}
            className="bg-white hover:bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE3D9] shadow-xs flex items-center gap-4 cursor-pointer transition-all hover:border-[#5A4D46] group"
          >
            <div className="w-12 h-12 rounded-full bg-[#FCECE4] flex items-center justify-center text-[#995E4D] shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521] group-hover:text-[#5A4D46] transition-colors truncate">
                  Bespoke Skin Therapies
                </h3>
                <span className="text-xs text-[#8A7970] shrink-0 ml-2 font-medium">
                  60–90 MIN
                </span>
              </div>
              <p className="text-xs text-[#7F7168] line-clamp-1 mt-0.5">
                Cellular restoration, deep micro-infusion & cold-stone sculpting...
              </p>
            </div>
          </div>

          {/* Pillar 2: Hair */}
          <div
            onClick={() => onNavigate('services', 'aura-botanical-scalp-hair')}
            className="bg-white hover:bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE3D9] shadow-xs flex items-center gap-4 cursor-pointer transition-all hover:border-[#5A4D46] group"
          >
            <div className="w-12 h-12 rounded-full bg-[#FCECE4] flex items-center justify-center text-[#995E4D] shrink-0 group-hover:scale-105 transition-transform">
              <Scissors className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521] group-hover:text-[#5A4D46] transition-colors truncate">
                  Haute Couture Hair Care
                </h3>
                <span className="text-xs text-[#8A7970] shrink-0 ml-2 font-medium">
                  45–75 MIN
                </span>
              </div>
              <p className="text-xs text-[#7F7168] line-clamp-1 mt-0.5">
                Balayage mastery, botanical gloss baths & scalp revival...
              </p>
            </div>
          </div>

          {/* Pillar 3: Holistic & Massage */}
          <div
            onClick={() => onNavigate('services', 'rose-quartz-gua-sha')}
            className="bg-white hover:bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE3D9] shadow-xs flex items-center gap-4 cursor-pointer transition-all hover:border-[#5A4D46] group"
          >
            <div className="w-12 h-12 rounded-full bg-[#FCECE4] flex items-center justify-center text-[#995E4D] shrink-0 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521] group-hover:text-[#5A4D46] transition-colors truncate">
                  Holistic Rituals & Massage
                </h3>
                <span className="text-xs text-[#8A7970] shrink-0 ml-2 font-medium">
                  60–120 MIN
                </span>
              </div>
              <p className="text-xs text-[#7F7168] line-clamp-1 mt-0.5">
                Aromatic cranial pressure points, hot basalt stones & meridian flow...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sanctuary Spotlight (Matches Image 1 Middle Section) */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-xs">
          
          {/* Photo with Overlay Badges */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE4DA]">
            <img
              src={sanctuaryInteriorImg}
              alt="Lucky Beauty Parlour Suite Sanctuary in Saint-Germain"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider font-semibold text-[10px]">
                Suite Sanctuary
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium drop-shadow-sm">
                <span>Saint-Germain, Paris</span>
              </span>
            </div>
          </div>

          {/* Copy & Details */}
          <div className="p-6 sm:p-7 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2521] font-normal leading-tight">
              A Sanctuary of Quiet Light & Warm Travertine
            </h2>
            <p className="text-xs sm:text-sm text-[#73645B] leading-relaxed">
              Designed with gentle limestone archways, backlit reflections, and linen accents. Each personal suite invites unhurried contemplation before and after your treatment session.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#EAE2D7] text-xs text-[#5A4D46]">
                <VolumeX className="w-3.5 h-3.5" />
                <span>Acoustic Serenity</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#EAE2D7] text-xs text-[#5A4D46]">
                <Coffee className="w-3.5 h-3.5" />
                <span>Herbal Infusions</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Vogue Living Editorial Quote Card (Matches Image 1) */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          
          {/* Subtle Pink Quote Mark Motif */}
          <div className="w-8 h-8 rounded-full bg-[#FCECE4] text-[#D48972] flex items-center justify-center mx-auto text-sm font-serif font-bold">
            &ldquo;&rdquo;
          </div>

          {/* 5 Stars */}
          <div className="flex items-center justify-center gap-1 text-[#86594C]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current stroke-none" />
            ))}
          </div>

          <blockquote className="font-serif text-lg sm:text-xl text-[#392E29] italic leading-relaxed max-w-lg mx-auto">
            &ldquo;Every visit restores both the skin&apos;s natural luminescence and the mind&apos;s peace.&rdquo;
          </blockquote>

          <cite className="block text-[11px] uppercase tracking-[0.2em] text-[#9A877E] font-medium not-italic pt-1">
            — Vogue Living
          </cite>
        </div>
      </section>

      {/* 5. Begin Experience Blush Banner (Matches Image 1 Bottom Callout) */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-b from-[#FCECE4] to-[#F7DDD1] rounded-3xl p-6 sm:p-8 text-center border border-[#F0D5C7] space-y-4 shadow-xs">
          
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C5D50] font-semibold block">
            Begin the Experience
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2521] font-normal">
            An Unhurried Moment for You
          </h2>

          <p className="text-xs sm:text-sm text-[#70564D] max-w-md mx-auto leading-relaxed">
            Private rooms and master aesthetician consultations reserved daily.
          </p>

          <div className="pt-2 space-y-2.5 max-w-sm mx-auto">
            <button
              onClick={() => onNavigate('book')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Select Treatment</span>
            </button>

            <button
              onClick={onOpenConcierge}
              className="w-full py-3.5 px-6 rounded-xl bg-white/80 hover:bg-white text-[#5A4D46] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-[#ECD3C6] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Concierge Inquiries</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
