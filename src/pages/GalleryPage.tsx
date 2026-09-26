import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/treatments';
import { GalleryItem, TabType } from '../types';
import { X, ZoomIn, Calendar, Star, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (tab: TabType) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C5D50] block">
          Visual Sanctuary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2521] font-normal leading-tight">
          Saint-Germain Atelier Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#73645B] leading-relaxed">
          Glimpses into our travertine archways, handcrafted botanical preparations, and unhurried facial choreography.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7]'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          All Impressions
        </button>
        <button
          onClick={() => setActiveCategory('sanctuary')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'sanctuary'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7]'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          Sanctuary Spaces
        </button>
        <button
          onClick={() => setActiveCategory('apothecary')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'apothecary'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7]'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          Botanical Formulations
        </button>
        <button
          onClick={() => setActiveCategory('rituals')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === 'rituals'
              ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7]'
              : 'bg-white text-[#786961] border border-[#EAE2D8] hover:border-[#5A4D46]'
          }`}
        >
          In-Session Rituals
        </button>
      </div>

      {/* Masonry-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition-all"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE2D8]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#2D2521] flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-5 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#86594C] block">
                {item.subtitle}
              </span>
              <h3 className="font-serif text-lg text-[#2D2521] font-medium leading-snug group-hover:text-[#5A4D46] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#7A6B63] line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Press Quotations */}
      <div className="bg-[#FAF7F2] border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C5D50]">
            Sanctuary Acclaim
          </span>
          <h3 className="font-serif text-2xl text-[#2D2521]">
            Honored in Parisian Press
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-xl border border-[#EFE8DF] space-y-2">
            <div className="flex justify-center text-[#86594C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="font-serif text-xs italic text-[#443831]">
              &ldquo;The benchmark for holistic facial architecture in the 7th arrondissement.&rdquo;
            </p>
            <span className="text-[10px] uppercase font-semibold text-[#96867D] block">
              Architectural Digest France
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#EFE8DF] space-y-2">
            <div className="flex justify-center text-[#86594C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="font-serif text-xs italic text-[#443831]">
              &ldquo;Elena Vance&apos;s Gua Sha technique restores cellular luminescence effortlessly.&rdquo;
            </p>
            <span className="text-[10px] uppercase font-semibold text-[#96867D] block">
              Elle Beauté Paris
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#EFE8DF] space-y-2">
            <div className="flex justify-center text-[#86594C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="font-serif text-xs italic text-[#443831]">
              &ldquo;An acoustic and tactile haven that dissolves the pace of Paris.&rdquo;
            </p>
            <span className="text-[10px] uppercase font-semibold text-[#96867D] block">
              Le Figaro Madame
            </span>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('book')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Inspired Treatment</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C5D50]">
                {selectedItem.subtitle}
              </span>
              <h3 className="font-serif text-2xl text-[#2D2521]">
                {selectedItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#73645B] leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-[#EFE8DF]">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-xs text-[#7A6B63] hover:text-[#2D2521]"
                >
                  Close View
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onNavigate('book');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5A4D46] text-white text-xs font-semibold rounded-lg hover:bg-[#433833] transition-colors"
                >
                  <span>Reserve Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
