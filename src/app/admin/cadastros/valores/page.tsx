'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Box, 
  Package, 
  Tags, 
  TrendingUp, 
  Plus, 
  Search, 
  Edit2, 
  Trash2,
  ChevronDown
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

const servicesMock = [
  { id: 1, name: 'Consulta Cardiologia', category: 'Consulta', duration: '45 min', price: 250, discount: '10%', status: 'Ativo' },
  { id: 2, name: 'Exame de Sangue Completo', category: 'Exame', duration: '30 min', price: 120, discount: '15%', status: 'Ativo' },
  { id: 3, name: 'Pacote Check-up Executivo', category: 'Pacote', duration: '120 min', price: 890, discount: '20%', status: 'Ativo' },
  { id: 4, name: 'Ultrassom Abdominal', category: 'Exame', duration: '40 min', price: 180, discount: '5%', status: 'Inativo' },
];

export default function GestaoServicosPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
            title="Total de Serviços"
            value="4"
            icon={Box}
            iconColor="#2B59FF"
          />
          <MetricCard
            title="Serviços Ativos"
            value="3"
            icon={Package}
            iconColor="#10B981"
          />
          <MetricCard
            title="Categorias"
            value="4"
            icon={Tags}
            iconColor="#8B5CF6"
          />
          <MetricCard
            title="Média de Preço"
            value="R$ 360"
            icon={TrendingUp}
            iconColor="#F59E0B"
          />
        </div>

        {/* Section Header & Filters */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Gestão de Serviços</h2>
            </div>
            <button className="flex items-center gap-2 bg-[#2B59FF] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#1a44cc] transition-all shadow-lg shadow-[#2B59FF]/20">
              <Plus className="w-5 h-5" />
              Novo Serviço
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-10 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer">
                  <option>Todas categorias</option>
                  <option>Consulta</option>
                  <option>Exame</option>
                  <option>Pacote</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-10 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer">
                  <option>Todos status</option>
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Nome</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Categoria</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Duração</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Valor</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Desconto</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Status</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-slate-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {servicesMock.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-4">
                      <p className="font-bold text-slate-900">{service.name}</p>
                    </td>
                    <td className="py-5 px-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                        {service.category}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-sm text-slate-500 font-medium">
                      {service.duration}
                    </td>
                    <td className="py-5 px-4">
                      <p className="font-bold text-slate-900">R$ {service.price}</p>
                    </td>
                    <td className="py-5 px-4 text-sm text-slate-500 font-medium">
                      {service.discount}
                    </td>
                    <td className="py-5 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        service.status === 'Ativo' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-500 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
  );
}
