-- ==========================================================
-- Clique Consultas - Supabase Schema (v3)
-- Requisitos:
-- - TODAS as tabelas com prefixo: clique_
-- - Auth via Supabase (senha em hash + comparação no login)
-- - Perfis com papel (admin/paciente/parceiro)
-- - Catálogo público (clínicas/hospitais/médicos/serviços)
-- - Escrita restrita a admin (RLS)
-- - MIGRAÇÃO: se existirem tabelas antigas sem prefixo, renomeia automaticamente
-- ==========================================================

-- Extensões necessárias
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- Enums
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('admin', 'paciente', 'parceiro');
  end if;

  if not exists (select 1 from pg_type where typname = 'clinic_type') then
    create type public.clinic_type as enum ('clinica', 'hospital');
  end if;

  if not exists (select 1 from pg_type where typname = 'professional_kind') then
    create type public.professional_kind as enum ('medico', 'psicologo', 'nutricionista', 'outro');
  end if;
end $$;

-- Helpers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- ==========================================================
-- Migração de nomes (clique_)
-- ==========================================================
do $$
begin
  if to_regclass('public.specialties') is not null and to_regclass('public.clique_specialties') is null then
    alter table public.specialties rename to clique_specialties;
  end if;
  if to_regclass('public.clinics') is not null and to_regclass('public.clique_clinics') is null then
    alter table public.clinics rename to clique_clinics;
  end if;
  if to_regclass('public.professionals') is not null and to_regclass('public.clique_professionals') is null then
    alter table public.professionals rename to clique_professionals;
  end if;
  if to_regclass('public.professional_specialties') is not null and to_regclass('public.clique_professional_specialties') is null then
    alter table public.professional_specialties rename to clique_professional_specialties;
  end if;
  if to_regclass('public.clinic_professionals') is not null and to_regclass('public.clique_clinic_professionals') is null then
    alter table public.clinic_professionals rename to clique_clinic_professionals;
  end if;
  if to_regclass('public.services') is not null and to_regclass('public.clique_services') is null then
    alter table public.services rename to clique_services;
  end if;
  if to_regclass('public.facility_service_prices') is not null and to_regclass('public.clique_facility_service_prices') is null then
    alter table public.facility_service_prices rename to clique_facility_service_prices;
  end if;
end $$;

-- ==========================================================
-- Perfis / Autorização
-- ==========================================================
create table if not exists public.clique_profiles (
  id uuid primary key references auth.users on delete cascade,
  role public.user_role not null default 'paciente',
  full_name text,
  avatar_url text,
  phone text,
  email text,
  password text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- Migração de colunas (caso tabela já exista sem role)
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
      and table_name = 'clique_profiles' 
      and column_name = 'role'
  ) then
    alter table public.clique_profiles
      add column role public.user_role not null default 'paciente';
  end if;
end $$;

drop trigger if exists trg_clique_profiles_updated_at on public.clique_profiles;
create trigger trg_clique_profiles_updated_at
before update on public.clique_profiles
for each row execute procedure public.set_updated_at();

-- Admin helper (só funciona se a tabela e coluna existirem)
create or replace function public.is_admin()
returns boolean
language plpgsql
stable
as $$
begin
  -- Verifica se a tabela existe
  if not exists (
    select 1 from information_schema.tables 
    where table_schema = 'public' and table_name = 'clique_profiles'
  ) then
    return false;
  end if;

  -- Verifica se a coluna role existe
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
      and table_name = 'clique_profiles' 
      and column_name = 'role'
  ) then
    return false;
  end if;

  -- Verifica se o usuário é admin
  return exists (
    select 1
    from public.clique_profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
end;
$$;

-- Cria profile automaticamente quando um user do auth é criado
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  role_text text;
  role_value public.user_role;
begin
  role_text := coalesce(new.raw_user_meta_data->>'role', '');
  if role_text in ('admin', 'paciente', 'parceiro') then
    role_value := role_text::public.user_role;
  else
    role_value := 'paciente';
  end if;

  insert into public.clique_profiles (id, role, full_name, phone, avatar_url, email)
  values (
    new.id,
    role_value,
    nullif(new.raw_user_meta_data->>'full_name', ''),
    nullif(new.raw_user_meta_data->>'phone', ''),
    nullif(new.raw_user_meta_data->>'avatar_url', ''),
    new.email
  )
  on conflict (id) do update
    set role = excluded.role,
        full_name = excluded.full_name,
        phone = excluded.phone,
        avatar_url = excluded.avatar_url,
        email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ==========================================================
-- Catálogo: especialidades, clínicas/hospitais, profissionais
-- ==========================================================
create table if not exists public.clique_specialties (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  icon_url text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists trg_clique_specialties_updated_at on public.clique_specialties;
create trigger trg_clique_specialties_updated_at
before update on public.clique_specialties
for each row execute procedure public.set_updated_at();

create table if not exists public.clique_clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  address text,
  city text,
  state text,
  zip_code text,
  latitude numeric,
  longitude numeric,
  image_url text,
  rating numeric not null default 0,
  reviews_count integer not null default 0,
  is_partner boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.clique_clinics
  add column if not exists type public.clinic_type not null default 'clinica';
alter table public.clique_clinics
  add column if not exists created_by uuid;

-- Criar constraint de foreign key separadamente (se não existir)
do $$
begin
  -- Verifica se a primary key de clique_profiles existe antes de criar a foreign key
  if exists (
    select 1 from information_schema.table_constraints 
    where constraint_schema = 'public' 
      and table_name = 'clique_profiles' 
      and constraint_type = 'PRIMARY KEY'
  ) then
    if not exists (
      select 1 from information_schema.table_constraints 
      where constraint_schema = 'public' 
        and table_name = 'clique_clinics' 
        and constraint_name = 'clique_clinics_created_by_fkey'
    ) then
      alter table public.clique_clinics
        add constraint clique_clinics_created_by_fkey 
        foreign key (created_by) references public.clique_profiles(id);
    end if;
  end if;
end $$;

drop trigger if exists trg_clique_clinics_updated_at on public.clique_clinics;
create trigger trg_clique_clinics_updated_at
before update on public.clique_clinics
for each row execute procedure public.set_updated_at();

create index if not exists idx_clique_clinics_name_trgm on public.clique_clinics using gin (name gin_trgm_ops);
create index if not exists idx_clique_clinics_city_trgm on public.clique_clinics using gin (city gin_trgm_ops);
create index if not exists idx_clique_clinics_type on public.clique_clinics (type);

create table if not exists public.clique_professionals (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  slug text not null unique,
  bio text,
  crm_rqe text,
  avatar_url text,
  rating numeric not null default 0,
  reviews_count integer not null default 0,
  base_price numeric not null,
  is_online_available boolean not null default true,
  clique_plus_available boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.clique_professionals
  add column if not exists kind public.professional_kind not null default 'medico';
alter table public.clique_professionals
  add column if not exists city text;
alter table public.clique_professionals
  add column if not exists state text;
alter table public.clique_professionals
  add column if not exists created_by uuid;

-- Criar constraint de foreign key separadamente (se não existir)
do $$
begin
  -- Verifica se a primary key de clique_profiles existe antes de criar a foreign key
  if exists (
    select 1 from information_schema.table_constraints 
    where constraint_schema = 'public' 
      and table_name = 'clique_profiles' 
      and constraint_type = 'PRIMARY KEY'
  ) then
    if not exists (
      select 1 from information_schema.table_constraints 
      where constraint_schema = 'public' 
        and table_name = 'clique_professionals' 
        and constraint_name = 'clique_professionals_created_by_fkey'
    ) then
      alter table public.clique_professionals
        add constraint clique_professionals_created_by_fkey 
        foreign key (created_by) references public.clique_profiles(id);
    end if;
  end if;
end $$;

drop trigger if exists trg_clique_professionals_updated_at on public.clique_professionals;
create trigger trg_clique_professionals_updated_at
before update on public.clique_professionals
for each row execute procedure public.set_updated_at();

create index if not exists idx_clique_professionals_name_trgm on public.clique_professionals using gin (full_name gin_trgm_ops);
create index if not exists idx_clique_professionals_city_trgm on public.clique_professionals using gin (city gin_trgm_ops);
create index if not exists idx_clique_professionals_kind on public.clique_professionals (kind);

create table if not exists public.clique_professional_specialties (
  professional_id uuid not null references public.clique_professionals(id) on delete cascade,
  specialty_id uuid not null references public.clique_specialties(id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now()),
  primary key (professional_id, specialty_id)
);

create table if not exists public.clique_clinic_professionals (
  clinic_id uuid not null references public.clique_clinics(id) on delete cascade,
  professional_id uuid not null references public.clique_professionals(id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now()),
  primary key (clinic_id, professional_id)
);

-- ==========================================================
-- Serviços e valores (por clínica/hospital)
-- ==========================================================
create table if not exists public.clique_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists trg_clique_services_updated_at on public.clique_services;
create trigger trg_clique_services_updated_at
before update on public.clique_services
for each row execute procedure public.set_updated_at();

create index if not exists idx_clique_services_name_trgm on public.clique_services using gin (name gin_trgm_ops);

create table if not exists public.clique_facility_service_prices (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clique_clinics(id) on delete cascade,
  service_id uuid not null references public.clique_services(id) on delete cascade,
  price numeric not null,
  currency text not null default 'BRL',
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (clinic_id, service_id)
);

-- Criar constraint de foreign key para created_by (se não existir)
do $$
begin
  -- Verifica se a primary key de clique_profiles existe antes de criar a foreign key
  if exists (
    select 1 from information_schema.table_constraints 
    where constraint_schema = 'public' 
      and table_name = 'clique_profiles' 
      and constraint_type = 'PRIMARY KEY'
  ) then
    if not exists (
      select 1 from information_schema.table_constraints 
      where constraint_schema = 'public' 
        and table_name = 'clique_facility_service_prices' 
        and constraint_name = 'clique_facility_service_prices_created_by_fkey'
    ) then
      alter table public.clique_facility_service_prices
        add constraint clique_facility_service_prices_created_by_fkey 
        foreign key (created_by) references public.clique_profiles(id);
    end if;
  end if;
end $$;

drop trigger if exists trg_clique_facility_service_prices_updated_at on public.clique_facility_service_prices;
create trigger trg_clique_facility_service_prices_updated_at
before update on public.clique_facility_service_prices
for each row execute procedure public.set_updated_at();

create index if not exists idx_clique_facility_service_prices_clinic on public.clique_facility_service_prices (clinic_id);
create index if not exists idx_clique_facility_service_prices_service on public.clique_facility_service_prices (service_id);

-- ==========================================================
-- RLS
-- ==========================================================
alter table public.clique_profiles enable row level security;
alter table public.clique_specialties enable row level security;
alter table public.clique_clinics enable row level security;
alter table public.clique_professionals enable row level security;
alter table public.clique_professional_specialties enable row level security;
alter table public.clique_clinic_professionals enable row level security;
alter table public.clique_services enable row level security;
alter table public.clique_facility_service_prices enable row level security;

-- Profiles: dono ou admin
drop policy if exists clique_profiles_select_own on public.clique_profiles;
create policy clique_profiles_select_own on public.clique_profiles
for select using (auth.uid() = id or public.is_admin());

drop policy if exists clique_profiles_update_own on public.clique_profiles;
create policy clique_profiles_update_own on public.clique_profiles
for update using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

-- Catálogo: leitura pública
drop policy if exists clique_specialties_public_read on public.clique_specialties;
create policy clique_specialties_public_read on public.clique_specialties for select using (true);

drop policy if exists clique_clinics_public_read on public.clique_clinics;
create policy clique_clinics_public_read on public.clique_clinics for select using (true);

drop policy if exists clique_professionals_public_read on public.clique_professionals;
create policy clique_professionals_public_read on public.clique_professionals for select using (true);

drop policy if exists clique_services_public_read on public.clique_services;
create policy clique_services_public_read on public.clique_services for select using (true);

drop policy if exists clique_facility_service_prices_public_read on public.clique_facility_service_prices;
create policy clique_facility_service_prices_public_read on public.clique_facility_service_prices
for select using (active = true);

-- Escrita: somente admin
drop policy if exists clique_specialties_admin_write on public.clique_specialties;
create policy clique_specialties_admin_write on public.clique_specialties
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_clinics_admin_write on public.clique_clinics;
create policy clique_clinics_admin_write on public.clique_clinics
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_professionals_admin_write on public.clique_professionals;
create policy clique_professionals_admin_write on public.clique_professionals
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_professional_specialties_admin_write on public.clique_professional_specialties;
create policy clique_professional_specialties_admin_write on public.clique_professional_specialties
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_clinic_professionals_admin_write on public.clique_clinic_professionals;
create policy clique_clinic_professionals_admin_write on public.clique_clinic_professionals
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_services_admin_write on public.clique_services;
create policy clique_services_admin_write on public.clique_services
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_facility_service_prices_admin_write on public.clique_facility_service_prices;
create policy clique_facility_service_prices_admin_write on public.clique_facility_service_prices
for all using (public.is_admin()) with check (public.is_admin());

