'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Professional } from '@/types';

export function useProfessionals(filters: {
  specialty?: string;
  city?: string;
  isOnline?: boolean;
  minRating?: number;
  maxPrice?: number;
}) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        setLoading(true);
        let query = supabase.from('clique_professionals').select(`
          id,
          full_name,
          slug,
          kind,
          bio,
          crm_rqe,
          avatar_url,
          city,
          state,
          rating,
          reviews_count,
          base_price,
          is_online_available,
          clique_plus_available,
          professional_specialties:clique_professional_specialties(
            specialties:clique_specialties(
              id,
              name,
              slug
            )
          )
        `);

        // Filtra por especialidade via tabela de junção (professional_specialties)
        if (filters.specialty) {
          const { data: s, error: sErr } = await supabase
            .from('clique_specialties')
            .select('id')
            .eq('slug', filters.specialty)
            .single();
          if (sErr) throw sErr;

          const { data: links, error: linkErr } = await supabase
            .from('clique_professional_specialties')
            .select('professional_id')
            .eq('specialty_id', s.id);
          if (linkErr) throw linkErr;

          const ids = (links ?? []).map((l: any) => l.professional_id).filter(Boolean);
          query = ids.length ? query.in('id', ids) : query.eq('id', '__none__');
        }

        if (filters.isOnline !== undefined) {
          query = query.eq('is_online_available', filters.isOnline);
        }

        if (filters.minRating) {
          query = query.gte('rating', filters.minRating);
        }

        if (filters.maxPrice) {
          query = query.lte('base_price', filters.maxPrice);
        }

        if (filters.city) {
          query = query.ilike('city', `%${filters.city}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        const normalized = (data ?? []).map((p: any) => {
          const specialties = (p.professional_specialties ?? [])
            .map((ps: any) => ps?.specialties)
            .filter(Boolean);
          return { ...p, specialties } as Professional;
        });

        setProfessionals(normalized);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, [filters]);

  return { professionals, loading, error };
}

