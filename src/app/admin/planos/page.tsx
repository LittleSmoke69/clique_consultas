'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  Download,
  Plus,
  MoreVertical,
  CheckCircle2,
  Star,
  Sparkles,
  Crown,
  Check
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

type ViewType = 'cards' | 'table';

interface Plan {
  id: string;
  nome: string;
  preco: number;
  desconto: string;
  assinantes: number;
  receita: number;
  status: 'ativo' | 'inativo';
  beneficios: string[];
  isPopular?: boolean;
  icon: any;
  iconColor: string;
}

const plans: Plan[] = [
  {
    id: 'PLN001',
    nome: 'Básico',
    preco: 9.90,
    desconto: 'Até 15% de desconto em consultas',
    assinantes: 1247,
    receita: 12345.30,
    status: 'ativo',
    beneficios: [
      'Até 15% de desconto em consultas',
      'Acesso ao cartão digital',
      'Descontos em clínicas parceiras',
      'Suporte por email',
      'App mobile incluso',
    ],
    icon: Package,
    iconColor: '#2B59FF',
  },
  {
    id: 'PLN002',
    nome: 'Premium',
    preco: 19.90,
    desconto: 'Até 40% de desconto em consultas e exames',
    assinantes: 1856,
    receita: 36954.40,
    status: 'ativo',
    beneficios: [
      'Até 40% de desconto em consultas e exames',
      'Todos os benefícios do Plano Básico',
      'Descontos em exames laboratoriais',
      'Telemedicina inclusa',
      'Prioridade no atendimento',
      'Descontos em farmácias',
      'Programa de indicação',
    ],
    isPopular: true,
    icon: Star,
    iconColor: '#2B59FF',
  },
  {
    id: 'PLN003',
    nome: 'Familiar',
    preco: 29.90,
    desconto: 'Até 30% de desconto para até 4 pessoas',
    assinantes: 543,
    receita: 16235.70,
    status: 'ativo',
    beneficios: [
      'Até 30% de desconto para até 4 pessoas',
      'Todos os benefícios do Plano Premium',
      'Até 4 dependentes inclusos',
      'Consultas ilimitadas para família',
      'Descontos em exames para toda família',
    ],
    icon: Sparkles,
    iconColor: '#8B5CF6',
  },
];

export default function PlanosPage() {
  const [viewType, setViewType] = useState<ViewType>('cards');

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
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Gestão de Planos
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Criação e personalização de planos e benefícios
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#2B59FF]/30 text-[#2B59FF] rounded-xl font-bold hover:bg-[#2B59FF]/5 hover:border-[#2B59FF]/50 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2B59FF] text-white rounded-xl font-bold hover:bg-[#1a44cc] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#2B59FF]/20 hover:shadow-xl hover:shadow-[#2B59FF]/30">
                <Plus className="w-4 h-4" />
                Novo Plano
              </button>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          <MetricCard
            title="Planos Ativos"
            value="3"
            icon={Package}
            iconColor="#2B59FF"
            change="Sistema estável"
            changeType="positive"
          />
          <MetricCard
            title="Assinantes Totais"
            value="3.646"
            icon={Users}
            iconColor="#10B981"
            change="+15.3%"
            changeType="positive"
          />
          <MetricCard
            title="Receita Mensal"
            value="R$ 65.535,40"
            icon={DollarSign}
            iconColor="#8B5CF6"
            change="+18.7%"
            changeType="positive"
          />
          <MetricCard
            title="Ticket Médio"
            value="R$ 17,98"
            icon={TrendingUp}
            iconColor="#F59E0B"
            change="+2.8%"
            changeType="positive"
          />
        </motion.div>

        {/* View Toggle */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100 inline-flex gap-1">
            <button
              onClick={() => setViewType('cards')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                viewType === 'cards'
                  ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                  : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                viewType === 'table'
                  ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                  : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
              }`}
            >
              Tabela
            </button>
          </div>
        </motion.div>

        {/* Cards View */}
        {viewType === 'cards' && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 transition-all hover:shadow-xl hover:shadow-[#2B59FF]/5 ${
                    plan.isPopular
                      ? 'border-[#2B59FF]'
                      : 'border-slate-100 hover:border-[#2B59FF]/30'
                  }`}
                >
                  {/* Badge Mais Popular */}
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#2B59FF] text-white rounded-full text-xs font-bold shadow-lg shadow-[#2B59FF]/20">
                        <Star className="w-3 h-3 fill-white" />
                        Mais Popular
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${plan.iconColor}15` }}>
                      <Icon className="w-6 h-6" style={{ color: plan.iconColor }} />
                    </div>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#2B59FF] transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title and Price */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.nome}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">R$ {plan.preco.toFixed(2).replace('.', ',')}</span>
                      <span className="text-sm text-slate-500">/mês</span>
                    </div>
                  </div>

                  {/* Main Benefit */}
                  <p className="text-sm text-slate-600 mb-4">{plan.desconto}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Assinantes</p>
                      <p className="text-lg font-bold text-slate-900">{plan.assinantes.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Receita Mensal</p>
                      <p className="text-lg font-bold text-[#2B59FF]">R$ {plan.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Benefícios:</p>
                    <div className="space-y-2">
                      {plan.beneficios.slice(0, 3).map((beneficio, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{beneficio}</span>
                        </div>
                      ))}
                      {plan.beneficios.length > 3 && (
                        <p className="text-sm text-slate-500 font-bold">
                          +{plan.beneficios.length - 3} outros benefícios
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Plano Ativo
                    </span>
                    <button className="px-4 py-2 border border-[#2B59FF] text-[#2B59FF] rounded-xl font-bold text-sm hover:bg-[#2B59FF] hover:text-white transition-all hover:scale-105 active:scale-95">
                      Gerenciar Plano
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Table View */}
        {viewType === 'table' && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6">Visão Detalhada dos Planos</h2>

            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preço</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Desconto</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assinantes</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Receita</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-center py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, index) => (
                    <motion.tr
                      key={plan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{plan.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {plan.isPopular && <Crown className="w-4 h-4 text-amber-500" />}
                          <span className="text-sm font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{plan.nome}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-[#2B59FF]">R$ {plan.preco.toFixed(2).replace('.', ',')}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-700">{plan.desconto}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{plan.assinantes.toLocaleString('pt-BR')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-[#2B59FF]">R$ {plan.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Ativo
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#2B59FF] transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
}

