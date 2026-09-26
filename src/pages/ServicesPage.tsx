import React, { useState } from 'react';
import { TREATMENTS } from '../data/treatments';
import { ServiceCategory, TabType } from '../types';
import { Droplet, Sparkles, Wind, Feather, Scissors, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onSelectTreatmentForBooking: (treatmentId: string) => void;
  onOpenMembership: () => void;
  onNavigate: (tab: TabType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectTreatmentForBooking,
  onOpenMembership,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const filteredTreatments = TREATMENTS.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet':
        return <Droplet className="w-3.5 h-3.5 text-[#86594C]" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-[#86594C]" />;
      case 'Wind':
        return <Wind className="w-3.5 h-3.5 text-[#86594C]" />;
      case 'Scissors':
        return <Scissors className="w-3.5 h-3.5 text-[#86594C]" />;
      case 'Feather':
        return <Feather className="w-3.5 h-3.5 text-[#86594C]" />;
      default:
        return <HeartHandshake className="w-3.5 h-3.5 text-[#86594C]" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-8">
      
      {/* Header (Matches Image 3) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5A4D46]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7C6B62]">
            Atelier Curations
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2521] font-normal leading-tight">
          Signature Offerings
        </h1>
        <p className="text-xs sm:text-sm text-[#73645B] leading-relaxed max-w-xl">
          Tailored treatments formulated with cold-pressed botanicals & pure minerals for restorative radiance.
        </p>
      </div>

      {/* Filter Tabs (Matches Image 3 Filter Pills) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          All Treatments
        </button>
        <button
          onClick={() => setActiveCategory('facial')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'facial'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          Skin & Facial
        </button>
        <button
          onClick={() => setActiveCategory('hair')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'hair'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          Haute Hair
        </button>
        <button
          onClick={() => setActiveCategory('body')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'body'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          Holistic Body
        </button>
        <button
          onClick={() => setActiveCategory('bridal')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'bridal'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          Ceremony & Gala
        </button>
      </div>

      {/* Service Cards List (Matches Image 3) */}
      <div className="space-y-6">
        {filteredTreatments.map((treatment) => (
          <div
            key={treatment.id}
            className="bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            {/* If treatment has photo (like Rose Quartz Gua Sha Contouring in Image 3) */}
            {treatment.image && (
              <div className="relative aspect-[16/9] w-full bg-[#EAE2D8] overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {treatment.badge && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-[#5A4D46] shadow-xs border border-white/60">
                    {treatment.badge}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 space-y-4">
              
              {/* Card Header & Price */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#96867D] block">
                    {treatment.kicker}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2D2521] font-normal leading-snug">
                    {treatment.title}
                  </h3>
                </div>

                <div className="text-right shrink-0 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#EFE8DF]">
                  <div className="text-[10px] text-[#8A7970] font-medium uppercase tracking-wider">
                    {treatment.durationLabel}
                  </div>
                  <div className="font-serif text-lg text-[#2D2521] font-medium tabular-nums">
                    ${treatment.price}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[#706259] leading-relaxed">
                {treatment.description}
              </p>

              {/* Bottom Feature & Action Button */}
              <div className="pt-2 flex items-center justify-between border-t border-[#F5EFE8] gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#63544C]">
                  {renderIcon(treatment.featureIcon)}
                  <span className="font-medium text-[11px]">{treatment.featureTag}</span>
                </div>

                <button
                  onClick={() => onSelectTreatmentForBooking(treatment.id)}
                  className="px-5 py-2.5 rounded-lg bg-[#5A4D46] hover:bg-[#433833] text-white text-[11px] uppercase tracking-wider font-semibold transition-all active:scale-95 shadow-xs"
                >
                  Book Treatment
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Seasonal Privilege Card: The Atelier Privé Series (Matches Image 3 Bottom Card) */}
      <div className="relative bg-gradient-to-br from-[#FCECE4] to-[#F5DDD3] rounded-3xl p-6 sm:p-8 border border-[#F0D5C7] overflow-hidden shadow-xs">
        {/* Subtle decorative radial element */}
        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-[12px] border-white/20 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-1.5 text-[#86594C] text-[11px] uppercase tracking-widest font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Seasonal Privilege</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2521] font-normal leading-tight">
            The Atelier Privé Series
          </h2>

          <p className="text-xs sm:text-sm text-[#6D5349] leading-relaxed max-w-lg">
            Receive 3 curated rituals per season, bespoke seasonal apothecary giftings, and guaranteed priority atelier reservations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onOpenMembership}
              className="py-3 px-6 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
            >
              Inquire Membership
            </button>

            <span className="text-[11px] text-[#86594C] font-medium">
              Limited to 40 patrons
            </span>
          </div>
        </div>
      </div>

      {/* Link to Philosophy / Rituals */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('rituals')}
          className="inline-flex items-center gap-2 text-xs font-serif text-[#5A4D46] hover:text-[#2D2521] hover:underline"
        >
          <span>Discover our formulation philosophy and the Four Pillars</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
