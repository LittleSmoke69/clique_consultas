'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { 
  Settings, 
  Home, 
  Users, 
  DollarSign,
  Link as LinkIcon,
  Shield,
  ClipboardList,
  Palette,
  Upload,
  FileText,
  Save,
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

type TabType = 'geral' | 'usuarios' | 'financeiro' | 'integracoes' | 'seguranca';

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('geral');
  const [formData, setFormData] = useState({
    nomePlataforma: 'Sistema de Agendamento Médico',
    cnpj: '12.345.678/0001-90',
    emailPrincipal: 'contato@sistema.com.br',
    telefoneSuporte: '0800 123 4567',
    idiomaPadrao: 'pt-BR',
    fusoHorario: 'America/Sao_Paulo',
    moeda: 'BRL',
    corPrimaria: '#2B59FF',
    corSecundaria: '#1a44cc',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Lógica para salvar configurações
    console.log('Salvando configurações:', formData);
  };

  return (
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
              <Settings className="w-6 h-6 text-[#2B59FF]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Configurações do Sistema
              </h1>
              <p className="text-slate-600 text-sm lg:text-base">
                Gerencie todas as configurações da plataforma
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 inline-flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('geral')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'geral'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4" />
            Configuração Geral
          </button>
          <button
            onClick={() => setActiveTab('usuarios')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'usuarios'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            Usuários e Acessos
          </button>
          <button
            onClick={() => setActiveTab('financeiro')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'financeiro'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Financeiro
          </button>
          <button
            onClick={() => setActiveTab('integracoes')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'integracoes'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Integrações
          </button>
          <button
            onClick={() => setActiveTab('seguranca')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'seguranca'
                ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            Segurança
          </button>
        </motion.div>

        {/* General Configuration Tab */}
        {activeTab === 'geral' && (
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Platform Information Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all">
              <div className="flex items-center gap-2 mb-6">
                <ClipboardList className="w-5 h-5 text-[#2B59FF]" />
                <h2 className="text-xl font-bold text-slate-900">Informações da Plataforma</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome da Plataforma */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Nome da Plataforma <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nomePlataforma}
                    onChange={(e) => handleInputChange('nomePlataforma', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                    placeholder="Nome da Plataforma"
                  />
                </div>

                {/* CNPJ */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    CNPJ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                {/* E-mail Principal */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    E-mail Principal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.emailPrincipal}
                    onChange={(e) => handleInputChange('emailPrincipal', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                    placeholder="contato@sistema.com.br"
                  />
                </div>

                {/* Telefone de Suporte */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Telefone de Suporte <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.telefoneSuporte}
                    onChange={(e) => handleInputChange('telefoneSuporte', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                    placeholder="0800 123 4567"
                  />
                </div>

                {/* Idioma Padrão */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Idioma Padrão
                  </label>
                  <div className="relative group">
                    <select
                      value={formData.idiomaPadrao}
                      onChange={(e) => handleInputChange('idiomaPadrao', e.target.value)}
                      className="appearance-none w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
                  </div>
                </div>

                {/* Fuso Horário */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Fuso Horário
                  </label>
                  <div className="relative group">
                    <select
                      value={formData.fusoHorario}
                      onChange={(e) => handleInputChange('fusoHorario', e.target.value)}
                      className="appearance-none w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer"
                    >
                      <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                      <option value="America/Manaus">Manaus (GMT-4)</option>
                      <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
                  </div>
                </div>

                {/* Moeda */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Moeda
                  </label>
                  <div className="relative group">
                    <select
                      value={formData.moeda}
                      onChange={(e) => handleInputChange('moeda', e.target.value)}
                      className="appearance-none w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer"
                    >
                      <option value="BRL">Real (BRL)</option>
                      <option value="USD">Dólar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-[#2B59FF] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Identity Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-[#2B59FF]" />
                <h2 className="text-xl font-bold text-slate-900">Identidade Visual</h2>
              </div>

              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Logotipo da Plataforma
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-full sm:w-48 h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-50 hover:border-[#2B59FF]/50 transition-colors cursor-pointer group">
                      <div className="text-center">
                        <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-[#2B59FF] transition-colors" />
                        <p className="text-xs text-slate-500">Logo atual</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#2B59FF]/30 text-[#2B59FF] rounded-xl font-bold hover:bg-[#2B59FF]/5 hover:border-[#2B59FF]/50 transition-all hover:scale-105 active:scale-95 shadow-sm">
                        <Upload className="w-4 h-4" />
                        Upload do Logo
                      </button>
                      <p className="text-xs text-slate-500 mt-2">
                        Formatos aceitos: PNG, JPG, SVG (máx. 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Cor Primária
                  </label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-slate-200 shadow-sm"
                      style={{ backgroundColor: formData.corPrimaria }}
                    />
                    <input
                      type="text"
                      value={formData.corPrimaria}
                      onChange={(e) => handleInputChange('corPrimaria', e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                      placeholder="#2B59FF"
                    />
                    <input
                      type="color"
                      value={formData.corPrimaria}
                      onChange={(e) => handleInputChange('corPrimaria', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Cor Secundária
                  </label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-slate-200 shadow-sm"
                      style={{ backgroundColor: formData.corSecundaria }}
                    />
                    <input
                      type="text"
                      value={formData.corSecundaria}
                      onChange={(e) => handleInputChange('corSecundaria', e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:border-[#2B59FF]/50 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                      placeholder="#1a44cc"
                    />
                    <input
                      type="color"
                      value={formData.corSecundaria}
                      onChange={(e) => handleInputChange('corSecundaria', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Tabs */}
        {activeTab === 'usuarios' && (
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Usuários e Acessos</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}

        {activeTab === 'financeiro' && (
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Configurações Financeiras</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}

        {activeTab === 'integracoes' && (
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Integrações</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}

        {activeTab === 'seguranca' && (
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Segurança</h2>
            <p className="text-slate-600">Em breve...</p>
          </motion.div>
        )}

        {/* Save Button */}
        {activeTab === 'geral' && (
          <motion.div variants={itemVariants} className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-[#2B59FF] text-white rounded-xl font-bold hover:bg-[#1a44cc] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#2B59FF]/20 hover:shadow-xl hover:shadow-[#2B59FF]/30"
            >
              <Save className="w-5 h-5" />
              Salvar Todas as Configurações
            </button>
          </motion.div>
        )}
      </motion.div>
  );
}

