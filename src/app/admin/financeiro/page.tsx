'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Wallet, 
  Building2, 
  Pill, 
  Users,
  Download,
  Plus,
  Search,
  Calendar,
  Briefcase,
  Heart,
  RefreshCw,
  Snowflake,
  ArrowUpRight,
  ArrowDownRight,
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

type TabType = 'transacoes' | 'fluxo' | 'gateways';
type CategoryType = 'consultas' | 'comissoes' | 'assinaturas' | 'farmacia' | 'estornos' | 'exames' | 'all';

interface Transaction {
  id: string;
  tipo: 'entrada' | 'saida';
  descricao: string;
  categoria: string;
  usuario: string;
  dataHora: string;
  valor: number;
}

const transactions: Transaction[] = [
  {
    id: 'TRX001',
    tipo: 'entrada',
    descricao: 'Pagamento de consulta - Dr. João Silva',
    categoria: 'Consulta',
    usuario: 'Maria Santos',
    dataHora: '05/11/2025 14:30',
    valor: 250.00,
  },
  {
    id: 'TRX002',
    tipo: 'saida',
    descricao: 'Comissão parceiro - Clínica ABC',
    categoria: 'Comissão',
    usuario: 'Clínica ABC',
    dataHora: '05/11/2025 13:15',
    valor: 125.00,
  },
  {
    id: 'TRX003',
    tipo: 'entrada',
    descricao: 'Assinatura Plano Premium',
    categoria: 'Assinatura',
    usuario: 'Carlos Oliveira',
    dataHora: '05/11/2025 11:45',
    valor: 19.90,
  },
  {
    id: 'TRX004',
    tipo: 'entrada',
    descricao: 'Venda de medicamento',
    categoria: 'Farmácia',
    usuario: 'Ana Paula',
    dataHora: '05/11/2025 10:20',
    valor: 45.50,
  },
  {
    id: 'TRX005',
    tipo: 'saida',
    descricao: 'Estorno - Consulta cancelada',
    categoria: 'Estorno',
    usuario: 'Pedro Santos',
    dataHora: '05/11/2025 09:00',
    valor: 180.00,
  },
  {
    id: 'TRX006',
    tipo: 'entrada',
    descricao: 'Exame laboratorial',
    categoria: 'Exame',
    usuario: 'Juliana Costa',
    dataHora: '04/11/2025 16:45',
    valor: 320.00,
  },
];

const categories = [
  { id: 'consultas' as CategoryType, label: 'Consultas', icon: Calendar, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'comissoes' as CategoryType, label: 'Comissões', icon: Briefcase, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 'assinaturas' as CategoryType, label: 'Assinaturas', icon: Heart, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 'farmacia' as CategoryType, label: 'Farmácia', icon: Pill, color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { id: 'estornos' as CategoryType, label: 'Estornos', icon: RefreshCw, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { id: 'exames' as CategoryType, label: 'Exames', icon: Snowflake, color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
];

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState<TabType>('transacoes');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategory = selectedCategory === 'all' || 
      transaction.categoria.toLowerCase() === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      transaction.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.usuario.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
                Controle Financeiro
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Gestão completa de transações e carteira digital
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#2B59FF]/30 text-[#2B59FF] rounded-xl font-bold hover:bg-[#2B59FF]/5 hover:border-[#2B59FF]/50 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2B59FF] text-white rounded-xl font-bold hover:bg-[#1a44cc] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#2B59FF]/20 hover:shadow-xl hover:shadow-[#2B59FF]/30">
                <Plus className="w-4 h-4" />
                Nova Movimentação
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
            title="Saldo Total Sistema"
            value="R$ 456.890,00"
            icon={Wallet}
            iconColor="#2B59FF"
            change="+12.5%"
            changeType="positive"
          />
          <MetricCard
            title="Saldo Clínicas"
            value="R$ 234.560,00"
            icon={Building2}
            iconColor="#10B981"
            change="+8.3%"
            changeType="positive"
          />
          <MetricCard
            title="Saldo Farmácias"
            value="R$ 98.750,00"
            icon={Pill}
            iconColor="#8B5CF6"
            change="+15.2%"
            changeType="positive"
          />
          <MetricCard
            title="Saldo Consultores"
            value="R$ 123.580,00"
            icon={Users}
            iconColor="#F59E0B"
            change="+5.8%"
            changeType="positive"
          />
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('transacoes')}
            className={`px-6 py-3 font-bold text-sm rounded-xl transition-all ${
              activeTab === 'transacoes'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            Transações
          </button>
          <button
            onClick={() => setActiveTab('fluxo')}
            className={`px-6 py-3 font-bold text-sm rounded-xl transition-all ${
              activeTab === 'fluxo'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            Fluxo de Caixa
          </button>
          <button
            onClick={() => setActiveTab('gateways')}
            className={`px-6 py-3 font-bold text-sm rounded-xl transition-all ${
              activeTab === 'gateways'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            Gateways
          </button>
        </motion.div>

        {/* Transaction History Section */}
        {activeTab === 'transacoes' && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-slate-900">Histórico de Transações</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Period Filter */}
                <div className="relative group">
                  <select className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 transition-all cursor-pointer hover:shadow-sm">
                    <option>Último mês</option>
                    <option>Últimos 3 meses</option>
                    <option>Últimos 6 meses</option>
                    <option>Último ano</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 sm:flex-initial sm:w-64 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
                  <input
                    type="text"
                    placeholder="Buscar transação..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-slate-700 placeholder:text-slate-400 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all hover:shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 border ${
                  selectedCategory === 'all'
                    ? 'bg-[#2B59FF] text-white border-[#2B59FF] shadow-md shadow-[#2B59FF]/20 scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#2B59FF]/30 hover:text-[#2B59FF]'
                }`}
              >
                Todas
              </button>
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 border ${
                      isActive
                        ? `${category.color} shadow-md scale-105 border-current`
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoria</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuário</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data/Hora</th>
                    <th className="text-right py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-[#2B59FF]/5 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#2B59FF] transition-colors">{transaction.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all group-hover:scale-105 ${
                            transaction.tipo === 'entrada'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-red-50 text-red-600 border border-red-200'
                          }`}
                        >
                          {transaction.tipo === 'entrada' ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {transaction.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-700 group-hover:text-[#2B59FF] transition-colors">{transaction.descricao}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200 group-hover:bg-slate-200 transition-colors">
                          {transaction.categoria}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-slate-700">{transaction.usuario}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{transaction.dataHora}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`text-sm font-bold ${
                            transaction.tipo === 'entrada' ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.tipo === 'entrada' ? '+' : '-'} R$ {transaction.valor.toFixed(2).replace('.', ',')}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-bold text-lg">Nenhuma transação encontrada</p>
                <p className="text-slate-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Fluxo de Caixa Tab */}
        {activeTab === 'fluxo' && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Fluxo de Caixa</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}

        {/* Gateways Tab */}
        {activeTab === 'gateways' && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Gateways de Pagamento</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
}

