'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  CreditCard, 
  Building2, 
  Stethoscope, 
  Users,
  Pill,
  UserPlus,
  Calendar,
  DollarSign,
  TrendingDown,
  FileText,
  Download,
  ChevronDown,
  Crown,
  Star,
  TrendingUp
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

interface Clinic {
  rank: number;
  nome: string;
  consultas: number;
  rating: number;
  receita: number;
  crescimento: number;
}

const clinics: Clinic[] = [
  {
    rank: 1,
    nome: 'Clínica Bem Estar',
    consultas: 1284,
    rating: 4.9,
    receita: 192600,
    crescimento: 18,
  },
  {
    rank: 2,
    nome: 'Centro Médico São Paulo',
    consultas: 1156,
    rating: 4.8,
    receita: 173400,
    crescimento: 15,
  },
  {
    rank: 3,
    nome: 'Clínica HealthCare',
    consultas: 1089,
    rating: 4.9,
    receita: 163350,
    crescimento: 22,
  },
  {
    rank: 4,
    nome: 'Policlínica Nova Vida',
    consultas: 982,
    rating: 4.7,
    receita: 147300,
    crescimento: 12,
  },
  {
    rank: 5,
    nome: 'Clínica Saúde Total',
    consultas: 876,
    rating: 4.8,
    receita: 131400,
    crescimento: 9,
  },
];

export default function CartoesPage() {
  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants} 
          className="relative bg-gradient-to-br from-[#2B59FF]/5 to-white rounded-2xl p-6 border border-[#2B59FF]/10 overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B59FF]/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2B59FF]/3 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-3 bg-[#2B59FF]/10 rounded-xl">
              <CreditCard className="w-6 h-6 text-[#2B59FF]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Gerenciamento de Cartões de Benefícios
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Emissão, ativação e gestão de cartões
              </p>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards - First Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          <MetricCard
            title="Total de Clínicas"
            value="1.284"
            icon={Building2}
            iconColor="#2B59FF"
            change="+12.5%"
            changeType="positive"
          />
          <MetricCard
            title="Total de Médicos"
            value="3.847"
            icon={Stethoscope}
            iconColor="#10B981"
            change="+8.3%"
            changeType="positive"
          />
          <MetricCard
            title="Total de Pacientes"
            value="28.562"
            icon={Users}
            iconColor="#8B5CF6"
            change="+15.7%"
            changeType="positive"
          />
          <MetricCard
            title="Farmácias Parceiras"
            value="842"
            icon={Pill}
            iconColor="#EC4899"
            change="+6.2%"
            changeType="positive"
          />
        </motion.div>

        {/* Metric Cards - Second Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          <MetricCard
            title="Consultores Ativos"
            value="456"
            icon={UserPlus}
            iconColor="#F59E0B"
            change="+18.9%"
            changeType="positive"
          />
          <MetricCard
            title="Consultas no Mês"
            value="15.842"
            icon={Calendar}
            iconColor="#8B5CF6"
            change="+22.4%"
            changeType="positive"
          />
          <MetricCard
            title="Faturamento Mensal"
            value="R$ 2.456.890"
            icon={DollarSign}
            iconColor="#10B981"
            change="+14.8%"
            changeType="positive"
          />
          <MetricCard
            title="Comissões Pendentes"
            value="R$ 124.350"
            icon={TrendingDown}
            iconColor="#EF4444"
            change="-5.3%"
            changeType="negative"
          />
        </motion.div>

        {/* Filters and Export Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative group">
                <select className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[140px]">
                  <option>Último Mês</option>
                  <option>Últimos 3 Meses</option>
                  <option>Últimos 6 Meses</option>
                  <option>Último Ano</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
              </div>

              <div className="relative group">
                <select className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[160px]">
                  <option>Todos os Parceiros</option>
                  <option>Clínicas</option>
                  <option>Farmácias</option>
                  <option>Laboratórios</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
              </div>

              <div className="relative group">
                <select className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[160px]">
                  <option>Todas as Regiões</option>
                  <option>Sul</option>
                  <option>Sudeste</option>
                  <option>Norte</option>
                  <option>Nordeste</option>
                  <option>Centro-Oeste</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#2B59FF]/30 text-[#2B59FF] rounded-xl font-bold hover:bg-[#2B59FF]/5 hover:border-[#2B59FF]/50 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                <FileText className="w-4 h-4" />
                Relatório PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#2B59FF]/30 text-[#2B59FF] rounded-xl font-bold hover:bg-[#2B59FF]/5 hover:border-[#2B59FF]/50 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* New Registrations by Type */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-[#2B59FF]" />
              <h2 className="text-xl font-bold text-slate-900">Novos Cadastros por Tipo</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Clínicas', value: 142, percentage: 25.1, color: 'bg-blue-500' },
                { label: 'Médicos', value: 298, percentage: 52.7, color: 'bg-emerald-500' },
                { label: 'Farmácias', value: 48, percentage: 8.5, color: 'bg-pink-500' },
                { label: 'Consultores', value: 78, percentage: 13.8, color: 'bg-orange-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-500">{item.percentage}%</span>
                      <span className="text-sm font-bold text-slate-900">{item.value}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${item.color} h-full rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#2B59FF]" />
              <h2 className="text-xl font-bold text-slate-900">Taxa de Conversão de Indicações</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Consultores', converted: 342, total: 456, percentage: 75, color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
                { label: 'Indicações Orgânicas', converted: 198, total: 289, percentage: 68, color: 'bg-orange-500', bgColor: 'bg-yellow-50' },
                { label: 'Campanhas Marketing', converted: 312, total: 567, percentage: 55, color: 'bg-red-500', bgColor: 'bg-red-50' },
                { label: 'Parcerias Diretas', converted: 187, total: 234, percentage: 80, color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-700">{item.converted}/{item.total}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.bgColor} text-slate-700`}>
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${item.color} h-full rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ranking Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
        >
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">Ranking - Clínicas Mais Ativas</h2>
          </div>
          <div className="space-y-3">
            {clinics.map((clinic, index) => (
              <motion.div
                key={clinic.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#2B59FF]/30 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                    clinic.rank === 1 ? 'bg-gradient-to-br from-[#2B59FF] to-[#1a44cc] text-white' :
                    clinic.rank === 2 ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' :
                    clinic.rank === 3 ? 'bg-gradient-to-br from-slate-500 to-slate-600 text-white' :
                    'bg-gradient-to-br from-slate-400 to-slate-500 text-white'
                  } group-hover:scale-110 transition-transform`}>
                    #{clinic.rank}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{clinic.nome}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-slate-500">{clinic.consultas.toLocaleString('pt-BR')} consultas</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-slate-700">{clinic.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">R$ {clinic.receita.toLocaleString('pt-BR')}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-600">+{clinic.crescimento}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cards Preview Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { color: 'bg-emerald-500', label: 'Cartões Ativos' },
            { color: 'bg-emerald-500', label: 'Cartões Emitidos' },
            { color: 'bg-pink-500', label: 'Cartões Pendentes' },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className={`h-1 ${card.color} rounded-t-xl -mx-4 -mt-4 mb-4`} />
              <p className="text-sm font-bold text-slate-700">{card.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}

