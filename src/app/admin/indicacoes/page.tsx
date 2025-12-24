'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Gift, 
  Users, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Search,
  Building2,
  Stethoscope,
  Pill,
  User,
  ChevronDown,
  Calendar
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

type IndicationType = 'clinica' | 'medico' | 'farmacia' | 'paciente' | 'all';
type IndicationStatus = 'ativa' | 'pendente' | 'convertida' | 'cancelada' | 'all';

interface Indication {
  id: string;
  indicado: string;
  tipo: IndicationType;
  indicadoPor: string;
  data: string;
  status: 'ativa' | 'pendente' | 'convertida' | 'cancelada';
  comissao: number;
  icon: any;
}

const indications: Indication[] = [
  {
    id: 'REF001',
    indicado: 'Clínica Nova Esperança',
    tipo: 'clinica',
    indicadoPor: 'João Silva (Consultor)',
    data: '05/11/2024',
    status: 'ativa',
    comissao: 2400,
    icon: Building2,
  },
  {
    id: 'REF002',
    indicado: 'Dr. Carlos Mendes',
    tipo: 'medico',
    indicadoPor: 'Maria Santos (Consultora)',
    data: '03/11/2024',
    status: 'pendente',
    comissao: 0,
    icon: Stethoscope,
  },
  {
    id: 'REF003',
    indicado: 'Farmácia Saúde Total',
    tipo: 'farmacia',
    indicadoPor: 'Pedro Costa (Consultor)',
    data: '01/11/2024',
    status: 'ativa',
    comissao: 1580,
    icon: Pill,
  },
  {
    id: 'REF004',
    indicado: 'Ana Rodrigues (Paciente)',
    tipo: 'paciente',
    indicadoPor: 'Clínica Bem Estar',
    data: '30/10/2024',
    status: 'convertida',
    comissao: 150,
    icon: User,
  },
  {
    id: 'REF005',
    indicado: 'Centro Médico ABC',
    tipo: 'clinica',
    indicadoPor: 'Roberto Lima (Consultor)',
    data: '28/10/2024',
    status: 'cancelada',
    comissao: 0,
    icon: Building2,
  },
];

const getTypeColor = (type: IndicationType) => {
  const colors: Record<Exclude<IndicationType, 'all'>, string> = {
    clinica: 'bg-slate-100 text-slate-600 border-slate-200',
    medico: 'bg-slate-100 text-slate-600 border-slate-200',
    farmacia: 'bg-slate-100 text-slate-600 border-slate-200',
    paciente: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  if (type === 'all') {
    return 'bg-slate-100 text-slate-600 border-slate-200';
  }
  return colors[type] || 'bg-slate-100 text-slate-600 border-slate-200';
};

const getStatusColor = (status: string) => {
  const colors = {
    ativa: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    pendente: 'bg-orange-50 text-orange-600 border-orange-200',
    convertida: 'bg-blue-50 text-blue-600 border-blue-200',
    cancelada: 'bg-red-50 text-red-600 border-red-200',
  };
  return colors[status as keyof typeof colors] || 'bg-slate-50 text-slate-600 border-slate-200';
};

const getTypeLabel = (type: IndicationType) => {
  const labels: Record<Exclude<IndicationType, 'all'>, string> = {
    clinica: 'Clínica',
    medico: 'Médico',
    farmacia: 'Farmácia',
    paciente: 'Paciente',
  };
  if (type === 'all') {
    return 'Todos';
  }
  return labels[type] || type;
};

export default function IndicacoesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<IndicationType>('all');
  const [selectedStatus, setSelectedStatus] = useState<IndicationStatus>('all');

  const filteredIndications = indications.filter(indication => {
    const matchesSearch = searchTerm === '' || 
      indication.indicado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indication.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indication.indicadoPor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || indication.tipo === selectedType;
    const matchesStatus = selectedStatus === 'all' || indication.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

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
              <Gift className="w-6 h-6 text-[#2B59FF]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Gestão de Indicações
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Controle completo de indicações e comissões
              </p>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          <MetricCard
            title="Total de Indicações"
            value="2.847"
            icon={Users}
            iconColor="#2B59FF"
            change="+156 este mês"
            changeType="positive"
          />
          <MetricCard
            title="Indicações Ativas"
            value="1.892"
            icon={CheckCircle2}
            iconColor="#10B981"
            change="66% do total"
            changeType="positive"
          />
          <MetricCard
            title="Pendentes Aprovação"
            value="234"
            icon={Clock}
            iconColor="#F59E0B"
            change="Requer ação"
            changeType="positive"
          />
          <MetricCard
            title="Comissões Totais"
            value="R$ 284.560"
            icon={DollarSign}
            iconColor="#8B5CF6"
            change="+18% vs mês anterior"
            changeType="positive"
          />
        </motion.div>

        {/* Search and Filters Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
              <input
                type="text"
                placeholder="Buscar por nome, ID ou consultor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-700 placeholder:text-slate-400 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all hover:shadow-sm"
              />
            </div>

            {/* Type Filter */}
            <div className="relative group">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as IndicationType)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[160px]"
              >
                <option value="all">Todos os Tipos</option>
                <option value="clinica">Clínica</option>
                <option value="medico">Médico</option>
                <option value="farmacia">Farmácia</option>
                <option value="paciente">Paciente</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
            </div>

            {/* Status Filter */}
            <div className="relative group">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as IndicationStatus)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[160px]"
              >
                <option value="all">Todos Status</option>
                <option value="ativa">Ativa</option>
                <option value="pendente">Pendente</option>
                <option value="convertida">Convertida</option>
                <option value="cancelada">Cancelada</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Indications Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
        >
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-[#2B59FF]" />
            <h2 className="text-xl font-bold text-slate-900">Lista de Indicações</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Indicado</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Indicado Por</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Comissão</th>
                </tr>
              </thead>
              <tbody>
                {filteredIndications.map((indication, index) => {
                  const Icon = indication.icon;
                  return (
                    <motion.tr
                      key={indication.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{indication.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#2B59FF] transition-colors" />
                          <span className="text-sm font-bold text-slate-700">{indication.indicado}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(indication.tipo)}`}>
                          {getTypeLabel(indication.tipo)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-700">{indication.indicadoPor}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{indication.data}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(indication.status)}`}>
                          {indication.status.charAt(0).toUpperCase() + indication.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${indication.comissao > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {indication.comissao > 0 ? `R$ ${indication.comissao.toLocaleString('pt-BR')}` : 'R$ 0'}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredIndications.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-bold text-lg">Nenhuma indicação encontrada</p>
              <p className="text-slate-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
            </motion.div>
          )}
        </motion.div>

        {/* Commission Management Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
        >
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-[#2B59FF]" />
            <h2 className="text-xl font-bold text-slate-900">Gestão de Comissões</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { mes: 'Nov/2024', consultores: 142, pagas: 45680, pendentes: 12340 },
              { mes: 'Out/2024', consultores: 138, pagas: 42150, pendentes: 8900 },
              { mes: 'Set/2024', consultores: 135, pagas: 38900, pendentes: 11200 },
            ].map((period, index) => (
              <motion.div
                key={period.mes}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#2B59FF]" />
                  <span className="text-sm font-bold text-slate-900">{period.mes}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">{period.consultores} consultores</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Pagas</span>
                    <span className="text-sm font-bold text-emerald-600">R$ {period.pagas.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Pendentes</span>
                    <span className="text-sm font-bold text-orange-600">R$ {period.pendentes.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}

