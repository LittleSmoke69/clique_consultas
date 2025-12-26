'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  BarChart3,
  User,
  Activity
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

const billingByProfessional = [
  { name: 'Dr. João Santos', appointments: 48, revenue: 15200, percentage: 85 },
  { name: 'Dra. Ana Costa', appointments: 42, revenue: 12800, percentage: 70 },
  { name: 'Dr. Paulo Mendes', appointments: 35, revenue: 10500, percentage: 60 },
  { name: 'Dra. Fernanda Silva', appointments: 38, revenue: 10000, percentage: 100 },
];

export default function AdminDashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Consultas Hoje"
            value="12"
            icon={Calendar}
            iconColor="#2B59FF"
            change="+2"
          />
          <MetricCard
            title="Receita Prevista"
            value="R$ 4.250"
            icon={DollarSign}
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
            icon={TrendingUp}
            iconColor="#F59E0B"
            change="★"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Faturamento por Profissional */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-6 h-6 text-[#2B59FF]" />
              <h3 className="text-xl font-bold text-slate-900">Faturamento por Profissional</h3>
            </div>
            <div className="space-y-8">
              {billingByProfessional.map((prof, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold text-slate-900">{prof.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{prof.appointments} consultas</p>
                    </div>
                    <p className="font-bold text-[#10B981]">R$ {prof.revenue.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${prof.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                      className="h-full bg-[#2B59FF] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Evolução Mensal (Placeholder) */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="w-6 h-6 text-[#2B59FF]" />
              <h3 className="text-xl font-bold text-slate-900">Evolução Mensal</h3>
            </div>
            <div className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400">
              <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm font-medium">Gráfico de faturamento em tempo real</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
}
