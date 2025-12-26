'use client';

import React from 'react';
import { MapPin, Map as MapIcon, ChevronRight } from 'lucide-react';
import { ProfessionalCard } from '@/components/ui/ProfessionalCard';
import { Professional } from '@/types';
import { motion } from 'framer-motion';

const NEARBY_PROFESSIONALS: Professional[] = [
  {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
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
    id: 'b8e9d123-e456-4789-a123-456789abcdef',
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
  }
];

export const NearbySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Clínicas próximas de você</h2>
            <div className="flex items-center gap-1.5 text-[#2B59FF] font-bold text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>São Paulo, SP</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 border-2 border-[#2B59FF] text-[#2B59FF] px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm self-start md:self-auto">
            Ver no mapa
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Interaction Placeholder */}
          <div className="lg:col-span-5 h-[400px] lg:h-full min-h-[400px] bg-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 group cursor-pointer hover:bg-slate-200/50 transition-colors">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Mapa Interativo</h4>
            <p className="text-slate-500 max-w-[200px] mx-auto text-sm">
              Clique para visualizar clínicas no mapa
            </p>
          </div>

          {/* Professionals List */}
          <div className="lg:col-span-7 space-y-6">
            {NEARBY_PROFESSIONALS.map((prof, index) => (
              <motion.div
                key={prof.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProfessionalCard professional={prof} />
              </motion.div>
            ))}
            
            <button className="w-full py-4 text-[#2B59FF] font-bold text-sm flex items-center justify-center gap-2 hover:underline">
              Ver mais profissionais próximos <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

