'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, Check, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const PLANS = [
  {
    name: 'Básico',
    price: '9,90',
    highlight: 'até 15% em consultas',
    features: [
      'Acesso ao cartão digital',
      'Descontos em clínicas parceiras',
      'Sem carência',
      'Cancelamento a qualquer momento'
    ],
    buttonText: 'Assinar agora',
    isActive: false
  },
  {
    name: 'Premium',
    price: '19,90',
    highlight: 'até 40% em consultas e exames',
    features: [
      'Todos os benefícios do Básico',
      'Descontos em exames laboratoriais',
      'Prioridade no suporte',
      'Telemedicina com desconto',
      'Acesso a rede premium'
    ],
    buttonText: 'Gerenciar plano',
    isActive: true
  },
  {
    name: 'Familiar',
    price: '29,90',
    highlight: 'até 30% para até 4 pessoas',
    features: [
      'Todos os benefícios do Premium',
      'Até 4 dependentes',
      'Cartões extras gratuitos',
      'Descontos em farmácias parceiras'
    ],
    buttonText: 'Assinar agora',
    isActive: false
  }
];

export const PricingSection = () => {
  return (
    <section className="py-20 bg-[#2B59FF] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2B59FF] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white mb-6 border border-white/20">
            <CreditCard className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">Cartão Clique+</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Tenha até 50% de desconto em consultas e exames
          </h2>
          <p className="text-[#2B59FF]/20 max-w-2xl mx-auto text-lg">
            Com o Cartão Clique+, você cuida da sua saúde sem carência e sem mensalidades altas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-[2.5rem] p-8 lg:p-10 flex flex-col items-center text-center shadow-2xl ${
                plan.isActive ? 'ring-4 ring-[#00D166] scale-105 z-20' : 'z-10'
              }`}
            >
              {plan.isActive && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D166] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Plano Ativo
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                plan.isActive ? 'bg-[#00D166] text-white' : 'bg-[#2B59FF] text-white'
              }`}>
                <CreditCard className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-sm font-bold text-slate-400">R$</span>
                <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                <span className="text-sm font-bold text-slate-400">/mês</span>
              </div>
              
              <p className="text-[#2B59FF] font-bold text-sm mb-8 leading-relaxed">
                {plan.highlight}
              </p>

              <div className="space-y-4 w-full text-left mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#00D166]" />
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full">
                {plan.isActive && (
                   <div className="flex items-center justify-center gap-2 text-[#00D166] font-bold text-xs mb-4">
                      <Check className="w-4 h-4" />
                      Seu plano está ativo
                   </div>
                )}
                <Link 
                  href="/register"
                  className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                    plan.isActive 
                      ? 'bg-[#2B59FF] text-white hover:bg-[#1a44cc] shadow-lg shadow-[#2B59FF]/20' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

