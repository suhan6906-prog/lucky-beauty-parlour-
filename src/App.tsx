/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Reservation } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RitualsPage } from './pages/RitualsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { ConciergeModal } from './components/ConciergeModal';
import { ReservationsModal } from './components/ReservationsModal';
import { MembershipModal } from './components/MembershipModal';
import { SupabaseSettingsModal } from './components/SupabaseSettingsModal';
import { AuthModal } from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { fetchReservationsFromDb, cancelReservationInDb } from './lib/databaseService';
import { CheckCircle2, X } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'lucky_beauty_reservations_v1';

function AppContent() {
  const { user, isConfigured } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('lumiere-hydrating-facial');

  // Modals state
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState<boolean>(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState<boolean>(false);
  const [isSupabaseSettingsOpen, setIsSupabaseSettingsOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stored reservations (synced with Supabase or LocalStorage)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    // Seed with initial sample reservation
    return [
      {
        id: 'sample-res-1',
        referenceNumber: 'LKY-78241',
        treatmentId: 'lumiere-hydrating-facial',
        treatmentTitle: 'The Lumière Hydrating Facial',
        price: 165,
        durationMin: 75,
        date: 'Tuesday, Oct 14',
        timeSlot: '11:30 AM',
        artistId: 'elena-vance',
        artistName: 'Elena Vance',
        clientName: 'Camille Laurent',
        clientEmail: 'camille.laurent@paris.com',
        clientPhone: '+33 6 42 89 12 04',
        comfortNotes: 'Sensitive skin near cheekbones, gentle lavender mist preferred.',
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      },
    ];
  });

  // Load from Supabase if configured
  const loadDbReservations = async () => {
    if (!isConfigured) return;
    try {
      const dbReservations = await fetchReservationsFromDb(user?.email || undefined);
      if (dbReservations.length > 0) {
        setReservations(dbReservations);
      }
    } catch (err) {
      console.warn('Could not fetch from Supabase:', err);
    }
  };

  useEffect(() => {
    loadDbReservations();
  }, [isConfigured, user]);

  // Persist reservations locally for seamless offline UX
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  // Scroll to top on tab change
  const handleSelectTab = (tab: TabType, treatmentId?: string) => {
    if (treatmentId) {
      setSelectedTreatmentId(treatmentId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    setToastMessage(`Ritual Reserved: Reference ${newRes.referenceNumber}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const handleCancelReservation = async (id: string) => {
    const target = reservations.find((r) => r.id === id);
    if (target && isConfigured) {
      try {
        await cancelReservationInDb(target.referenceNumber);
      } catch (err) {
        console.warn('Failed to cancel in Supabase:', err);
      }
    }

    setReservations((prev) => prev.filter((r) => r.id !== id));
    setToastMessage('Reservation cancelled. An atelier host was notified.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectTreatmentForBooking = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setCurrentTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#332B27]">
      {/* Top and Mobile Bottom Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenReservations={() => setIsReservationsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSupabaseSettings={() => setIsSupabaseSettingsOpen(true)}
        reservationCount={reservations.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4 sm:py-6">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleSelectTab}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            onSelectTreatmentForBooking={handleSelectTreatmentForBooking}
            onOpenMembership={() => setIsMembershipOpen(true)}
            onNavigate={handleSelectTab}
          />
        )}

        {currentTab === 'rituals' && (
          <RitualsPage onNavigate={handleSelectTab} />
        )}

        {currentTab === 'gallery' && (
          <GalleryPage onNavigate={handleSelectTab} />
        )}

        {currentTab === 'book' && (
          <BookingPage
            initialTreatmentId={selectedTreatmentId}
            onBookingSuccess={handleBookingSuccess}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={handleSelectTab}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-[#2D2521] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#443831] animate-slide-up text-xs">
          <CheckCircle2 className="w-4 h-4 text-[#D19F87] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:text-[#D19F87] transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Concierge Dialog */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      {/* User Reservations Ledger Modal */}
      <ReservationsModal
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
        onNavigateToTab={handleSelectTab}
      />

      {/* Atelier Privé Membership Application Modal */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
      />

      {/* Supabase Connection Setup Modal */}
      <SupabaseSettingsModal
        isOpen={isSupabaseSettingsOpen}
        onClose={() => setIsSupabaseSettingsOpen(false)}
        onConnectionChanged={loadDbReservations}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenSettings={() => setIsSupabaseSettingsOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
