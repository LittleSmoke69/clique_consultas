'use client';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/features/Hero';
import { Categories } from '@/components/features/Categories';
import { TopRatedSection } from '@/components/features/TopRatedSection';
import { NearbySection } from '@/components/features/NearbySection';
import { PricingSection } from '@/components/features/PricingSection';
import { ShieldCheck, Zap, Star, Smartphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <Hero />
      
      <Categories />

      <TopRatedSection />

      <NearbySection />

      {/* Benefits Section with decorative background */}
      <section className="py-16 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#2B59FF]/5 -z-10 rounded-l-[100px]" />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                Por que escolher a <br />
                <span className="text-[#2B59FF]">Clique Consultas</span>?
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:bg-[#2B59FF] transition-colors">
                    <Zap className="text-[#2B59FF] group-hover:text-white w-6 h-6 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Agendamento em tempo real</h4>
                    <p className="text-slate-600">Esqueça as ligações demoradas. Marque sua consulta em menos de 1 minuto diretamente pelo site.</p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:bg-[#2B59FF] transition-colors">
                    <ShieldCheck className="text-[#2B59FF] group-hover:text-white w-6 h-6 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Profissionais verificados</h4>
                    <p className="text-slate-600">Todos os nossos profissionais passam por um rigoroso processo de verificação de CRM e RQE.</p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:bg-[#2B59FF] transition-colors">
                    <Star className="text-[#2B59FF] group-hover:text-white w-6 h-6 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Avaliações reais de pacientes</h4>
                    <p className="text-slate-600">Leia a opinião de quem já se consultou e escolha com total confiança e transparência.</p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:bg-[#2B59FF] transition-colors">
                    <Smartphone className="text-[#2B59FF] group-hover:text-white w-6 h-6 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Experiência mobile-first</h4>
                    <p className="text-slate-600">Acesse de qualquer lugar. Nossa plataforma é otimizada para oferecer o melhor uso no seu celular.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#2B59FF]/10 rounded-3xl -rotate-3 translate-x-4 translate-y-4 -z-10" />
              <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden aspect-video lg:aspect-square flex items-center justify-center">
                {/* Illustration placeholder */}
                <div className="relative w-full h-full bg-[#F8FAFC] rounded-2xl flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#2B59FF]/20 to-transparent opacity-50" />
                   <ShieldCheck className="w-32 h-32 text-[#2B59FF] opacity-20" />
                   <p className="absolute bottom-8 text-slate-400 font-bold uppercase tracking-widest text-xs">Health Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PricingSection />

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#2B59FF] rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-[#2B59FF]/20">
            {/* Background elements from the blue image theme */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2B59FF]/20 rounded-full -ml-32 -mb-32 blur-2xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Pronto para cuidar da sua saúde hoje?
              </h2>
              <p className="text-[#2B59FF]/80 text-lg lg:text-xl mb-10">
                Junte-se a milhares de pessoas que já simplificaram sua jornada de saúde com a Clique Consultas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/clinicas" 
                  className="bg-white text-[#2B59FF] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg shadow-[#2B59FF]/20 flex items-center gap-2 group w-full sm:w-auto justify-center"
                >
                  Encontre sua consulta agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/cartao" 
                  className="bg-white/10 text-white border border-white/20 backdrop-blur-sm px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors w-full sm:w-auto text-center"
                >
                  Conhecer Cartão Clique+
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100 pb-12 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2B59FF] rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Clique<span className="text-[#2B59FF]">Consultas</span>
              </span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-8">
               <Link href="/clinicas" className="text-sm font-bold text-slate-500 hover:text-[#2B59FF] transition-colors">Clínicas</Link>
               <Link href="/telemedicina" className="text-sm font-bold text-slate-500 hover:text-[#2B59FF] transition-colors">Telemedicina</Link>
               <Link href="/exames" className="text-sm font-bold text-slate-500 hover:text-[#2B59FF] transition-colors">Exames</Link>
               <Link href="/register?type=parceiro" className="text-sm font-bold text-slate-500 hover:text-[#2B59FF] transition-colors">Seja um parceiro</Link>
            </nav>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm font-medium text-center md:text-left">
              © 2025 Clique Consultas. Todos os direitos reservados. Saúde e tecnologia para você.
            </p>
            <div className="flex items-center gap-6">
               <Link href="#" className="text-slate-400 hover:text-[#2B59FF] text-xs font-bold uppercase tracking-widest transition-colors">Privacidade</Link>
               <Link href="#" className="text-slate-400 hover:text-[#2B59FF] text-xs font-bold uppercase tracking-widest transition-colors">Termos</Link>
            </div>
          </div>
        </div>
      </footer>
      </main>
  );
}
