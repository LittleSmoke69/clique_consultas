'use client';

import React from 'react';
import { Calendar, Video, DollarSign, Star, MapPin, SlidersHorizontal, ChevronDown } from 'lucide-react';

export const FilterBar = () => {
  return (
    <div className="bg-white border-b border-slate-100 sticky top-20 z-40 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {/* Quick Filters */}
          <button className="flex items-center gap-2 bg-[#2B59FF]/5 text-[#2B59FF] px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap hover:bg-[#2B59FF]/10 transition-colors">
            <Calendar className="w-4 h-4" /> Hoje
          </button>
          <button className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-slate-100 transition-colors border border-slate-100">
            <Video className="w-4 h-4" /> Online
          </button>
          <button className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-slate-100 transition-colors border border-slate-100">
            <DollarSign className="w-4 h-4" /> Até R$150
          </button>
          <button className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-slate-100 transition-colors border border-slate-100">
            <Star className="w-4 h-4" /> 4.5+
          </button>
          <button className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-slate-100 transition-colors border border-slate-100">
            <MapPin className="w-4 h-4" /> Mais próximos
          </button>
        </div>

        <button className="flex items-center gap-2 text-slate-900 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
          <SlidersHorizontal className="w-4 h-4" /> Filtros Avançados
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

