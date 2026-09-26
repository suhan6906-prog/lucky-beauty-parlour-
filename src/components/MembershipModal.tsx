import React, { useState } from 'react';
import { X, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { createMembershipInDb } from '../lib/databaseService';
import { useAuth } from '../context/AuthContext';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const { user, isConfigured } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isConfigured) {
        await createMembershipInDb({
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
        });
      }
    } catch (err) {
      console.warn('Could not sync membership inquiry to Supabase:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7C6C63] hover:text-[#2D2521] rounded-full hover:bg-[#F2ECE3] transition-colors"
          aria-label="Close Membership Window"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#9A877E] font-medium">
            Seasonal Privilege Series
          </span>
          <h3 className="font-serif text-2xl text-[#2D2521] mt-1 font-normal">
            The Atelier Privé Series
          </h3>
          <p className="text-xs text-[#7A6B63] mt-2 leading-relaxed">
            Strictly limited to 40 patrons per Parisian season to preserve absolute intimacy, bespoke formulations, and guaranteed suite availability.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#F3EBE1] p-6 rounded-xl text-center space-y-3 border border-[#E5DACD]">
            <CheckCircle2 className="w-8 h-8 text-[#5A4D46] mx-auto" />
            <h4 className="font-serif text-lg text-[#2D2521]">Invitation Request Recorded</h4>
            <p className="text-xs text-[#7A6B63]">
              Thank you, {name}. Our Director of Patron Relations will review our current season cohort and contact you privately at {email}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 text-xs font-medium text-[#5A4D46] underline hover:text-[#2D2521]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#F8F3ED] p-4 rounded-xl space-y-2 border border-[#EBE2D7] text-xs text-[#63544C]">
              <div className="flex items-center gap-2 font-medium text-[#2D2521]">
                <ShieldCheck className="w-4 h-4 text-[#7A4B3D]" />
                <span>Patron Tier Inclusions:</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-[11px] text-[#7A6B63]">
                <li>3 custom master facial or hair therapies per quarter</li>
                <li>Quarterly hand-blended biophotonic botanical elixir gift box</li>
                <li>Priority weekend booking privileges with Elena Vance</li>
                <li>Complimentary organic French tisane and decompression lounge</li>
              </ul>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Patron Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Madame / Monsieur"
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Private Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 00 00 00 00"
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#5A4D46] text-white rounded-lg text-xs font-medium uppercase tracking-wider hover:bg-[#443934] transition-colors"
            >
              Submit Membership Application
            </button>
            <p className="text-[10px] text-center text-[#96867D]">
              Annual patron fee: €1,450 billed annually or €390 quarterly.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
