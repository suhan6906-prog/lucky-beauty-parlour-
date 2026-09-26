import React, { useState } from 'react';
import { TabType } from '../types';
import { guashaTreatmentImg, founderElenaImg } from '../data/treatments';
import { 
  Sparkles, 
  Droplet, 
  Activity, 
  Volume2, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  Calendar, 
  Clock, 
  HeartHandshake, 
  RefreshCw, 
  Leaf, 
  Shield 
} from 'lucide-react';

interface RitualsPageProps {
  onNavigate: (tab: TabType) => void;
}

export const RitualsPage: React.FC<RitualsPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-10">
      
      {/* 1. Header (Matches Image 7) */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCECE4] text-[#86594C] text-[11px] uppercase tracking-[0.2em] font-medium shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D48972]" />
          <span>Philosophy & Artistry</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#2D2521] font-normal leading-tight">
          Rituals Rooted in <span className="italic">Slowness</span> & Radiance
        </h1>

        <p className="text-xs sm:text-sm text-[#73645B] max-w-lg mx-auto leading-relaxed">
          An intentional departure from hurried aesthetics, honoring your skin&apos;s innate biological rhythm.
        </p>
      </div>

      {/* 2. Photo Feature: Gua Sha Meridian Flow (Matches Image 7) */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-xs">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full bg-[#EAE2D8] overflow-hidden">
          <img
            src={guashaTreatmentImg}
            alt="Cold blending botanical treatment in Lucky Beauty Parlour"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Lower Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#EBD9D2] font-semibold block">
              Apothecary Cold Blending
            </span>
            <p className="text-xs sm:text-sm font-light text-[#FDFBF7] leading-relaxed max-w-md">
              Handcrafted botanical formulations prepared fresh for every client consultation.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-[#D8C7BF] border-t border-white/20">
              <span>Atelier Archive No. 24</span>
              <span className="flex items-center gap-1">
                <span>Gua Sha Meridian Flow</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Manifesto Quote Card (Matches Image 7) */}
      <div className="bg-[#FAF2EC] border border-[#F0E4DA] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
        <div className="text-[#D48972] font-serif text-4xl leading-none select-none opacity-80">
          &ldquo;&rdquo;
        </div>

        <blockquote className="font-serif text-lg sm:text-2xl text-[#2D2521] italic leading-relaxed max-w-md mx-auto">
          &ldquo;True skincare is an unspoken choreography between touch, temperature, and botanical memory.&rdquo;
        </blockquote>

        <div className="w-12 h-[1px] bg-[#D8C2B8] mx-auto" />

        <cite className="block text-[11px] uppercase tracking-[0.2em] text-[#86594C] font-semibold not-italic">
          Lucky Atelier Manifesto
        </cite>
      </div>

      {/* 4. The Four Pillars (Matches Image 7) */}
      <div className="space-y-4">
        <div className="flex items-end justify-between border-b border-[#EAE3D9] pb-2">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#9A877E] font-medium block">
              Methodology
            </span>
            <h2 className="font-serif text-2xl text-[#2D2521] font-normal">
              The Four Pillars
            </h2>
          </div>
          <span className="text-xs text-[#8A7970] font-sans">Core Disciplines</span>
        </div>

        <div className="space-y-3">
          {/* Pillar I */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE3D9] flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] flex items-center justify-center font-serif text-base italic text-[#5A4D46] shrink-0">
              I
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521]">Pure Botanical Extractions</h3>
                <Droplet className="w-4 h-4 text-[#86594C] shrink-0" />
              </div>
              <p className="text-xs text-[#73645B] mt-1 leading-relaxed">
                Single-estate cold-pressed rosehip seed, micro-filtered Damascus rose mist, and high-altitude alpine edelweiss extract.
              </p>
            </div>
          </div>

          {/* Pillar II */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE3D9] flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] flex items-center justify-center font-serif text-base italic text-[#5A4D46] shrink-0">
              II
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521]">Tactile Meridian Therapy</h3>
                <Activity className="w-4 h-4 text-[#86594C] shrink-0" />
              </div>
              <p className="text-xs text-[#73645B] mt-1 leading-relaxed">
                Centuries-old sculptural contouring paired seamlessly with rhythmic French lymphatic drainage to awaken muscular vitality.
              </p>
            </div>
          </div>

          {/* Pillar III */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE3D9] flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] flex items-center justify-center font-serif text-base italic text-[#5A4D46] shrink-0">
              III
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521]">Acoustic &amp; Thermal Peace</h3>
                <Volume2 className="w-4 h-4 text-[#86594C] shrink-0" />
              </div>
              <p className="text-xs text-[#73645B] mt-1 leading-relaxed">
                Curated 432Hz ambient solfeggio soundscapes, warmed raw linen cocooning, and temperature-cycled Himalayan jade compresses.
              </p>
            </div>
          </div>

          {/* Pillar IV */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE3D9] flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] flex items-center justify-center font-serif text-base italic text-[#5A4D46] shrink-0">
              IV
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2D2521]">Bespoke Aftercare Protocol</h3>
                <BookOpen className="w-4 h-4 text-[#86594C] shrink-0" />
              </div>
              <p className="text-xs text-[#73645B] mt-1 leading-relaxed">
                Hand-inscribed regimen guidance and customized micro-elixirs to prolong and deepen atelier results within your home sanctuary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Founder Elena Vance Profile (Matches Image 7) */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EAE2D7] shrink-0 bg-[#EAE2D8]">
            <img
              src={founderElenaImg}
              alt="Elena Vance Master Aesthetician"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
              Founder &amp; Master Facialist
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#2D2521]">
              Elena Vance
            </h3>
            <span className="text-xs text-[#7A6B63] block">
              14 years clinical &amp; holistic mastery
            </span>
          </div>
        </div>

        <blockquote className="font-serif text-sm sm:text-base text-[#3E332D] italic bg-[#FAF7F2] p-4 rounded-xl border border-[#EFE8DF] leading-relaxed">
          &ldquo;Beauty is not correction—it is an authentic dialogue between inner nervous system calm and luminous vitality.&rdquo;
        </blockquote>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#7A6B63] pt-1 border-t border-[#F5EFE8] gap-2">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#5A4D46]" />
            <span>CIDESCO Diplôme Honoraire</span>
          </span>
          <span className="font-medium text-[#5A4D46]">
            Atelier Paris &amp; Lyon
          </span>
        </div>
      </div>

      {/* 6. Formulation Commitments Grid (Matches Image 7) */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-widest text-[#9A877E] font-medium block">
            Ethical Integrity
          </span>
          <h2 className="font-serif text-2xl text-[#2D2521] font-normal">
            Formulation Commitments
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Commitment 1 */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] text-center space-y-2 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center mx-auto">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base text-[#2D2521]">100% Cruelty-Free</h4>
            <p className="text-[11px] text-[#86756C]">Leaping Bunny certified</p>
          </div>

          {/* Commitment 2 */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] text-center space-y-2 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center mx-auto">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base text-[#2D2521]">Biophotonic Glass</h4>
            <p className="text-[11px] text-[#86756C]">UV-protective recyclable</p>
          </div>

          {/* Commitment 3 */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] text-center space-y-2 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center mx-auto">
              <Leaf className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base text-[#2D2521]">Vegan Certified</h4>
            <p className="text-[11px] text-[#86756C]">Wildcrafted bio-actives</p>
          </div>

          {/* Commitment 4 */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE3D9] text-center space-y-2 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center mx-auto">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base text-[#2D2521]">Zero Synthetics</h4>
            <p className="text-[11px] text-[#86756C]">Paraben &amp; sulfate free</p>
          </div>
        </div>
      </div>

      {/* 7. What to Expect on Arrival Accordion (Matches Image 7) */}
      <div className="space-y-3">
        {/* Accordion Item 1 */}
        <div className="bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs">
          <button
            onClick={() => toggleFaq(0)}
            className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left hover:bg-[#FAF7F2] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5EDE3] flex items-center justify-center text-[#5A4D46]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-[#2D2521]">
                  What to Expect on Arrival
                </h4>
                <span className="text-[11px] text-[#8A7970] block">
                  The 15-minute decompress protocol
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#7A6B63] transition-transform duration-200 ${
                openFaq === 0 ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openFaq === 0 && (
            <div className="p-4.5 sm:p-5 pt-0 text-xs sm:text-[13px] text-[#706259] leading-relaxed border-t border-[#F5EFE8] space-y-2">
              <p>
                Guests are invited to arrive 15 minutes prior to their ritual. You will be welcomed with a lukewarm infusion of wild Damascus rose and verbena, followed by warm towel service to release metropolitan dust and stress.
              </p>
              <p>
                A private diagnostic discussion follows in our travertine library to calibrate temperatures, botanicals, and pressure before you step onto the linen treatment bed.
              </p>
            </div>
          )}
        </div>

        {/* Accordion Item 2 */}
        <div className="bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs">
          <button
            onClick={() => toggleFaq(1)}
            className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left hover:bg-[#FAF7F2] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5EDE3] flex items-center justify-center text-[#5A4D46]">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-[#2D2521]">
                  Our Bespoke Cold-Formulation Process
                </h4>
                <span className="text-[11px] text-[#8A7970] block">
                  No heat degradation of precious phytonutrients
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#7A6B63] transition-transform duration-200 ${
                openFaq === 1 ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openFaq === 1 && (
            <div className="p-4.5 sm:p-5 pt-0 text-xs sm:text-[13px] text-[#706259] leading-relaxed border-t border-[#F5EFE8] space-y-2">
              <p>
                Conventional skincare often applies high heat during manufacturing, weakening cellular actives. At Lucky Atelier, we blend cold-pressed botanical lipids and bio-ferments at room temperature in dark biophotonic violet glass.
              </p>
              <p>
                This safeguards the delicate lipid barriers, vitamins C &amp; E, and natural polyphenols until the moment they touch your skin.
              </p>
            </div>
          )}
        </div>

        {/* Accordion Item 3 */}
        <div className="bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs">
          <button
            onClick={() => toggleFaq(2)}
            className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left hover:bg-[#FAF7F2] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5EDE3] flex items-center justify-center text-[#5A4D46]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-[#2D2521]">
                  Sanctuary Etiquette &amp; Digital Silence
                </h4>
                <span className="text-[11px] text-[#8A7970] block">
                  Preserving tranquil resonance for all guests
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#7A6B63] transition-transform duration-200 ${
                openFaq === 2 ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openFaq === 2 && (
            <div className="p-4.5 sm:p-5 pt-0 text-xs sm:text-[13px] text-[#706259] leading-relaxed border-t border-[#F5EFE8]">
              <p>
                To maintain an acoustic sanctuary, we kindly ask that devices remain silent in your private suite locker. We invite you to surrender completely to the natural solfeggio soundscape and quiet breathwork.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 8. Reserve Slowness CTA (Matches Image 7 Bottom Section) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] text-center space-y-4 shadow-xs">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#96867D] block">
          Reserve Your Slowness
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2521] font-normal">
          Experience the Atelier
        </h2>

        <p className="text-xs sm:text-sm text-[#73645B] max-w-sm mx-auto leading-relaxed">
          Appointments are limited each day to preserve uninterrupted tranquility for each guest.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('book')}
            className="w-full py-3.5 px-6 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Atelier Consultation</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A7970] pt-1">
          <Clock className="w-3.5 h-3.5 text-[#5A4D46]" />
          <span>Curated sessions from 60 to 120 minutes</span>
        </div>
      </div>

    </div>
  );
};
