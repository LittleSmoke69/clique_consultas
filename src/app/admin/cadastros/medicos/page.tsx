'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Stethoscope, 
  UserCheck, 
  Clock, 
  Award, 
  Plus, 
  Search, 
  Calendar, 
  Trash2,
  ChevronDown,
  Mail,
  Phone
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

const professionalsMock = [
  { 
    id: 1, 
    name: 'Dr. João Silva', 
    email: 'joao.silva@clinica.com', 
    specialty: 'Cardiologia', 
    crm: 'CRM/SP 123456', 
    phone: '(11) 98765-4321', 
    status: 'Ativo',
    avatar: 'JS'
  },
  { 
    id: 2, 
    name: 'Dra. Ana Costa', 
    email: 'ana.costa@clinica.com', 
    specialty: 'Dermatologia', 
    crm: 'CRM/SP 234567', 
    phone: '(11) 97654-3210', 
    status: 'Ativo',
    avatar: 'AC'
  },
  { 
    id: 3, 
    name: 'Dr. Paulo Mendes', 
    email: 'paulo.mendes@clinica.com', 
    specialty: 'Ortopedia', 
    crm: 'CRM/SP 345678', 
    phone: '(11) 96543-2109', 
    status: 'Em credenciamento',
    avatar: 'PM'
  },
  { 
    id: 4, 
    name: 'Dra. Fernanda Silva', 
    email: 'fernanda.silva@clinica.com', 
    specialty: 'Pediatria', 
    crm: 'CRM/SP 456789', 
    phone: '(11) 95432-1098', 
    status: 'Ativo',
    avatar: 'FS'
  },
];

export default function GestaoProfissionaisPage() {
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
            title="Total Profissionais"
            value="4"
            icon={Stethoscope}
            iconColor="#2B59FF"
          />
          <MetricCard
            title="Ativos"
            value="3"
            icon={UserCheck}
            iconColor="#10B981"
          />
          <MetricCard
            title="Em Credenciamento"
            value="1"
            icon={Clock}
            iconColor="#F59E0B"
          />
          <MetricCard
            title="Especialidades"
            value="6"
            icon={Award}
            iconColor="#8B5CF6"
          />
        </div>

        {/* Section Header & Filters */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Gestão de Profissionais</h2>
            </div>
            <button className="flex items-center gap-2 bg-[#2B59FF] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#1a44cc] transition-all shadow-lg shadow-[#2B59FF]/20">
              <Plus className="w-5 h-5" />
              Novo Profissional
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome ou CRM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-10 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer">
                  <option>Todas especialidades</option>
                  <option>Cardiologia</option>
                  <option>Dermatologia</option>
                  <option>Ortopedia</option>
                  <option>Pediatria</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-10 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer">
                  <option>Todos status</option>
                  <option>Ativo</option>
                  <option>Em credenciamento</option>
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
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Profissional</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Especialidade</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">CRM</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Contato</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900">Status</th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-slate-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {professionalsMock.map((prof) => (
                  <tr key={prof.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#2B59FF] font-bold text-xs shadow-sm">
                          {prof.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{prof.name}</p>
                          <p className="text-xs text-slate-400 font-medium">{prof.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                        {prof.specialty}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-sm text-slate-900 font-bold">
                      {prof.crm}
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{prof.phone}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        prof.status === 'Ativo' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        {prof.status}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#2B59FF] transition-all">
                          <Calendar className="w-4 h-4" />
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
