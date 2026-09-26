-- ==============================================================================
-- LUCKY BEAUTY PARLOUR (BY RIZ) — PRODUCTION SUPABASE DATABASE SCHEMA & RULES
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
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

-- 2. TREATMENTS (Service catalog)
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

-- 3. AESTHETICIANS (Practitioners)
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

-- 4. RESERVATIONS (Client bookings)
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

-- 5. CONCIERGE INQUIRIES
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

-- 6. MEMBERSHIP INQUIRIES (The Atelier Privé Series)
create table if not exists public.membership_inquiries (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  status text default 'reviewing',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. NEWSLETTER SUBSCRIBERS
create table if not exists public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.treatments enable row level security;
alter table public.aestheticians enable row level security;
alter table public.reservations enable row level security;
alter table public.concierge_inquiries enable row level security;
alter table public.membership_inquiries enable row level security;
alter table public.subscribers enable row level security;

-- Profiles: Anyone can view; Users can update their own
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Treatments & Aestheticians: Viewable by anyone
create policy "Treatments are viewable by all." on public.treatments
  for select using (true);

create policy "Aestheticians are viewable by all." on public.aestheticians
  for select using (true);

-- Reservations: Guests can insert; Users can read their own or by client_email
create policy "Anyone can book a reservation." on public.reservations
  for insert with check (true);

create policy "Users can view own reservations or matching email." on public.reservations
  for select using (
    auth.uid() = user_id or
    auth.role() = 'anon' or
    auth.jwt() ->> 'email' = client_email
  );

create policy "Users can cancel or modify own reservations." on public.reservations
  for update using (
    auth.uid() = user_id or
    auth.jwt() ->> 'email' = client_email
  );

create policy "Users can delete own reservations." on public.reservations
  for delete using (
    auth.uid() = user_id or
    auth.jwt() ->> 'email' = client_email
  );

-- Inquiries & Subscriptions
create policy "Anyone can submit concierge inquiry." on public.concierge_inquiries
  for insert with check (true);

create policy "Anyone can apply for membership." on public.membership_inquiries
  for insert with check (true);

create policy "Anyone can subscribe to newsletter." on public.subscribers
  for insert with check (true);

-- Trigger to create profile upon new signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
