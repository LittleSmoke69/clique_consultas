'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { ProfessionalCard } from '@/components/ui/ProfessionalCard';
import { Professional } from '@/types';
import { motion } from 'framer-motion';

const TOP_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    full_name: 'Dr. João Silva',
    slug: 'joao-silva',
    bio: 'Psicologia Clínica',
    avatar_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews_count: 152,
    base_price: 120,
    is_online_available: false,
    clique_plus_available: true,
    crm_rqe: 'CRP 12345'
  },
  {
    id: '2',
    full_name: 'Clínica Vida Nova',
    slug: 'clinica-vida-nova',
    bio: 'Clínica Médica Geral',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews_count: 287,
    base_price: 150,
    is_online_available: false,
    clique_plus_available: true,
    crm_rqe: 'CNPJ 00.000.000/0001-00'
  },
  {
    id: '3',
    full_name: 'Dr. Carlos Oliveira',
    slug: 'carlos-oliveira',
    bio: 'Psiquiatria',
    avatar_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews_count: 203,
    base_price: 180,
    is_online_available: true,
    clique_plus_available: true,
    crm_rqe: 'CRM 112233'
  },
  {
    id: '4',
    full_name: 'Dra. Ana Costa',
    slug: 'ana-costa',
    bio: 'Terapia Cognitiva',
    avatar_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews_count: 176,
    base_price: 140,
    is_online_available: true,
    clique_plus_available: true,
    crm_rqe: 'CRP 54321'
  }
];

export const TopRatedSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-[#2B59FF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2B59FF]/20">
            <Star className="text-white fill-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Profissionais Melhor Avaliados</h2>
            <p className="text-slate-500 font-medium">Os favoritos dos nossos pacientes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {TOP_PROFESSIONALS.map((prof, index) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProfessionalCard professional={prof} showCallButton={prof.is_online_available} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

