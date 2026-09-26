export type TabType = 'home' | 'services' | 'rituals' | 'gallery' | 'book';

export type ServiceCategory = 'all' | 'facial' | 'hair' | 'body' | 'bridal';

export interface Treatment {
  id: string;
  title: string;
  kicker: string;
  category: ServiceCategory;
  durationMin: number;
  durationLabel: string;
  price: number;
  description: string;
  badge?: string;
  featureTag: string;
  featureIcon: string;
  image?: string;
  specialistFavorite?: boolean;
}

export interface Aesthetician {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  ritualCount: number;
  specialty: string;
  image?: string;
}

export interface Reservation {
  id: string;
  referenceNumber: string;
  treatmentId: string;
  treatmentTitle: string;
  price: number;
  durationMin: number;
  date: string;
  timeSlot: string;
  artistId: string;
  artistName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  comfortNotes?: string;
  createdAt: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'sanctuary' | 'apothecary' | 'rituals' | 'results';
  categoryLabel: string;
  description: string;
  image: string;
  subtitle: string;
}
