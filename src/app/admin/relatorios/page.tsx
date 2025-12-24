'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { 
  FileText, 
  BarChart3, 
  FileDown, 
  Download,
  Building2,
  Pill,
  Users,
  CheckCircle2,
  DollarSign,
  Activity,
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

type TabType = 'tipos' | 'gerar' | 'historico';

export default function RelatoriosPage() {
  const [activeTab, setActiveTab] = useState<TabType>('tipos');

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
              <FileText className="w-6 h-6 text-[#2B59FF]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Central de Relatórios
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Gere relatórios detalhados sobre todos os aspectos do sistema. Exporte em múltiplos formatos e envie por e-mail.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('tipos')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all ${
              activeTab === 'tipos'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Tipos de Relatórios
          </button>
          <button
            onClick={() => setActiveTab('gerar')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all ${
              activeTab === 'gerar'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Gerar Relatório
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all ${
              activeTab === 'historico'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4" />
            Histórico
          </button>
        </motion.div>

        {/* Report Types Tab */}
        {activeTab === 'tipos' && (
          <>
            {/* Top Row Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Clínicas e Médicos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Building2 className="w-6 h-6 text-[#2B59FF]" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Clínicas e Médicos</h3>
                <p className="text-sm text-slate-600 mb-4">Relatório completo de clínicas e profissionais cadastrados</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">1.284 clínicas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">3.847 médicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">Taxa de ativação: 87%</span>
                  </div>
                </div>
              </motion.div>

              {/* Farmácias e Produtos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-pink-50 rounded-xl">
                    <Pill className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Farmácias e Produtos</h3>
                <p className="text-sm text-slate-600 mb-4">Análise de farmácias parceiras e produtos ativos</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">842 farmácias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">15.234 produtos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">Taxa de vendas: 92%</span>
                  </div>
                </div>
              </motion.div>

              {/* Consultores e Indicações */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Consultores e Indicações</h3>
                <p className="text-sm text-slate-600 mb-4">Desempenho dos consultores e suas indicações</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">456 consultores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">2.847 indicações</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">Taxa conversão: 66%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom Row Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Faturamento Geral */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Faturamento Geral</h3>
                <p className="text-sm text-slate-600 mb-4">Análise financeira completa do sistema</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">R$ 2.4M faturamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">+14.8% crescimento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">R$ 456K saldo</span>
                  </div>
                </div>
              </motion.div>

              {/* Consultas Realizadas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Consultas Realizadas</h3>
                <p className="text-sm text-slate-600 mb-4">Relatório de consultas e atendimentos</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">15.842 consultas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">98.5% concluídas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">1.5% canceladas</span>
                  </div>
                </div>
              </motion.div>

              {/* Comissões Pagas/Pendentes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-[#2B59FF]" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors">
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Comissões Pagas/Pendentes</h3>
                <p className="text-sm text-slate-600 mb-4">Controle de comissões e pagamentos</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">R$ 284K total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">R$ 159K pagas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-700">R$ 124K pendentes</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Generate Report Tab */}
        {activeTab === 'gerar' && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Gerar Novo Relatório</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'historico' && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Histórico de Relatórios</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
}

