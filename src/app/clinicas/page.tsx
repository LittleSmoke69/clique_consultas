'use client';

import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { ProfessionalCard } from '@/components/ui/ProfessionalCard';
import { Search, MapPin, Calendar, Filter, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useCatalogSearch } from '@/hooks/useCatalogSearch';

function ClinicasContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const city = searchParams.get('city') ?? '';

  const { items, loading, error } = useCatalogSearch({ q, city });

  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <Header />
      
      <div className="pt-24 container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2B59FF]">Clínicas & Hospitais</h1>
          <p className="text-slate-500 text-sm">
            {loading ? 'Carregando…' : `${items.length} resultados encontrados`}
          </p>
          {(q || city) && (
            <p className="text-slate-400 text-xs mt-1">
              Filtro: {q ? `“${q}”` : '—'} {city ? `em ${city}` : ''}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 pb-20">
          {/* Sidebar - Filtros Avançados */}
          <aside className="lg:w-[320px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                <Filter className="w-5 h-5 text-[#2B59FF]" />
                <h2 className="text-lg font-bold text-[#2B59FF]">Filtros</h2>
              </div>
              
              <div className="space-y-8">
                {/* Data da consulta */}
                <div>
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Data da consulta</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Selecionar data" 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2B59FF]"
                    />
                  </div>
                </div>

                {/* Tipo de profissional */}
                <div>
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Tipo de profissional</label>
                  <div className="space-y-2">
                    {[
                      { name: 'Médico', count: 45 },
                      { name: 'Psicólogo', count: 32 },
                      { name: 'Terapeuta', count: 18 },
                      { name: 'Nutricionista', count: 24 },
                      { name: 'Esteticista', count: 15 }
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#2B59FF] focus:ring-[#2B59FF]" />
                          <span className="text-sm text-slate-600 font-medium group-hover:text-[#2B59FF] transition-colors">{item.name}</span>
                        </div>
                        <span className="text-xs text-slate-400">({item.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Especialidade */}
                <div>
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Especialidade</label>
                  <div className="space-y-2">
                    {[
                      { name: 'Psicologia clínica', count: 28 },
                      { name: 'Psiquiatria', count: 12 },
                      { name: 'Dermatologia estética', count: 19 },
                      { name: 'Nutrição esportiva', count: 11 }
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#2B59FF] focus:ring-[#2B59FF]" />
                          <span className="text-sm text-slate-600 font-medium group-hover:text-[#2B59FF] transition-colors">{item.name}</span>
                        </div>
                        <span className="text-xs text-slate-400">({item.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preço da consulta */}
                <div>
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Preço da consulta</label>
                  <p className="text-xs text-slate-500 mb-4">Faixa de preço</p>
                  <div className="relative h-2 bg-slate-100 rounded-full mb-6">
                    <div className="absolute left-0 right-0 h-full bg-[#2B59FF] rounded-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#2B59FF] rounded-full cursor-pointer shadow-md" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#2B59FF] rounded-full cursor-pointer shadow-md" />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Mínimo</span>
                      <div className="mt-1 flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                        <span className="text-slate-400 text-sm">R$</span>
                        <input type="text" className="w-full bg-transparent outline-none text-sm font-bold" defaultValue="0" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Máximo</span>
                      <div className="mt-1 flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                        <span className="text-slate-400 text-sm">R$</span>
                        <input type="text" className="w-full bg-transparent outline-none text-sm font-bold" defaultValue="500" />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm font-bold text-[#2B59FF]">R$ 0 - R$ 500</p>
                </div>

                {/* Disponibilidade */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Disponibilidade</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#2B59FF] focus:ring-[#2B59FF]" />
                      <span className="text-sm text-slate-900 font-bold">Aberto agora</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#2B59FF] focus:ring-[#2B59FF]" />
                      <span className="text-sm text-slate-900 font-bold">Atendimento online</span>
                    </label>
                  </div>
                </div>

                {/* Distância */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Distância</label>
                  <div className="space-y-2">
                    {[
                      { name: '1 km', count: 12 },
                      { name: '5 km', count: 45, selected: true },
                      { name: '10 km', count: 89 },
                      { name: '20+ km', count: 128 }
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.selected ? 'border-[#2B59FF]' : 'border-slate-200'}`}>
                            {item.selected && <div className="w-2 h-2 bg-[#2B59FF] rounded-full" />}
                          </div>
                          <span className={`text-sm font-bold ${item.selected ? 'text-slate-900' : 'text-slate-600'}`}>{item.name}</span>
                        </div>
                        <span className="text-xs text-slate-400">({item.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Avaliação mínima */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-sm font-bold text-[#2B59FF] block mb-3">Avaliação mínima</label>
                  <div className="space-y-2">
                    {[
                      { name: '4.5+ estrelas', star: true },
                      { name: '4.0+ estrelas', selected: true },
                      { name: '3.5+ estrelas' },
                      { name: '3.0+ estrelas' }
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.selected ? 'border-[#2B59FF]' : 'border-slate-200'}`}>
                          {item.selected && <div className="w-2 h-2 bg-[#2B59FF] rounded-full" />}
                        </div>
                        <span className={`text-sm font-bold ${item.selected ? 'text-slate-900' : 'text-slate-600'} flex items-center gap-1`}>
                          {item.name} {item.star && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#2B59FF] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#2B59FF]/20 hover:bg-[#1a44cc] transition-colors mt-6">
                  Aplicar filtros
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl px-4 py-3 text-sm font-bold">
                {error}
              </div>
            )}
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[240px] bg-white rounded-3xl border border-slate-100 animate-pulse" />
                ))}
              </div>
            ) : (
              items.map(prof => (
                <ProfessionalCard key={prof.id} professional={prof} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ClinicasPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#FBFBFB]">
        <Header />
        <div className="pt-24 container mx-auto px-4">
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[240px] bg-white rounded-3xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    }>
      <ClinicasContent />
    </Suspense>
  );
}
