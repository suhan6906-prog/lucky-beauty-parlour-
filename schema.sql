-- ==============================================================================
-- LUCKY BEAUTY PARLOUR ("LBP BY RIZ")
-- SUPABASE POSTGRESQL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
--
-- Instructions:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/uowpmsgfpdbgpsqjxmoe
-- 2. In the left navigation, click "SQL Editor" -> "New Query"
-- 3. Paste this entire file into the editor and click "Run" (or Ctrl + Enter)
-- 4. All tables, sample treatments, staff profiles, and security policies will be created!
-- ==============================================================================

-- Enable UUID extension for auto-generating unique IDs
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES TABLE (Linked with Supabase auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 2. TREATMENTS TABLE (Sanctuary Rituals & Services Catalog)
-- ==============================================================================
create table if not exists public.treatments (
  id text primary key,
  title text not null,
  kicker text not null,
  category text not null, -- 'facial', 'hair', 'body', 'bridal'
  duration_min integer not null default 60,
  duration_label text not null,
  price numeric not null,
  description text not null,
  badge text,
  feature_tag text not null,
  feature_icon text not null default 'Sparkles',
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. AESTHETICIANS TABLE (Atelier Artists & Practitioners)
-- ==============================================================================
create table if not exists public.aestheticians (
  id text primary key,
  name text not null,
  title text not null,
  experience text not null,
  rating numeric default 4.98,
  ritual_count integer default 100,
  specialty text not null,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 4. RESERVATIONS TABLE (Client Appointments & Sanctuary Passes)
-- ==============================================================================
create table if not exists public.reservations (
  id uuid default gen_random_uuid() primary key,
  reference_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  treatment_id text references public.treatments(id) on delete set null,
  treatment_title text not null,
  price numeric not null,
  duration_min integer not null,
  date text not null,
  time_slot text not null,
  artist_id text,
  artist_name text not null,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  comfort_notes text,
  status text not null default 'confirmed', -- 'confirmed', 'completed', 'cancelled'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 5. CONCIERGE INQUIRIES TABLE
-- ==============================================================================
create table if not exists public.concierge_inquiries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  client_name text not null,
  contact_info text not null,
  inquiry_type text not null,
  message text,
  status text default 'pending', -- 'pending', 'contacted', 'archived'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 6. MEMBERSHIP INQUIRIES TABLE (The Atelier Privé Series)
-- ==============================================================================
create table if not exists public.membership_inquiries (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  status text default 'reviewing',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 7. NEWSLETTER SUBSCRIBERS TABLE
-- ==============================================================================
create table if not exists public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.treatments enable row level security;
alter table public.aestheticians enable row level security;
alter table public.reservations enable row level security;
alter table public.concierge_inquiries enable row level security;
alter table public.membership_inquiries enable row level security;
alter table public.subscribers enable row level security;

-- Profiles: Anyone can view; Users can edit their own
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Treatments & Aestheticians: Viewable by everyone
drop policy if exists "Treatments are viewable by all." on public.treatments;
create policy "Treatments are viewable by all." on public.treatments
  for select using (true);

drop policy if exists "Aestheticians are viewable by all." on public.aestheticians;
create policy "Aestheticians are viewable by all." on public.aestheticians
  for select using (true);

-- Reservations: Guests and patrons can create and view bookings
drop policy if exists "Anyone can book a reservation." on public.reservations;
create policy "Anyone can book a reservation." on public.reservations
  for insert with check (true);

drop policy if exists "Users can view reservations." on public.reservations;
create policy "Users can view reservations." on public.reservations
  for select using (
    auth.uid() = user_id or
    auth.role() = 'anon' or
    auth.jwt() ->> 'email' = client_email
  );

drop policy if exists "Users can update or cancel reservations." on public.reservations;
create policy "Users can update or cancel reservations." on public.reservations
  for update using (
    auth.uid() = user_id or
    auth.jwt() ->> 'email' = client_email
  );

drop policy if exists "Users can delete reservations." on public.reservations;
create policy "Users can delete reservations." on public.reservations
  for delete using (
    auth.uid() = user_id or
    auth.jwt() ->> 'email' = client_email
  );

-- Concierge Inquiries, Memberships & Subscribers: Anyone can submit
drop policy if exists "Anyone can submit concierge inquiry." on public.concierge_inquiries;
create policy "Anyone can submit concierge inquiry." on public.concierge_inquiries
  for insert with check (true);

drop policy if exists "Anyone can apply for membership." on public.membership_inquiries;
create policy "Anyone can apply for membership." on public.membership_inquiries
  for insert with check (true);

drop policy if exists "Anyone can subscribe to newsletter." on public.subscribers;
create policy "Anyone can subscribe to newsletter." on public.subscribers
  for insert with check (true);

-- ==============================================================================
-- 9. AUTOMATIC USER PROFILE TRIGGER (On Supabase Sign Up)
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================================
-- 10. SEED INITIAL TREATMENTS CATALOG
-- ==============================================================================
insert into public.treatments (id, title, kicker, category, duration_min, duration_label, price, description, badge, feature_tag, feature_icon)
values
  (
    'lumiere-hydrating-facial',
    'The Lumière Hydrating Facial',
    'APOTHECARY SIGNATURE',
    'facial',
    75,
    '75 MIN',
    165,
    'Deep lymphatic drainage combined with an organic hyaluronic infusion, followed by cold-stone sculpted rose quartz for a natural dewy lift.',
    'AURA ATELIER SIGNATURE',
    'Instant Glow & Plump',
    'Droplet'
  ),
  (
    'rose-quartz-gua-sha',
    'Rose Quartz Gua Sha Contouring',
    'HOLISTIC SCULPTING',
    'facial',
    60,
    '60 MIN',
    145,
    'Ancient acupressure meridian release using carved Madagascan rose quartz to tone facial contours, drain stagnant fluid, and stimulate microcirculation.',
    'MOST POPULAR',
    'Jawline & Cheekbone Sculpt',
    'Sparkles'
  ),
  (
    'caviar-cellular-restoration',
    'Caviar & Marine Cellular Infusion',
    'INTENSIVE RENEWAL',
    'facial',
    90,
    '90 MIN',
    220,
    'Biomimetic marine peptides and French caviar extract pressed into skin under cold LED therapy for collagen reactivation and cellular repair.',
    'PRESTIGE RITUAL',
    'Deep Cellular Repair',
    'ShieldCheck'
  ),
  (
    'botanical-scalp-alchemy',
    'Botanical Scalp & Crown Therapy',
    'HAIR SANCTUARY',
    'hair',
    50,
    '50 MIN',
    115,
    'Warm camellia oil head massage, botanical clarifying scalp mask, high-frequency stimulation, and silk protein conditioning mist.',
    'HAIR SANCTUARY',
    'Tension Relief & Hair Vitality',
    'Wind'
  )
on conflict (id) do nothing;

-- ==============================================================================
-- 11. SEED INITIAL AESTHETICIANS
-- ==============================================================================
insert into public.aestheticians (id, name, title, experience, rating, ritual_count, specialty)
values
  (
    'elena-vance',
    'Elena Vance',
    'Master Aesthetician & Atelier Founder',
    '9 yrs exp. at Lucky Atelier (14 yrs clinical)',
    4.98,
    142,
    'Lymphatic Drainage, Rose Quartz Sculpting, Micro-Infusion'
  ),
  (
    'camille-laurent',
    'Camille Laurent',
    'Senior Holistic Facialist & Scalp Specialist',
    '7 yrs exp. in Parisian Botanical Therapy',
    4.96,
    118,
    'Japanese Acupressure, Scalp Alchemy, Botanical Peels'
  ),
  (
    'any-artist',
    'Any Available Artist',
    'Master Certified Aesthetician',
    'Immediate availability guaranteed',
    4.97,
    380,
    'Atelier standard protocol & custom botanical preparation'
  )
on conflict (id) do nothing;
