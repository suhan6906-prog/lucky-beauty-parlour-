import React, { useState, useEffect } from 'react';
import { TREATMENTS, AESTHETICIANS, TIME_SLOTS, sanctuaryInteriorImg } from '../data/treatments';
import { Treatment, Aesthetician, Reservation } from '../types';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { createReservationInDb } from '../lib/databaseService';
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Leaf, 
  RefreshCw, 
  ShieldCheck, 
  CalendarCheck, 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  Download, 
  User, 
  Mail, 
  Phone,
  Database
} from 'lucide-react';

interface BookingPageProps {
  initialTreatmentId?: string;
  onBookingSuccess: (reservation: Reservation) => void;
  onOpenConcierge: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialTreatmentId,
  onBookingSuccess,
  onOpenConcierge,
}) => {
  const { user, isConfigured } = useAuth();
  // Step 1: Ritual, Step 2: Date & Time, Step 3: Artist, Step 4: Review & Confirm
  const [currentStep, setCurrentStep] = useState<number>(2); // Default to Step 2 as in Image 5

  // Selected Treatment
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(() => {
    const found = TREATMENTS.find((t) => t.id === initialTreatmentId);
    return found || TREATMENTS[0];
  });

  // Calendar dates generation (next 6 days starting from today or mid-month)
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(1);
  const dates = [
    { dayName: 'MON', dayNumber: '13', fullDate: 'Monday, Oct 13' },
    { dayName: 'TUE', dayNumber: '14', fullDate: 'Tuesday, Oct 14' },
    { dayName: 'WED', dayNumber: '15', fullDate: 'Wednesday, Oct 15' },
    { dayName: 'THU', dayNumber: '16', fullDate: 'Thursday, Oct 16' },
    { dayName: 'FRI', dayNumber: '17', fullDate: 'Friday, Oct 17' },
    { dayName: 'SAT', dayNumber: '18', fullDate: 'Saturday, Oct 18' },
  ];

  // Selected Time Slot
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM');

  // Selected Aesthetician
  const [selectedArtist, setSelectedArtist] = useState<Aesthetician>(AESTHETICIANS[0]);

  // Comfort Notes
  const [comfortNotes, setComfortNotes] = useState<string>('');

  // Client Details (prefill if authenticated user exists)
  const [clientName, setClientName] = useState<string>(() => user?.user_metadata?.full_name || 'Camille Laurent');
  const [clientEmail, setClientEmail] = useState<string>(() => user?.email || 'camille.laurent@paris.com');
  const [clientPhone, setClientPhone] = useState<string>('+33 6 42 89 12 04');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Confirmed booking state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Auto-sync with authenticated user if user logs in
  useEffect(() => {
    if (user) {
      if (user.user_metadata?.full_name) setClientName(user.user_metadata.full_name);
      if (user.email) setClientEmail(user.email);
    }
  }, [user]);

  // Sync if initialTreatmentId prop changes
  useEffect(() => {
    if (initialTreatmentId) {
      const found = TREATMENTS.find((t) => t.id === initialTreatmentId);
      if (found) {
        setSelectedTreatment(found);
      }
    }
  }, [initialTreatmentId]);

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newRef = `LKY-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      referenceNumber: newRef,
      treatmentId: selectedTreatment.id,
      treatmentTitle: selectedTreatment.title,
      price: selectedTreatment.price,
      durationMin: selectedTreatment.durationMin,
      date: dates[selectedDateIndex].fullDate,
      timeSlot: selectedTime,
      artistId: selectedArtist.id,
      artistName: selectedArtist.name,
      clientName,
      clientEmail,
      clientPhone,
      comfortNotes,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // If Supabase is connected, persist into cloud database
    try {
      if (isConfigured) {
        await createReservationInDb(newReservation, user?.id);
      }
    } catch (err) {
      console.warn('Could not save to Supabase directly, falling back to local sync:', err);
    } finally {
      setSubmitting(false);
      setConfirmedReservation(newReservation);
      onBookingSuccess(newReservation);
    }
  };

  const handleDownloadIcs = () => {
    if (!confirmedReservation) return;
    const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lucky Beauty Parlour//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:${confirmedReservation.treatmentTitle} - Lucky Beauty Parlour
DESCRIPTION:Atelier appointment with ${confirmedReservation.artistName}. Reference: ${confirmedReservation.referenceNumber}.
LOCATION:Lucky Beauty Parlour, 8 Rue de Grenelle, 75007 Paris
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lucky-Atelier-${confirmedReservation.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If already confirmed, render the luxury confirmation voucher!
  if (confirmedReservation) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-8 animate-fade-in">
        <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 shadow-sm text-center space-y-6">
          
          <div className="w-16 h-16 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8 stroke-[1.8]" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#86594C] block">
              Reservation Confirmed
            </span>
            <h2 className="font-serif text-3xl text-[#2D2521] font-normal">
              Your Sanctuary Suite is Prepared
            </h2>
            <p className="text-xs text-[#7A6B63] max-w-sm mx-auto">
              A private chamber at 8 Rue de Grenelle has been reserved exclusively for your session.
            </p>
          </div>

          {/* Ticket Pass */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#EFE8DF] p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D7] pb-3">
              <div className="flex items-center gap-3">
                <Logo size="sm" showText={false} />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7970] font-semibold block">
                    Atelier Reference
                  </span>
                  <span className="font-mono text-lg font-bold text-[#2D2521] tracking-wider">
                    {confirmedReservation.referenceNumber}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#8A7970] font-semibold block">
                  Total Investment
                </span>
                <span className="font-serif text-lg font-medium text-[#2D2521]">
                  ${confirmedReservation.price} (Pay on Departure)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#62534B]">
              <div className="flex items-center justify-between">
                <span className="text-[#8A7970]">Ritual:</span>
                <span className="font-serif text-sm font-semibold text-[#2D2521]">
                  {confirmedReservation.treatmentTitle} ({confirmedReservation.durationMin} mins)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A7970]">Date &amp; Time:</span>
                <span className="font-medium text-[#2D2521]">
                  {confirmedReservation.date} · {confirmedReservation.timeSlot}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A7970]">Practitioner:</span>
                <span className="font-medium text-[#2D2521]">
                  {confirmedReservation.artistName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A7970]">Guest:</span>
                <span className="font-medium text-[#2D2521]">
                  {confirmedReservation.clientName}
                </span>
              </div>
            </div>

            {confirmedReservation.comfortNotes && (
              <div className="p-3 bg-white rounded-xl border border-[#EAE2D7] text-[11px] text-[#7A6B63] italic">
                Notes: &quot;{confirmedReservation.comfortNotes}&quot;
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadIcs}
              className="w-full py-3.5 px-6 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Add to Apple / Google Calendar (.ics)</span>
            </button>

            <button
              onClick={() => {
                setConfirmedReservation(null);
                setCurrentStep(2);
              }}
              className="w-full py-3 px-6 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#5A4D46] text-xs font-medium border border-[#EAE2D7] transition-all"
            >
              Reserve Another Session
            </button>
          </div>

          <div className="text-[11px] text-[#86756C] pt-2 border-t border-[#EFE8DF] space-y-1">
            <p>Confirmation and decompress instructions dispatched to <strong>{confirmedReservation.clientEmail}</strong>.</p>
            <p>Concierge assistance: <button onClick={onOpenConcierge} className="text-[#5A4D46] underline font-medium">+33 1 42 68 55 00</button></p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-2 pb-24 space-y-6">
      
      {/* 1. Header Hero Banner (Matches Image 5) */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/7] sm:aspect-[16/6] bg-[#EAE2D8] border border-[#EAE3D9] shadow-xs">
        <img
          src={sanctuaryInteriorImg}
          alt="Private Sanctuary at Lucky Beauty Parlour"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        
        <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#EBD9D2] block">
            Private Sanctuary
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-normal leading-none">
            Reserve Your Ritual
          </h1>
        </div>
      </div>

      {/* 2. Step Progress Indicators (Matches Image 5: 1 Ritual, 2 Date & Time, 3 Artist, 4 Review) */}
      <div className="flex items-center justify-between text-xs px-2 sm:px-4 py-2 border-b border-[#EAE3D9]">
        
        {/* Step 1 */}
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-1.5 focus:outline-none"
        >
          <div className="w-5 h-5 rounded-full bg-[#5A4D46] text-white flex items-center justify-center text-[10px]">
            <Check className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span className="font-medium text-[#2D2521] text-[11px]">Ritual</span>
        </button>

        <div className="h-[1px] w-6 sm:w-10 bg-[#D8C7BF]" />

        {/* Step 2 */}
        <button
          onClick={() => setCurrentStep(2)}
          className="flex items-center gap-1.5 focus:outline-none"
        >
          <div className="w-5 h-5 rounded-full bg-[#5A4D46] text-white flex items-center justify-center text-[10px] font-bold">
            2
          </div>
          <span className="font-medium text-[#2D2521] text-[11px]">Date &amp; Time</span>
        </button>

        <div className="h-[1px] w-6 sm:w-10 bg-[#D8C7BF]" />

        {/* Step 3 */}
        <button
          onClick={() => setCurrentStep(3)}
          className="flex items-center gap-1.5 focus:outline-none"
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            currentStep >= 3 ? 'bg-[#5A4D46] text-white' : 'bg-[#EAE2D8] text-[#86756C]'
          }`}>
            3
          </div>
          <span className={`text-[11px] ${currentStep >= 3 ? 'font-medium text-[#2D2521]' : 'text-[#86756C]'}`}>
            Artist
          </span>
        </button>

        <div className="h-[1px] w-6 sm:w-10 bg-[#D8C7BF]" />

        {/* Step 4 */}
        <button
          onClick={() => setCurrentStep(4)}
          className="flex items-center gap-1.5 focus:outline-none"
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            currentStep === 4 ? 'bg-[#5A4D46] text-white' : 'bg-[#EAE2D8] text-[#86756C]'
          }`}>
            4
          </div>
          <span className={`text-[11px] ${currentStep === 4 ? 'font-medium text-[#2D2521]' : 'text-[#86756C]'}`}>
            Review
          </span>
        </button>

      </div>

      {/* Step 1 Drawer: Swap Ritual */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-4 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#2D2521]">Select Your Treatment</h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-[#5A4D46] font-medium hover:underline"
            >
              Continue with {selectedTreatment.title} →
            </button>
          </div>
          <div className="space-y-3">
            {TREATMENTS.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTreatment(t);
                  setCurrentStep(2);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedTreatment.id === t.id
                    ? 'border-[#5A4D46] bg-[#FAF7F2]'
                    : 'border-[#EAE2D8] hover:border-[#5A4D46]'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#8C5D50] block">
                    {t.kicker}
                  </span>
                  <h4 className="font-serif text-base text-[#2D2521]">{t.title}</h4>
                  <span className="text-xs text-[#8A7970]">{t.durationLabel}</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-lg text-[#2D2521]">${t.price}</span>
                  <span className="block text-[10px] text-emerald-700 font-medium">Select</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Selected Ritual Summary Card (Matches Image 5) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-3.5 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FCECE4] text-[#86594C] text-[10px] uppercase tracking-wider font-semibold mb-1">
              {selectedTreatment.badge || 'AURA ATELIER SIGNATURE'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#2D2521] font-normal leading-snug">
              {selectedTreatment.title}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className="font-serif text-2xl text-[#2D2521] font-medium leading-none tabular-nums">
              ${selectedTreatment.price}
            </span>
            <span className="block text-[11px] text-[#8A7970] mt-0.5">
              {selectedTreatment.durationMin} mins
            </span>
          </div>
        </div>

        {/* Complimentary Callout (Matches Image 5) */}
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE8DF] flex items-start gap-2.5 text-xs text-[#6F6057]">
          <Leaf className="w-4 h-4 text-[#86594C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Complimentary botanical herbal tea, bespoke jade rolling &amp; skin diagnostic analysis included with your treatment.
          </p>
        </div>

        {/* Change Ritual & Calm and Soothing tags */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F5EFE8]">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1.5 text-[#5A4D46] hover:text-[#2D2521] font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Ritual</span>
          </button>

          <span className="flex items-center gap-1 text-[#86594C] text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Calm &amp; Soothing</span>
          </span>
        </div>
      </div>

      {/* 4. Date Picker Strip (Matches Image 5) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#5A4D46]" />
            <h3 className="font-serif text-lg text-[#2D2521]">October 2026</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded-lg hover:bg-[#FAF7F2] text-[#86756C] hover:text-[#2D2521]"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="p-1 rounded-lg hover:bg-[#FAF7F2] text-[#86756C] hover:text-[#2D2521]"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day Pills Strip */}
        <div className="grid grid-cols-6 gap-2">
          {dates.map((d, index) => {
            const isSelected = selectedDateIndex === index;
            return (
              <button
                key={d.dayNumber}
                onClick={() => setSelectedDateIndex(index)}
                className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#554942] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#63544C] hover:bg-[#F2ECE3] border border-[#EFE8DF]'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider font-medium opacity-80">
                  {d.dayName}
                </span>
                <span className="text-base font-serif font-bold mt-0.5">
                  {d.dayNumber}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8C4B8] mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Available Windows (Matches Image 5) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#2D2521] font-serif font-medium flex items-center gap-1.5">
              Available Windows
            </span>
          </div>
          <span className="text-xs text-[#8A7970] font-medium">
            {dates[selectedDateIndex].fullDate}
          </span>
        </div>

        {/* Morning */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
            Morning
          </span>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.morning.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#655750] border border-[#EAE2D8] hover:border-[#5A4D46]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Afternoon */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
            Afternoon
          </span>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.afternoon.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#655750] border border-[#EAE2D8] hover:border-[#5A4D46]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening Sanctuary */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
            Evening Sanctuary
          </span>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.evening.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#FBEBE2] text-[#7A4B3D] border border-[#F0D5C7] shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#655750] border border-[#EAE2D8] hover:border-[#5A4D46]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Master Aesthetician Selector (Matches Image 5) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-[#2D2521]">Master Aesthetician</h3>
          <span className="text-xs text-[#8A7970]">Requested</span>
        </div>

        <div className="space-y-2.5">
          {AESTHETICIANS.map((artist) => {
            const isSelected = selectedArtist.id === artist.id;
            return (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#5A4D46] bg-[#FAF7F2]'
                    : 'border-[#EAE2D8] hover:border-[#5A4D46]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {artist.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E0D5C8] shrink-0 bg-[#EAE2D8]">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#FCECE4] text-[#86594C] flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <h4 className="font-serif text-base text-[#2D2521] leading-tight font-medium">
                      {artist.name}
                    </h4>
                    <span className="text-[11px] text-[#7A6B63] block">
                      {artist.title} · {artist.experience.split(' ')[0]} yrs exp.
                    </span>
                    <span className="text-[10px] text-[#86594C] font-medium block">
                      ★ {artist.rating} ({artist.ritualCount} rituals)
                    </span>
                  </div>
                </div>

                {/* Radio Circle */}
                <div className="w-5 h-5 rounded-full border-2 border-[#5A4D46] flex items-center justify-center shrink-0">
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5A4D46]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Bespoke Comfort Notes (Matches Image 5) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#5A4D46]" />
          <h3 className="font-serif text-lg text-[#2D2521]">Bespoke Comfort Notes</h3>
        </div>

        <p className="text-xs text-[#7A6B63] leading-relaxed">
          Inform {selectedArtist.name.split(' ')[0]} of active retinoids, nut allergies, fragrance choices, or room temperature preferences.
        </p>

        <textarea
          rows={3}
          value={comfortNotes}
          onChange={(e) => setComfortNotes(e.target.value)}
          placeholder="Share skin sensitivities or preferences (e.g. lavender infusion, low light)..."
          className="w-full text-xs px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl focus:outline-none focus:border-[#5A4D46] text-[#2D2521] resize-none"
        />
      </div>

      {/* Guest Details & Contact info for confirmation */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
        <h3 className="font-serif text-lg text-[#2D2521]">Guest Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
              Full Name
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl text-xs">
              <User className="w-3.5 h-3.5 text-[#86756C]" />
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Your Name"
                className="bg-transparent focus:outline-none w-full text-[#2D2521]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
              Email Address
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl text-xs">
              <Mail className="w-3.5 h-3.5 text-[#86756C]" />
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="patron@domain.com"
                className="bg-transparent focus:outline-none w-full text-[#2D2521]"
              />
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C5D50] block">
              Mobile Number (for atelier suite access SMS)
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl text-xs">
              <Phone className="w-3.5 h-3.5 text-[#86756C]" />
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+33 6 00 00 00 00"
                className="bg-transparent focus:outline-none w-full text-[#2D2521]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 8. Trust Guarantees (Matches Image 5: Deposit Free & Flexible Hours) */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D9] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#5A4D46] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#2D2521] block">Deposit Free</span>
            <span className="text-[11px] text-[#7A6B63]">Pay after your ritual</span>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D9] flex items-start gap-2.5">
          <CalendarCheck className="w-4 h-4 text-[#5A4D46] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#2D2521] block">Flexible Hours</span>
            <span className="text-[11px] text-[#7A6B63]">Cancel up to 24h prior</span>
          </div>
        </div>
      </div>

      {/* 9. Sticky / Fixed Bottom Investment Bar (Matches Image 5) */}
      <div className="bg-white rounded-2xl border border-[#EAE3D9] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A7970] block">
              Total Investment
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-medium text-[#2D2521] tabular-nums">
                ${selectedTreatment.price}
              </span>
              <span className="text-[11px] text-[#8A7970]">all taxes included</span>
            </div>
          </div>

          <div className="text-right text-xs text-[#63544C]">
            <span className="font-medium block text-[#2D2521]">
              {dates[selectedDateIndex].dayName}, {dates[selectedDateIndex].dayNumber} Oct
            </span>
            <span className="text-[11px] text-[#8A7970]">
              {selectedTime} · {selectedArtist.name.split(' ')[0]} {selectedArtist.name.split(' ')[1]?.[0]}.
            </span>
          </div>
        </div>

        <button
          onClick={handleCompleteBooking}
          disabled={submitting}
          className="w-full py-4 px-6 rounded-xl bg-[#5A4D46] hover:bg-[#433833] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Securing Sanctuary Suite...</span>
            </>
          ) : (
            <>
              <span>Continue to Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-[#86756C] leading-tight">
          By continuing, you agree to our 24-hour atelier cancellation etiquette.
        </p>
      </div>

    </div>
  );
};
