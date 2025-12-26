'use client';

import React, { useState } from 'react';
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, Calendar, ShieldCheck, Video, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Professional } from '@/types';
import { AppointmentModal } from '@/components/features/AppointmentModal';

interface ProfessionalCardProps {
  professional: Professional;
  showCallButton?: boolean;
}

export const ProfessionalCard = ({ professional, showCallButton = false }: ProfessionalCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const specialty = professional.specialties?.[0] || null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row group transition-all hover:shadow-md"
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-[280px] lg:w-[320px] h-[240px] flex-shrink-0">
        <img 
          src={professional.avatar_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'} 
          alt={professional.full_name} 
          className="w-full h-full object-cover"
        />
        
        {/* Online Status Badge */}
        {professional.is_online_available && (
          <div className="absolute top-4 left-4 bg-[#00D166] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 shadow-sm">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Online
          </div>
        )}

        {/* Heart icon */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-slate-300 hover:text-rose-500 transition-colors z-10">
          <Heart className="w-5 h-5" />
        </button>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="text-xl font-bold text-[#2B59FF] leading-tight">
              {professional.full_name}
            </h3>
            
            <div className="bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-[#2B59FF]">{professional.rating}</span>
              <span className="text-[10px] text-slate-400 font-medium">({professional.reviews_count})</span>
            </div>
          </div>

          <p className="text-[#2B59FF] font-medium text-sm mb-4">
            {professional.bio}
          </p>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{professional.is_online_available ? 'Online' : '1,2 km'}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {professional.clique_plus_available && (
              <div className="inline-flex items-center gap-1 bg-[#2B59FF]/5 text-[#2B59FF] px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-[#2B59FF]/10 uppercase tracking-tight">
                <ShieldCheck className="w-3 h-3" />
                Cartão Clique+
              </div>
            )}
            {professional.is_online_available && (
              <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-emerald-100 uppercase tracking-tight">
                <Video className="w-3 h-3" />
                Teleconsulta
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 mt-4">
          <div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">A partir de</p>
            {professional.base_price > 0 ? (
              <p className="text-2xl font-extrabold text-[#2B59FF]">
                R$ {professional.base_price}
              </p>
            ) : (
              <p className="text-lg font-extrabold text-[#2B59FF]">Sob consulta</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {(showCallButton || professional.is_online_available) && (
              <button className="hidden lg:flex items-center gap-2 border-2 border-[#2B59FF] text-[#2B59FF] px-4 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm">
                <Phone className="w-4 h-4" />
                Ligar
              </button>
            )}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2B59FF] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1a44cc] transition-all shadow-lg shadow-[#2B59FF]/20 text-sm whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              Agendar
            </button>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        professional={professional}
        specialty={specialty}
      />
    </motion.div>
  );
};
