-- ==========================================================
-- Schema de Agendamentos
-- ==========================================================

-- Tabela principal de agendamentos
create table if not exists public.clique_appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.clique_profiles(id) on delete set null,
  patient_name text not null,
  patient_email text not null,
  patient_phone text,
  patient_cpf text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_method text check (payment_method in ('pix', 'credit_card', 'debit_card', 'clique_plus')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  total_amount numeric not null default 0,
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- Tabela de itens do agendamento (consultas)
create table if not exists public.clique_appointment_items (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.clique_appointments(id) on delete cascade,
  professional_id uuid not null references public.clique_professionals(id) on delete restrict,
  clinic_id uuid references public.clique_clinics(id) on delete set null,
  appointment_date date not null,
  appointment_time time not null,
  appointment_type text not null default 'presencial' check (appointment_type in ('presencial', 'online')),
  price numeric not null,
  specialty_id uuid references public.clique_specialties(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Índices
create index if not exists idx_clique_appointments_user_id on public.clique_appointments (user_id);
create index if not exists idx_clique_appointments_status on public.clique_appointments (status);
create index if not exists idx_clique_appointments_created_at on public.clique_appointments (created_at desc);
create index if not exists idx_clique_appointment_items_appointment_id on public.clique_appointment_items (appointment_id);
create index if not exists idx_clique_appointment_items_professional_id on public.clique_appointment_items (professional_id);
create index if not exists idx_clique_appointment_items_date on public.clique_appointment_items (appointment_date, appointment_time);

-- Trigger para updated_at
drop trigger if exists trg_clique_appointments_updated_at on public.clique_appointments;
create trigger trg_clique_appointments_updated_at
before update on public.clique_appointments
for each row execute procedure public.set_updated_at();

-- RLS
alter table public.clique_appointments enable row level security;
alter table public.clique_appointment_items enable row level security;

-- Políticas: usuários veem seus próprios agendamentos, admin vê todos
drop policy if exists clique_appointments_select_own on public.clique_appointments;
create policy clique_appointments_select_own on public.clique_appointments
for select using (auth.uid() = user_id or public.is_admin() or user_id is null);

drop policy if exists clique_appointments_insert_own on public.clique_appointments;
create policy clique_appointments_insert_own on public.clique_appointments
for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists clique_appointments_update_admin on public.clique_appointments;
create policy clique_appointments_update_admin on public.clique_appointments
for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists clique_appointment_items_select_own on public.clique_appointment_items;
create policy clique_appointment_items_select_own on public.clique_appointment_items
for select using (
  exists (
    select 1 from public.clique_appointments a
    where a.id = appointment_id
      and (a.user_id = auth.uid() or public.is_admin() or a.user_id is null)
  )
);

drop policy if exists clique_appointment_items_insert_own on public.clique_appointment_items;
create policy clique_appointment_items_insert_own on public.clique_appointment_items
for insert with check (
  exists (
    select 1 from public.clique_appointments a
    where a.id = appointment_id
      and (a.user_id = auth.uid() or a.user_id is null)
  )
);

-- Função para calcular total do agendamento
create or replace function public.update_appointment_total()
returns trigger
language plpgsql
security definer -- Adicionado para permitir atualização mesmo com RLS restrito
as $$
declare
  total numeric;
begin
  select coalesce(sum(price), 0) into total
  from public.clique_appointment_items
  where appointment_id = coalesce(new.appointment_id, old.appointment_id);
  
  update public.clique_appointments
  set total_amount = total,
      updated_at = timezone('utc'::text, now())
  where id = coalesce(new.appointment_id, old.appointment_id);
  
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_update_appointment_total on public.clique_appointment_items;
create trigger trg_update_appointment_total
after insert or update or delete on public.clique_appointment_items
for each row execute procedure public.update_appointment_total();

