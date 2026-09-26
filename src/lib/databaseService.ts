import { getSupabase, isSupabaseConfigured } from './supabase';
import { Reservation, Treatment } from '../types';

export interface DatabaseReservation {
  id?: string;
  reference_number: string;
  user_id?: string | null;
  treatment_id?: string | null;
  treatment_title: string;
  price: number;
  duration_min: number;
  date: string;
  time_slot: string;
  artist_id?: string | null;
  artist_name: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  comfort_notes?: string | null;
  status?: string;
  created_at?: string;
}

// 1. RESERVATIONS CRUD
export async function createReservationInDb(reservation: Reservation, userId?: string | null) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const payload: DatabaseReservation = {
    reference_number: reservation.referenceNumber,
    user_id: userId || null,
    treatment_id: reservation.treatmentId,
    treatment_title: reservation.treatmentTitle,
    price: reservation.price,
    duration_min: reservation.durationMin,
    date: reservation.date,
    time_slot: reservation.timeSlot,
    artist_id: reservation.artistId,
    artist_name: reservation.artistName,
    client_name: reservation.clientName,
    client_email: reservation.clientEmail,
    client_phone: reservation.clientPhone,
    comfort_notes: reservation.comfortNotes || null,
    status: reservation.status,
  };

  const { data, error } = await supabase
    .from('reservations')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Error inserting reservation in Supabase:', error);
    throw error;
  }
  return data;
}

export async function fetchReservationsFromDb(clientEmail?: string): Promise<Reservation[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    let query = supabase.from('reservations').select('*').order('created_at', { ascending: false });

    if (clientEmail) {
      query = query.eq('client_email', clientEmail);
    }

    const { data, error } = await query;
    if (error) {
      // PGRST205 or PGRST116 means the table hasn't been created yet in the Supabase project
      if (error.code === 'PGRST205' || error.message?.includes("Could not find the table 'public.reservations'")) {
        console.info(
          'Supabase project connected, but tables have not been created yet. Please run supabase_schema.sql in your Supabase SQL editor.'
        );
      } else {
        console.warn('Notice fetching reservations from Supabase:', error.message);
      }
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      referenceNumber: row.reference_number,
      treatmentId: row.treatment_id || '',
      treatmentTitle: row.treatment_title,
      price: Number(row.price),
      durationMin: row.duration_min,
      date: row.date,
      timeSlot: row.time_slot,
      artistId: row.artist_id || '',
      artistName: row.artist_name,
      clientName: row.client_name,
      clientEmail: row.client_email,
      clientPhone: row.client_phone,
      comfortNotes: row.comfort_notes || '',
      createdAt: row.created_at,
      status: row.status as 'confirmed' | 'completed' | 'cancelled',
    }));
  } catch (err) {
    console.warn('Could not reach Supabase tables, falling back to local state:', err);
    return [];
  }
}

export async function cancelReservationInDb(referenceNumber: string) {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { error } = await supabase
    .from('reservations')
    .update({ status: 'cancelled' })
    .eq('reference_number', referenceNumber);

  if (error) {
    console.error('Error cancelling reservation in Supabase:', error);
    throw error;
  }
  return true;
}

// 2. CONCIERGE INQUIRIES
export async function createConciergeInquiryInDb(inquiry: {
  clientName: string;
  contactInfo: string;
  inquiryType: string;
  message?: string;
  userId?: string | null;
}) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('concierge_inquiries')
    .insert([
      {
        user_id: inquiry.userId || null,
        client_name: inquiry.clientName,
        contact_info: inquiry.contactInfo,
        inquiry_type: inquiry.inquiryType,
        message: inquiry.message || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting concierge inquiry to Supabase:', error);
    throw error;
  }
  return data;
}

// 3. MEMBERSHIP INQUIRIES
export async function createMembershipInDb(inquiry: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('membership_inquiries')
    .insert([
      {
        client_name: inquiry.clientName,
        client_email: inquiry.clientEmail,
        client_phone: inquiry.clientPhone,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting membership inquiry to Supabase:', error);
    throw error;
  }
  return data;
}

export const createMembershipInquiryInDb = createMembershipInDb;

// 4. NEWSLETTER SUBSCRIBERS
export async function createSubscriberInDb(email: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email: email.trim().toLowerCase() }])
    .select()
    .single();

  if (error && error.code !== '23505') {
    // 23505 is unique violation in Postgres (already subscribed)
    console.error('Error saving subscriber to Supabase:', error);
    throw error;
  }
  return data;
}
