'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const Hero = () => {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');

  function handleSearch() {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (city.trim()) params.set('city', city.trim());
    router.push(`/clinicas?${params.toString()}`);
  }

  return (
    <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#F8FAFC]">
      {/* Blue Background Element (Inspired by the image provided) */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full bg-[#2B59FF] -z-10 rounded-bl-[100px] lg:rounded-bl-[200px] hidden lg:block overflow-hidden">
        {/* Decorative circle from the image */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] bg-white/5 rounded-full blur-xl" />
      </div>

      {/* Mobile/Tablet Background */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-[#2B59FF] -z-10 lg:hidden" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl lg:text-7xl font-extrabold text-slate-900 lg:text-slate-900 leading-[1.1] mb-6"
            >
              Sua saúde a um <br />
              <span className="text-[#2B59FF] lg:text-[#2B59FF] relative inline-block">
                clique de distância
                <div className="absolute bottom-2 left-0 w-full h-3 bg-[#2B59FF]/10 -z-10 rounded-full" />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base lg:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Encontre profissionais de saúde perto de você e agende online de forma rápida, segura e sem burocracia.
            </motion.p>

            {/* Trust Indicators for Desktop */}
            <div className="hidden lg:flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                <span className="font-bold text-sm">+10k Médicos</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                <span className="font-bold text-sm">Agendamento 24h</span>
              </div>
            </div>
          </div>

          {/* Right Section (Visual or Floating Elements can go here) */}
          <div className="flex-1 relative hidden lg:block">
            {/* You can add a high quality image here or a decorative component */}
            <div className="relative z-10 w-full aspect-square bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center">
               <div className="text-white font-bold text-2xl text-center px-12">
                  Simplificando o acesso à saúde no Brasil
               </div>
            </div>
            
            {/* Floating small cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-emerald-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Confirmado</p>
                <p className="text-xs font-bold text-slate-900">Consulta Agendada!</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search Bar - Positioned for impact */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 lg:-mt-16 relative z-30 max-w-6xl mx-auto bg-white rounded-3xl lg:rounded-full shadow-[0_20px_50px_rgba(43,89,255,0.15)] p-2 border border-[#2B59FF]/20 focus-within:border-[#2B59FF]/50 transition-colors"
        >
          <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-0">
            {/* Specialty Search */}
            <div className="flex-1 w-full lg:w-auto flex items-center gap-3 px-6 py-4 lg:border-r border-slate-100 group transition-all duration-300 hover:bg-blue-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2B59FF] focus-within:shadow-[0_0_20px_rgba(43,89,255,0.15)] rounded-2xl lg:rounded-l-full relative z-10">
              <Search className="text-[#2B59FF] w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform group-focus-within:scale-110 group-focus-within:text-[#2B59FF]" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-[#2B59FF] transition-colors">O que você busca?</span>
                <input 
                  type="text" 
                  placeholder="Especialidade ou clínica" 
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-200 font-bold text-base focus:placeholder:text-[#2B59FF]/30"
                />
              </div>
            </div>

            {/* Location Search */}
            <div className="flex-1 w-full lg:w-auto flex items-center gap-3 px-6 py-4 lg:border-r border-slate-100 group transition-all duration-300 hover:bg-blue-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2B59FF] focus-within:shadow-[0_0_20px_rgba(43,89,255,0.15)] relative z-10">
              <MapPin className="text-[#2B59FF] w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform group-focus-within:scale-110 group-focus-within:text-[#2B59FF]" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-[#2B59FF] transition-colors">Onde?</span>
                <input 
                  type="text" 
                  placeholder="Cidade ou bairro" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-200 font-bold text-base focus:placeholder:text-[#2B59FF]/30"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="flex-1 w-full lg:w-auto flex items-center gap-3 px-6 py-4 group transition-all duration-300 hover:bg-blue-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2B59FF] focus-within:shadow-[0_0_20px_rgba(43,89,255,0.15)] rounded-2xl lg:rounded-r-none relative z-10">
              <Calendar className="text-[#2B59FF] w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform group-focus-within:scale-110 group-focus-within:text-[#2B59FF]" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-[#2B59FF] transition-colors">Quando?</span>
                <input 
                  type="text" 
                  placeholder="Selecione a data" 
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-200 font-bold text-base focus:placeholder:text-[#2B59FF]/30"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full lg:w-auto p-1">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full lg:w-auto bg-[#2B59FF] hover:bg-[#1a44cc] text-white px-12 py-5 rounded-2xl lg:rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#2B59FF]/20 text-lg"
              >
                Buscar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
