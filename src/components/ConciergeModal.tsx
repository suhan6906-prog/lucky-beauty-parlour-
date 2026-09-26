import React, { useState } from 'react';
import { X, Phone, MessageSquare, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { createConciergeInquiryInDb } from '../lib/databaseService';
import { useAuth } from '../context/AuthContext';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const { user, isConfigured } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user?.email || '');
  const [inquiryType, setInquiryType] = useState('Bespoke Facial Consultation');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isConfigured) {
        await createConciergeInquiryInDb({
          clientName: name,
          contactInfo: phone,
          inquiryType,
          message,
          userId: user?.id,
        });
      }
    } catch (err) {
      console.warn('Could not sync inquiry to Supabase:', err);
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
          aria-label="Close Concierge Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#9A877E] font-medium">
            Personal Atelier Assistance
          </span>
          <h3 className="font-serif text-2xl text-[#2D2521] mt-1 font-normal">
            Atelier Concierge Desk
          </h3>
          <p className="text-xs text-[#7A6B63] mt-2 max-w-xs mx-auto leading-relaxed">
            Our private care concierges are available to curate bespoke rituals, coordinate bridal parties, or accommodate discreet privacy requests.
          </p>
        </div>

        {/* Quick Direct Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="tel:+33142685500"
            className="flex items-center justify-center gap-2 p-3 bg-white border border-[#E8DFD3] rounded-xl text-xs font-medium text-[#2D2521] hover:border-[#5A4D46] hover:bg-[#F8F4EE] transition-all text-center"
          >
            <Phone className="w-4 h-4 text-[#5A4D46]" />
            <span>+33 1 42 68 55 00</span>
          </a>
          <a
            href="https://wa.me/33142685500?text=Bonjour,%20I%20would%20like%20to%20inquire%20about%20a%20ritual%20at%20Lucky%20Beauty%20Parlour"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-white border border-[#E8DFD3] rounded-xl text-xs font-medium text-[#2D2521] hover:border-[#5A4D46] hover:bg-[#F8F4EE] transition-all text-center"
          >
            <MessageSquare className="w-4 h-4 text-[#5A4D46]" />
            <span>WhatsApp Care</span>
          </a>
        </div>

        {submitted ? (
          <div className="bg-[#F3EBE1] p-6 rounded-xl text-center space-y-3 border border-[#E5DACD]">
            <CheckCircle2 className="w-8 h-8 text-[#5A4D46] mx-auto" />
            <h4 className="font-serif text-lg text-[#2D2521]">Inquiry Received with Grace</h4>
            <p className="text-xs text-[#7A6B63]">
              Thank you, {name || 'valued guest'}. An atelier host will contact you within 2 business hours via your preferred method.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 text-xs font-medium text-[#5A4D46] underline hover:text-[#2D2521]"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Camille de Saint-Germain"
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Contact Number or Email
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78 or email@domain.com"
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Area of Inquiry
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521]"
              >
                <option value="Bespoke Facial Consultation">Bespoke Facial Consultation</option>
                <option value="Bridal & Ceremony Atelier">Bridal & Ceremony Atelier Privé</option>
                <option value="Haute Couture Hair Transformation">Haute Couture Hair Transformation</option>
                <option value="Discreet VIP Suite Reservation">Discreet VIP Suite Reservation</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#6E6058] block">
                Message & Desired Dates
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Preferred timing, specific skin concerns, or special requests..."
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#E2D8CC] rounded-lg focus:outline-none focus:border-[#5A4D46] text-[#2D2521] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#5A4D46] text-white rounded-lg text-xs font-medium uppercase tracking-wider hover:bg-[#443934] transition-colors"
            >
              Submit Concierge Request
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-[#EFE8DF] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86756C] gap-2">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#5A4D46]" />
            8 Rue de Grenelle, 75007 Paris
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5A4D46]" />
            Mon – Sat: 9:30 AM – 7:30 PM
          </span>
        </div>
      </div>
    </div>
  );
};
