'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Clinic, Professional } from '@/types';

export type CatalogItem = (Professional & { _entity: 'professional' }) | (Professional & { _entity: 'clinic' });

function clinicToCardModel(clinic: Clinic): Professional & { _entity: 'clinic' } {
  return {
    _entity: 'clinic',
    id: clinic.id,
    full_name: clinic.name,
    slug: clinic.slug,
    bio: clinic.description ?? clinic.address ?? null,
    crm_rqe: clinic.city ? `${clinic.city}${clinic.state ? ` - ${clinic.state}` : ''}` : null,
    avatar_url: clinic.image_url ?? null,
    rating: clinic.rating ?? 0,
    reviews_count: clinic.reviews_count ?? 0,
    base_price: 0,
    is_online_available: false,
    clique_plus_available: clinic.is_partner ?? false,
  };
}

export function useCatalogSearch(filters: { q?: string; city?: string }) {
  const q = useMemo(() => (filters.q ?? '').trim(), [filters.q]);
  const city = useMemo(() => (filters.city ?? '').trim(), [filters.city]);

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        // Clínicas/Hospitais
          let clinicsQuery = supabase
            .from('clique_clinics')
            .select('id, type, name, slug, description, address, city, state, zip_code, latitude, longitude, image_url, rating, reviews_count, is_partner');

        if (q) clinicsQuery = clinicsQuery.ilike('name', `%${q}%`);
        if (city) clinicsQuery = clinicsQuery.ilike('city', `%${city}%`);

        // Profissionais
          let professionalsQuery = supabase
            .from('clique_professionals')
            .select('id, full_name, slug, bio, crm_rqe, avatar_url, rating, reviews_count, base_price, is_online_available, clique_plus_available');

        if (q) {
          professionalsQuery = professionalsQuery.or(`full_name.ilike.%${q}%,bio.ilike.%${q}%`);
        }

        if (city) {
          // Se você preencher city/state na tabela professionals, isso filtra também por localização.
          professionalsQuery = professionalsQuery.ilike('city', `%${city}%`);
        }

        const [clinicsRes, professionalsRes] = await Promise.all([clinicsQuery, professionalsQuery]);
        if (clinicsRes.error) throw clinicsRes.error;
        if (professionalsRes.error) throw professionalsRes.error;

        const clinics = (clinicsRes.data ?? []) as Clinic[];
        const professionals = (professionalsRes.data ?? []) as Professional[];

        const merged: CatalogItem[] = [
          ...clinics.map(clinicToCardModel),
          ...professionals.map((p) => ({ ...p, _entity: 'professional' as const })),
        ].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

        if (!cancelled) setItems(merged);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Falha ao carregar resultados.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [q, city]);

  return { items, loading, error };
}


