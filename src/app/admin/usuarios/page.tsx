'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Users, 
  UserCheck, 
  Stethoscope, 
  Building2,
  Download,
  UserPlus,
  Search,
  Mail,
  Phone,
  MoreVertical,
  CheckCircle2,
  Clock,
  X,
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

type UserType = 'paciente' | 'medico' | 'clinica' | 'farmacia' | 'laboratorio' | 'all';
type UserStatus = 'ativo' | 'pendente' | 'inativo' | 'all';

interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: UserType;
  status: 'ativo' | 'pendente' | 'inativo';
  cadastro: string;
  ultimoAcesso: string;
  badge?: string;
  especialidade?: string;
}

const users: User[] = [
  {
    id: 'USR001',
    nome: 'Maria Santos Silva',
    email: 'maria.santos@email.com',
    telefone: '(11) 98765-4321',
    tipo: 'paciente',
    status: 'ativo',
    cadastro: '15/10/2024',
    ultimoAcesso: '05/11/2025 14:30',
    badge: 'Premium',
  },
  {
    id: 'USR002',
    nome: 'Dr. João Pedro Costa',
    email: 'joao.costa@clinica.com',
    telefone: '(11) 97654-3210',
    tipo: 'medico',
    status: 'ativo',
    cadastro: '03/09/2024',
    ultimoAcesso: '05/11/2025 13:15',
    especialidade: 'Cardiologia',
  },
  {
    id: 'USR003',
    nome: 'Clínica Saúde Total',
    email: 'contato@saudetotal.com',
    telefone: '(11) 3456-7890',
    tipo: 'clinica',
    status: 'ativo',
    cadastro: '20/08/2024',
    ultimoAcesso: '05/11/2025 12:00',
  },
  {
    id: 'USR004',
    nome: 'Farmácia Popular',
    email: 'contato@farmaciapopular.com',
    telefone: '(11) 3234-5678',
    tipo: 'farmacia',
    status: 'ativo',
    cadastro: '12/09/2024',
    ultimoAcesso: '05/11/2025 10:30',
  },
  {
    id: 'USR005',
    nome: 'Laboratório Exame+',
    email: 'lab@exameplus.com',
    telefone: '(11) 3123-4567',
    tipo: 'laboratorio',
    status: 'ativo',
    cadastro: '25/08/2024',
    ultimoAcesso: '05/11/2025 09:15',
  },
  {
    id: 'USR006',
    nome: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    telefone: '(11) 96543-2109',
    tipo: 'paciente',
    status: 'pendente',
    cadastro: '04/11/2025',
    ultimoAcesso: '04/11/2025 18:45',
    badge: 'Básico',
  },
  {
    id: 'USR007',
    nome: 'Dra. Ana Paula Lima',
    email: 'ana.lima@gmail.com',
    telefone: '(11) 95432-1098',
    tipo: 'medico',
    status: 'ativo',
    cadastro: '10/07/2024',
    ultimoAcesso: '05/11/2025 11:20',
    especialidade: 'Dermatologia',
  },
  {
    id: 'USR008',
    nome: 'Pedro Henrique Santos',
    email: 'pedro.santos@email.com',
    telefone: '(11) 94321-0987',
    tipo: 'paciente',
    status: 'inativo',
    cadastro: '22/09/2024',
    ultimoAcesso: '15/10/2024 08:20',
    badge: 'Básico',
  },
];

const getTypeColor = (type: UserType) => {
  const colors: Record<Exclude<UserType, 'all'>, string> = {
    paciente: 'bg-blue-100 text-blue-700 border-blue-300',
    medico: 'bg-purple-100 text-purple-700 border-purple-300',
    clinica: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    farmacia: 'bg-pink-100 text-pink-700 border-pink-300',
    laboratorio: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  };
  if (type === 'all') {
    return 'bg-slate-100 text-slate-700 border-slate-300';
  }
  return colors[type] || 'bg-slate-100 text-slate-700 border-slate-300';
};

const getStatusColor = (status: string) => {
  const colors = {
    ativo: 'bg-emerald-500 text-white border-emerald-600',
    pendente: 'bg-orange-500 text-white border-orange-600',
    inativo: 'bg-slate-500 text-white border-slate-600',
  };
  return colors[status as keyof typeof colors] || 'bg-slate-50 text-slate-600 border-slate-200';
};

const getTypeLabel = (type: UserType) => {
  const labels: Record<Exclude<UserType, 'all'>, string> = {
    paciente: 'Paciente',
    medico: 'Médico',
    clinica: 'Clínica',
    farmacia: 'Farmácia',
    laboratorio: 'Laboratório',
  };
  if (type === 'all') {
    return 'Todos';
  }
  return labels[type] || type;
};

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<UserType>('all');
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || user.tipo === selectedType;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
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
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Gestão de Usuários
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Controle completo de todos os usuários do sistema
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#2B59FF]/30 text-[#2B59FF] rounded-xl font-bold hover:bg-[#2B59FF]/5 hover:border-[#2B59FF]/50 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2B59FF] text-white rounded-xl font-bold hover:bg-[#1a44cc] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#2B59FF]/20 hover:shadow-xl hover:shadow-[#2B59FF]/30">
                <UserPlus className="w-4 h-4" />
                Novo Usuário
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
            title="Total de Usuários"
            value="10.234"
            icon={Users}
            iconColor="#2B59FF"
            change="+12.3%"
            changeType="positive"
          />
          <MetricCard
            title="Pacientes"
            value="7.456"
            icon={UserCheck}
            iconColor="#10B981"
            change="+15.7%"
            changeType="positive"
          />
          <MetricCard
            title="Profissionais"
            value="1.234"
            icon={Stethoscope}
            iconColor="#8B5CF6"
            change="+8.2%"
            changeType="positive"
          />
          <MetricCard
            title="Parceiros"
            value="1.544"
            icon={Building2}
            iconColor="#F59E0B"
            change="+5.4%"
            changeType="positive"
            subtitle="Clínicas, Farmácias e Labs"
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
                placeholder="Buscar por nome, email ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-700 placeholder:text-slate-400 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all hover:shadow-sm"
              />
            </div>

            {/* Type Filter */}
            <div className="relative group">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as UserType)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[160px]"
              >
                <option value="all">Todos os tipos</option>
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
                <option value="clinica">Clínica</option>
                <option value="farmacia">Farmácia</option>
                <option value="laboratorio">Laboratório</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
            </div>

            {/* Status Filter */}
            <div className="relative group">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as UserStatus)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm min-w-[160px]"
              >
                <option value="all">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="pendente">Pendente</option>
                <option value="inativo">Inativo</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Lista de Usuários</h2>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cadastro</th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Último Acesso</th>
                  <th className="text-center py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#2B59FF] transition-colors" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{user.email}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{user.nome}</p>
                          {user.badge && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold border border-slate-200">
                              {user.badge}
                            </span>
                          )}
                          {user.especialidade && (
                            <p className="text-xs text-slate-500 mt-1">{user.especialidade}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-[#2B59FF] transition-colors" />
                        <span className="text-sm font-bold text-slate-700">{user.telefone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(user.tipo)}`}>
                        {getTypeLabel(user.tipo)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(user.status)}`}>
                        {user.status === 'ativo' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        {user.status === 'pendente' && <Clock className="w-3.5 h-3.5 text-white" />}
                        {user.status === 'inativo' && <X className="w-3.5 h-3.5 text-white" />}
                        <span className="text-white">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600">{user.cadastro}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600">{user.ultimoAcesso}</span>
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

          {filteredUsers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-bold text-lg">Nenhum usuário encontrado</p>
              <p className="text-slate-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}

