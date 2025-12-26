'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyProfile } from '@/lib/auth';
import { 
  Calendar, 
  Users, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';

export default function PartnerDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { profile, error } = await getMyProfile();
      if (error || !profile) {
        router.replace('/login');
        return;
      }
      setProfile(profile);
      setLoading(false);
    }
    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-[#2B59FF]/20 rounded-xl" />
          <div className="h-4 bg-slate-200 rounded w-32" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
        {/* Welcome Message */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Bem-vindo de volta, <span className="text-[#2B59FF]">{profile.full_name?.split(' ')[0]}</span>!
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Aqui está o resumo da sua clínica para hoje.</p>
        </div>

        {/* Metric Cards - Usando o componente padrão */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Agendamentos Hoje"
            value="12"
            icon={Calendar}
            iconColor="#2B59FF"
            change="+2"
          />
          <MetricCard
            title="Receita Prevista"
            value="R$ 4.250"
            icon={TrendingUp}
            iconColor="#10B981"
            change="+12%"
          />
          <MetricCard
            title="Novos Pacientes"
            value="48"
            icon={Users}
            iconColor="#8B5CF6"
            change="+5"
          />
          <MetricCard
            title="Avaliação Média"
            value="4.9"
            icon={Activity}
            iconColor="#F59E0B"
            change="★"
          />
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Próximas Consultas</h3>
                <button className="text-sm font-bold text-[#2B59FF] hover:underline">Ver todas</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-4 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-[#2B59FF]/30 transition-all">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-bold text-[#2B59FF] shadow-sm">
                      0{item + 8}:00
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">Paciente {item}</p>
                      <p className="text-xs text-slate-500 font-medium">Consulta de rotina • Dr. Ricardo Almeida</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-[#2B59FF] hover:text-white hover:border-[#2B59FF] transition-all">
                      Detalhes
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-[#10B981]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h3 className="text-xl font-bold mb-2 relative z-10">Dica do Dia</h3>
              <p className="text-emerald-50 text-sm leading-relaxed relative z-10">
                Mantenha os horários dos seus médicos sempre atualizados para aumentar sua taxa de conversão em 25%.
              </p>
              <button className="mt-6 bg-white text-[#10B981] px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all relative z-10">
                Atualizar Agenda
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Status do Sistema</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-medium text-slate-600">Disponibilidade</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">100% ONLINE</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-medium text-slate-600">Sincronização</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">ATIVO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}
