import { Treatment, Aesthetician, GalleryItem } from '../types';

import heroWomanImg from '../assets/images/riz_founder_hero_1790415217487.jpg';
import sanctuaryInteriorImg from '../assets/images/lucky_sanctuary_interior_1790413362647.jpg';
import guashaTreatmentImg from '../assets/images/lucky_guasha_treatment_1790413373522.jpg';
import founderElenaImg from '../assets/images/riz_founder_hero_1790415217487.jpg';
import apothecaryImg from '../assets/images/lucky_botanical_apothecary_1790413398382.jpg';

export { heroWomanImg, sanctuaryInteriorImg, guashaTreatmentImg, founderElenaImg, apothecaryImg };

export const TREATMENTS: Treatment[] = [
  {
    id: 'lumiere-hydrating-facial',
    title: 'The Lumière Hydrating Facial',
    kicker: 'APOTHECARY SIGNATURE',
    category: 'facial',
    durationMin: 75,
    durationLabel: '75 MIN',
    price: 165,
    description:
      'Deep lymphatic drainage combined with an organic hyaluronic infusion, followed by cold-stone sculpted rose quartz for a natural dewy lift.',
    badge: 'AURA ATELIER SIGNATURE',
    featureTag: 'Instant Glow & Plump',
    featureIcon: 'Droplet',
  },
  {
    id: 'rose-quartz-gua-sha',
    title: 'Rose Quartz Gua Sha Contouring',
    kicker: 'HOLISTIC SCULPTING',
    category: 'facial',
    durationMin: 50,
    durationLabel: '50 MIN',
    price: 125,
    description:
      'Relieves jawline tension, contours cheekbones, and gently awakens microcirculation using cold-pressed rosehip botanical elixirs.',
    badge: 'SPECIALIST FAVORITE',
    featureTag: 'Artisan Cold Stone',
    featureIcon: 'Sparkles',
    image: guashaTreatmentImg,
    specialistFavorite: true,
  },
  {
    id: 'aura-botanical-scalp-hair',
    title: 'Aura Botanical Scalp & Hair Ritual',
    kicker: 'HAIR ALCHEMY',
    category: 'hair',
    durationMin: 60,
    durationLabel: '60 MIN',
    price: 140,
    description:
      'Warm camellia & wild rosemary oil bath, accompanied by rhythmic acupressure scalp stimulation and finished with a salon silk blowout.',
    featureTag: 'Includes Blowout',
    featureIcon: 'Wind',
  },
  {
    id: 'bridal-luminescence-atelier',
    title: 'Bridal Luminescence Atelier',
    kicker: 'CEREMONY & GALA',
    category: 'bridal',
    durationMin: 120,
    durationLabel: '120 MIN',
    price: 280,
    description:
      'Complete haute couture skin preparation. Features pure 24k gold peptide eye therapy, neck and décolleté botanical polish, and an illuminating veil finish.',
    featureTag: '24k Gold & Silk Peel',
    featureIcon: 'Sparkles',
  },
  {
    id: 'french-phytotherapy-back',
    title: 'French Phytotherapy Back Purification',
    kicker: 'CELLULAR DETOX',
    category: 'body',
    durationMin: 60,
    durationLabel: '60 MIN',
    price: 155,
    description:
      'Warm organic green clay thermal poultice, gentle botanical brush exfoliations, followed by an invigorating cypress and juniper drainage sequence.',
    featureTag: 'Botanical Clay Poultice',
    featureIcon: 'Feather',
  },
  {
    id: 'craniosacral-warm-compress',
    title: 'Craniosacral & Warm Herb Compress',
    kicker: 'DEEP RESTORATION',
    category: 'body',
    durationMin: 90,
    durationLabel: '90 MIN',
    price: 195,
    description:
      'A slow sensory immersion combining rhythmic craniosacral decompression, 432Hz solfeggio audio frequency, and steamed chamomile muslin wraps.',
    featureTag: 'Solfeggio Acoustic Serenity',
    featureIcon: 'HeartHandshake',
  },
  {
    id: 'haute-couture-balayage-gloss',
    title: 'Haute Couture Botanical Hair Gloss & Trim',
    kicker: 'HAIR CRAFT',
    category: 'hair',
    durationMin: 75,
    durationLabel: '75 MIN',
    price: 185,
    description:
      'Plant-pigmented illuminating gloss bath that enriches natural highlights without ammonia, paired with precision Parisian dry scissor shaping.',
    featureTag: 'Plant Pigment Gloss',
    featureIcon: 'Scissors',
  }
];

export const AESTHETICIANS: Aesthetician[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    title: 'Master Aesthetician & Atelier Founder',
    experience: '9 yrs exp. at Lucky Atelier (14 yrs clinical)',
    rating: 4.98,
    ritualCount: 142,
    specialty: 'Lymphatic Drainage, Rose Quartz Sculpting, Micro-Infusion',
    image: founderElenaImg,
  },
  {
    id: 'camille-laurent',
    name: 'Camille Laurent',
    title: 'Senior Holistic Facialist & Scalp Specialist',
    experience: '7 yrs exp. in Parisian Botanical Therapy',
    rating: 4.96,
    ritualCount: 118,
    specialty: 'Japanese Acupressure, Scalp Alchemy, Botanical Peels',
  },
  {
    id: 'any-artist',
    name: 'Any Available Artist',
    title: 'Master Certified Aesthetician',
    experience: 'Immediate availability guaranteed',
    rating: 4.97,
    ritualCount: 380,
    specialty: 'Atelier standard protocol & custom botanical preparation',
  },
];

export const TIME_SLOTS = {
  morning: ['10:00 AM', '11:30 AM', '12:15 PM'],
  afternoon: ['01:30 PM', '03:00 PM', '04:30 PM'],
  evening: ['05:45 PM', '07:00 PM'],
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Suite Sanctuary in Saint-Germain',
    category: 'sanctuary',
    categoryLabel: 'Sanctuary Spaces',
    description:
      'Warm limestone archways, backlit reflections, and linen accents designed for unhurried contemplation before and after your session.',
    image: sanctuaryInteriorImg,
    subtitle: 'Saint-Germain, Paris · Private Room 01',
  },
  {
    id: 'g-2',
    title: 'Botanical Cold Blending Pedestal',
    category: 'apothecary',
    categoryLabel: 'Botanical Formulations',
    description:
      'Handcrafted elixirs cold-pressed from single-estate alpine edelweiss and Damascus rose water, prepared fresh for each client consultation.',
    image: apothecaryImg,
    subtitle: 'Atelier Formulation Archive · Pure Bio-Actives',
  },
  {
    id: 'g-3',
    title: 'Rose Quartz Gua Sha Meridian Flow',
    category: 'rituals',
    categoryLabel: 'In-Session Rituals',
    description:
      'Centuries-old sculptural contouring paired with rhythmic French lymphatic drainage to awaken muscular vitality and relieve facial tension.',
    image: guashaTreatmentImg,
    subtitle: 'Treatment Room 02 · Holistic Contouring',
  },
  {
    id: 'g-4',
    title: 'The Art of Radiant Well-Being',
    category: 'results',
    categoryLabel: 'Luminescence Results',
    description:
      'Restored cellular hydration and natural glow after a 75-minute Lumière Hydrating Facial session with master facialist Elena Vance.',
    image: heroWomanImg,
    subtitle: 'Client Luminescence · Post-Facial Radiance',
  },
  {
    id: 'g-5',
    title: 'Elena Vance Consultation Salon',
    category: 'sanctuary',
    categoryLabel: 'Sanctuary Spaces',
    description:
      'Founder Elena Vance conducting one-on-one diagnostic skin analysis in the warm travertine consultation library.',
    image: founderElenaImg,
    subtitle: 'Diagnostic Library · Saint-Germain',
  },
];
