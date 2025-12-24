'use client';

import React from 'react';
import { Building2, Video, Microscope, Pill, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'Clínicas & Hospitais',
    description: 'Encontre atendimento presencial em clínicas e hospitais renomados.',
    icon: Building2,
    color: 'bg-blue-50 text-[#2B59FF]',
    href: '/clinicas'
  },
  {
    title: 'Telemedicina',
    description: 'Consulte-se sem sair de casa com médicos de diversas especialidades.',
    icon: Video,
    color: 'bg-purple-50 text-purple-600',
    href: '/telemedicina'
  },
  {
    title: 'Exames & Laboratórios',
    description: 'Agende seus exames laboratoriais e de imagem com rapidez.',
    icon: Microscope,
    color: 'bg-emerald-50 text-emerald-600',
    href: '/exames'
  },
  {
    title: 'Farmácia',
    description: 'Compre seus medicamentos e receba em casa com descontos.',
    icon: Pill,
    color: 'bg-orange-50 text-orange-600',
    href: '/farmacia'
  }
];

export const Categories = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Tudo o que você precisa para sua saúde</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Escolha a categoria que melhor atende sua necessidade e agende agora mesmo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link 
              key={index}
              href={cat.href}
              className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-[#2B59FF]/30 hover:shadow-xl hover:shadow-blue-50 transition-all"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {cat.description}
              </p>
              <div className="flex items-center gap-2 text-[#2B59FF] font-bold text-sm">
                Explorar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

