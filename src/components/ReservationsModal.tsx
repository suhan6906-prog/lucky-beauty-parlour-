import React from 'react';
import { X, Calendar, Clock, User, Download, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { Reservation, TabType } from '../types';
import { Logo } from './Logo';

interface ReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onNavigateToTab: (tab: TabType) => void;
}

export const ReservationsModal: React.FC<ReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const handleDownloadIcs = (res: Reservation) => {
    const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lucky Beauty Parlour//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:${res.treatmentTitle} - Lucky Beauty Parlour
DESCRIPTION:Atelier appointment with ${res.artistName}. Reference: ${res.referenceNumber}.
LOCATION:Lucky Beauty Parlour, 8 Rue de Grenelle, 75007 Paris
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Lucky-Atelier-${res.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7C6C63] hover:text-[#2D2521] rounded-full hover:bg-[#F2ECE3] transition-colors"
          aria-label="Close Reservations Window"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 flex items-start gap-4">
          <Logo size="md" showText={false} />
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9A877E] font-medium block">
              Personal Atelier Ledger
            </span>
            <h3 className="font-serif text-2xl text-[#2D2521] mt-0.5 font-normal">
              Your Reserved Rituals
            </h3>
            <p className="text-xs text-[#7A6B63] mt-1">
              Review your confirmed treatments, download calendar passes, or adjust your attendance.
            </p>
          </div>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-10 px-4 bg-[#F5EDE3] rounded-xl border border-[#E5DACD] space-y-4">
            <Calendar className="w-10 h-10 text-[#86756C] mx-auto opacity-70" />
            <div>
              <h4 className="font-serif text-lg text-[#2D2521]">No Scheduled Appointments</h4>
              <p className="text-xs text-[#7A6B63] max-w-sm mx-auto mt-1">
                You currently have no active treatment reservations at our Saint-Germain sanctuary.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigateToTab('book');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-[#5A4D46] text-white hover:bg-[#443934] transition-colors"
            >
              <span>Reserve Your First Ritual</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-[#EAE1D5] rounded-xl p-5 shadow-xs space-y-3 relative group"
              >
                <div className="flex items-start justify-between border-b border-[#F4EFEA] pb-3">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#86756C]">
                      Ref: {res.referenceNumber}
                    </span>
                    <h4 className="font-serif text-lg font-medium text-[#2D2521] leading-tight">
                      {res.treatmentTitle}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg text-[#2D2521]">${res.price}</span>
                    <span className="block text-[10px] text-[#86756C]">{res.durationMin} mins</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#63544C]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#5A4D46]" />
                    <span>{res.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#5A4D46]" />
                    <span>{res.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <User className="w-3.5 h-3.5 text-[#5A4D46]" />
                    <span>Practitioner: <strong>{res.artistName}</strong></span>
                  </div>
                </div>

                {res.comfortNotes && (
                  <p className="text-[11px] bg-[#FAF7F2] p-2.5 rounded-lg text-[#7A6B63] italic border border-[#EFE7DE]">
                    &quot;{res.comfortNotes}&quot;
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#F4EFEA] text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">Guaranteed Sanctuary Suite</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadIcs(res)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] border border-[#D5C7B8] rounded-md text-[#5A4D46] hover:bg-[#F8F4EE] transition-colors"
                      title="Add to Apple/Google Calendar (.ics)"
                    >
                      <Download className="w-3 h-3" />
                      <span>Calendar</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Cancel reservation for ${res.treatmentTitle}?`)) {
                          onCancelReservation(res.id);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                      title="Cancel Reservation"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3.5 bg-[#F6EFE6] rounded-xl text-[11px] text-[#7A6B63] flex items-start gap-2 border border-[#E7DCD0]">
              <AlertCircle className="w-4 h-4 text-[#5A4D46] shrink-0 mt-0.5" />
              <span>
                <strong>Atelier Etiquette:</strong> We reserve your private suite exclusively for you. If your schedule shifts, please notify our concierge at least 24 hours prior without cancellation fees.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
