export type Profile = {
  id: string;
  role?: 'admin' | 'paciente' | 'parceiro';
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at?: string;
};

export type Specialty = {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
};

export type Clinic = {
  id: string;
  type?: 'clinica' | 'hospital';
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  rating: number;
  reviews_count: number;
  is_partner: boolean;
};

export type Professional = {
  id: string;
  full_name: string;
  slug: string;
  kind?: 'medico' | 'psicologo' | 'nutricionista' | 'outro';
  bio: string | null;
  crm_rqe: string | null;
  avatar_url: string | null;
  city?: string | null;
  state?: string | null;
  rating: number;
  reviews_count: number;
  base_price: number;
  is_online_available: boolean;
  clique_plus_available: boolean;
  specialties?: Specialty[];
};

export type AvailabilitySlot = {
  id: string;
  professional_id: string;
  clinic_id: string | null;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  type: 'presencial' | 'online';
  price: number | null;
};

