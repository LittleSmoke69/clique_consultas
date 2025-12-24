'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { ActivityCard } from '@/components/admin/ActivityCard';
import { PerformanceCard } from '@/components/admin/PerformanceCard';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Activity,
  Building2,
  Heart,
  User,
  ShoppingCart,
  Building,
  FlaskConical,
  Pill,
  Star
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Cards de Métricas Principais */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          <MetricCard
            title="Consultas Realizadas"
            value="1.247"
            icon={Calendar}
            iconColor="#2B59FF"
            change="+12.5%"
            changeType="positive"
          />
          <MetricCard
            title="Receita Mensal"
            value="R$ 156.840"
            icon={DollarSign}
            iconColor="#10B981"
            change="+8.2%"
            changeType="positive"
          />
          <MetricCard
            title="Assinaturas Ativas"
            value="3.892"
            icon={Users}
            iconColor="#8B5CF6"
            change="+15.3%"
            changeType="positive"
          />
          <MetricCard
            title="Ticket Médio"
            value="R$ 185,00"
            icon={TrendingUp}
            iconColor="#F59E0B"
            change="+5.8%"
            changeType="positive"
          />
        </motion.div>

        {/* Seção de Atividades Recentes */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#2B59FF] to-[#1a44cc] rounded-2xl p-6 shadow-xl shadow-[#2B59FF]/20 relative overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Atividades Recentes</h2>
          </div>
          <p className="text-sm text-white/90 relative z-10">Últimas movimentações do sistema</p>
        </motion.div>

        {/* Cards de Atividades */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
        >
          <ActivityCard
            title="Planos"
            icon={Package}
            iconColor="#8B5CF6"
            activities={[
              {
                type: 'Nova assinatura',
                description: 'Carlos Oliveira - Premium',
                time: 'Há 5 min',
              },
              {
                type: 'Atualização de plano',
                description: 'Maria Santos: Básico -> Premium',
                time: 'Há 12h',
              },
              {
                type: 'Cancelamento',
                description: 'Pedro Silva',
                time: 'Há 3h',
              },
              {
                type: 'Reativação',
                description: 'Ana Costa - Familiar',
                time: 'Há 4h',
              },
            ]}
          />
          <ActivityCard
            title="Consultas"
            icon={Calendar}
            iconColor="#2B59FF"
            activities={[
              {
                type: 'Consulta agendada',
                description: 'Dr. João Silva - Cardiologia',
                time: 'Há 12 min',
              },
              {
                type: 'Consulta concluída',
                description: 'Dra. Ana Lima - Dermatologia',
                time: 'Há 45 min',
              },
              {
                type: 'Consulta cancelada',
                description: 'Dr. Roberto Costa - Pediatria',
                time: 'Há 2h',
              },
              {
                type: 'Reagendamento',
                description: 'Dra. Fernanda - Ginecologia',
                time: 'Há 3h',
              },
            ]}
          />
        </motion.div>

        {/* Seção Pagamentos e Cadastros */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
        >
          <ActivityCard
            title="Pagamentos"
            icon={DollarSign}
            iconColor="#10B981"
            activities={[
              {
                type: 'Pagamento confirmado',
                description: 'R$ 250,00 - Pix',
                time: 'Há 15 min',
              },
              {
                type: 'Pendência financeira',
                description: 'R$ 180,00 - Boleto',
                time: 'Há 1h',
              },
              {
                type: 'Falha de transação',
                description: 'R$ 320,00 - Cartão',
                time: 'Há 3h',
              },
              {
                type: 'Estorno realizado',
                description: 'R$ 150,00 - Devolução',
                time: 'Há 5h',
              },
            ]}
          />
          <ActivityCard
            title="Cadastros"
            icon={Building}
            iconColor="#F59E0B"
            activities={[
              {
                type: 'Nova clínica',
                description: 'Clínica Bem Estar',
                time: 'Há 1h',
              },
              {
                type: 'Novo médico',
                description: 'Dr. Fernando Alves - Ortopedia',
                time: 'Há 2h',
              },
              {
                type: 'Nova farmácia',
                description: 'Farmácia Popular',
                time: 'Há 4h',
              },
              {
                type: 'Novo laboratório',
                description: 'Laboratório Exame+',
                time: 'Há 5h',
              },
            ]}
          />
        </motion.div>

        {/* Seção de Desempenho */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#2B59FF] to-[#1a44cc] rounded-2xl p-6 shadow-xl shadow-[#2B59FF]/20 relative overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Desempenho</h2>
          </div>
          <p className="text-sm text-white/90 relative z-10">Métricas por categoria de parceiro</p>
        </motion.div>

        {/* Cards de Desempenho */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
        >
          {/* Clínicas */}
          <PerformanceCard
            title="Clínicas"
            icon={Building2}
            iconColor="#2B59FF"
            metrics={[
              {
                label: 'Total de consultas',
                value: '1.247',
                change: '+12%',
              },
              {
                label: 'Receita gerada',
                value: 'R$ 145.600',
              },
              {
                label: 'Avaliação média',
                value: '4.8',
                icon: Star,
              },
            ]}
            progressLabel="Taxa de retorno"
            progressValue={78}
          />

          {/* Laboratórios */}
          <PerformanceCard
            title="Laboratórios"
            icon={FlaskConical}
            iconColor="#8B5CF6"
            metrics={[
              {
                label: 'Exames realizados',
                value: '856',
                change: '+8%',
              },
              {
                label: 'Receita por período',
                value: 'R$ 98.750',
              },
              {
                label: 'Tempo médio',
                value: '2.5 dias',
              },
            ]}
            progressLabel="Índice de satisfação"
            progressValue={92}
          />

          {/* Médicos */}
          <PerformanceCard
            title="Médicos"
            icon={User}
            iconColor="#10B981"
            metrics={[
              {
                label: 'Consultas atendidas',
                value: '2.145',
                change: '+18%',
              },
              {
                label: 'Cancelamentos',
                value: '3.2%',
              },
              {
                label: 'Avaliação',
                value: '4.9',
                icon: Star,
              },
              {
                label: 'Tempo médio',
                value: '35min',
              },
            ]}
            progressLabel="Taxa de satisfação"
            progressValue={95}
          />

          {/* Farmácias */}
          <PerformanceCard
            title="Farmácias"
            icon={Pill}
            iconColor="#EC4899"
            metrics={[
              {
                label: 'Total de vendas',
                value: '3.467',
                change: '+24%',
              },
              {
                label: 'Cupons usados',
                value: '1.892',
              },
              {
                label: 'Faturamento',
                value: 'R$ 67.3k',
              },
              {
                label: 'Produto mais vendido',
                value: 'Dipirona',
              },
            ]}
          />
        </motion.div>

        {/* Clínicas com Melhor Desempenho */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#2B59FF]/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-[#2B59FF]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Clínicas com Melhor Desempenho</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Clínica Saúde Total', consultations: '156 consultas', revenue: 'R$ 45.200' },
              { name: 'Centro Médico Bem Viver', consultations: '142 consultas', revenue: 'R$ 38.900' },
              { name: 'Clínica Vita', consultations: '128 consultas', revenue: 'R$ 32.400' },
              { name: 'Hospital Santa Cruz', consultations: '115 consultas', revenue: 'R$ 28.750' },
            ].map((clinic, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:border-[#2B59FF]/30 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    index === 0 ? 'from-[#2B59FF] to-[#1a44cc]' :
                    index === 1 ? 'from-blue-500 to-blue-600' :
                    index === 2 ? 'from-slate-500 to-slate-600' :
                    'from-slate-400 to-slate-500'
                  } text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{clinic.name}</p>
                    <p className="text-sm text-slate-500">{clinic.consultations}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-[#2B59FF] group-hover:scale-105 transition-transform">{clinic.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}

